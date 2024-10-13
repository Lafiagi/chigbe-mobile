import axios from "axios";
import { SUI_CLIENT } from "./suiClient";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { generateNonce, generateRandomness, getExtendedEphemeralPublicKey } from "@mysten/zklogin";
import { jwtToAddress } from "@mysten/zklogin";
import { genAddressSeed, getZkLoginSignature } from "@mysten/zklogin";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from 'expo-auth-session';

const PROVER_URL = process.env.REACT_APP_PROVER_URL;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
const OPENID_PROVIDER_URL = process.env.REACT_APP_OPENID_PROVIDER_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

AuthSession.makeRedirectUri({ useProxy: true });

export class AuthService {
  static async getAddressSeed() {
    const jwt = await AuthService.decodeJwt();
    const salt = await AuthService.salt();
    return genAddressSeed(
      BigInt(salt),
      "sub",
      jwt.sub,
      jwt.aud.toString()
    ).toString();
  }

  static async getEd25519Keypair() {
    const jwtData = await AuthService.getJwtData();
    const publicKey = new Uint8Array(
      Object.values(jwtData.ephemeralKeyPair.keypair.publicKey)
    );
    const secretKey = new Uint8Array(
      Object.values(jwtData.ephemeralKeyPair.keypair.secretKey)
    );
    return new Ed25519Keypair({ publicKey, secretKey });
  }

  static async getPartialZkLoginSignature() {
    const keyPair = await AuthService.getEd25519Keypair();
    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
      keyPair.getPublicKey()
    );
    const verificationPayload = {
      jwt: await AuthService.jwt(),
      extendedEphemeralPublicKey,
      maxEpoch: await AuthService.getMaxEpoch(),
      jwtRandomness: await AuthService.getRandomness(),
      salt: await AuthService.salt(),
      keyClaimName: "sub",
    };
    return await AuthService.verifyPartialZkLoginSignature(verificationPayload);
  }

  static async verifyPartialZkLoginSignature(zkpRequestPayload) {
    try {
      const proofResponse = await axios.post(PROVER_URL, zkpRequestPayload, {
        headers: {
          "content-type": "application/json",
        },
      });
      return proofResponse.data;
    } catch (error) {
      console.log("failed to request the partial sig: ", error);
      return {};
    }
  }

  static async generateZkLoginSignature(userSignature) {
    const partialZkLoginSignature =
      await AuthService.getPartialZkLoginSignature();
    const addressSeed = await AuthService.getAddressSeed();
    const maxEpoch = await AuthService.getMaxEpoch();
    return getZkLoginSignature({
      inputs: {
        ...partialZkLoginSignature,
        addressSeed,
      },
      maxEpoch,
      userSignature,
    });
  }

  static async getMaxEpoch() {
    const jwtData = await AuthService.getJwtData();
    return jwtData.maxEpoch;
  }

  static async getRandomness() {
    const jwtData = await AuthService.getJwtData();
    return jwtData.randomness;
  }

  static async getJwtData() {
    const jwtData = await AsyncStorage.getItem("jwt_data");
    return JSON.parse(jwtData);
  }

  static async decodeJwt() {
    const jwt = await AsyncStorage.getItem("sui_jwt_token");
    return jwtDecode(jwt);
  }

  static async salt() {
    const email = (await AuthService.claims())["email"];
    return AuthService.hashcode(email);
  }

  static async walletAddress() {
    const email = (await AuthService.claims())["email"];
    return jwtToAddress(await AuthService.jwt(), AuthService.hashcode(email));
  }

  static async claims() {
    const token = await AuthService.jwt();
    if (token) return JSON.parse(atob(token.split(".")[1]));
  }

  static hashcode(s) {
    var h = 0,
      l = s.length,
      i = 0;
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return h.toString();
  }

  static async isAuthenticated() {
    const token = await AuthService.jwt();
    return token && token !== "null";
  }

  static async jwt() {
    return await AsyncStorage.getItem("sui_jwt_token");
  }

  async login() {
    const { epoch } = await SUI_CLIENT.getLatestSuiSystemState();

    const maxEpoch = Number(epoch) + 2222;
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const nonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );
    const jwtData = {
      maxEpoch,
      nonce,
      randomness,
      ephemeralKeyPair,
    };

    console.log({ jwtData });

    await AsyncStorage.setItem("jwt_data", JSON.stringify(jwtData));

    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const authUrl = `${OPENID_PROVIDER_URL}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid email&nonce=${nonce}`;

    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === 'success') {
      const token = result.params.id_token;
      await AsyncStorage.setItem("sui_jwt_token", token);
      console.log('Login successful:', token);
    } else {
      console.error('Error initiating Google login:', result);
    }
  }
}
