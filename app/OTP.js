import * as React from "react";
import { ScrollView } from "react-native";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Button } from "react-native-paper";
import commonStyles from "../components/commons/styles/generic";

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = React.useState("");
  const [countdown, setCountdown] = React.useState(30); // Initial countdown value in seconds
  const [showResend, setShowResend] = React.useState(true);

  const handleLogin = () => {
    navigation.replace("SuccessfulVerification");
  };

  const handleResend = () => {
    // Logic to resend OTP code
    setCountdown(30); // Reset the countdown timer
    startCountdown(); // Start the countdown timer
    setShowResend(true); // Show the resend button text
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          setShowResend(false); // Hide the resend button text when countdown ends
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    if (showResend) {
      startCountdown();
    }
    return () => clearInterval(startCountdown);
  }, [showResend]);


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={{ marginTop: 100 }}>
        <Text style={[styles.orangeText, styles.forgot]}>
          Enter Verification Code
        </Text>
        <Text style={styles.info}>
          Enter the 4-digit code sent to your email address to reset password
        </Text>
        <View style={styles.inputContainer}>
          <OtpInput
            numberOfDigits={4}
            onFilled={(text) => setOtp(text)}
            focusColor={"#ff6200"}
          />
          {showResend ? (
            <Text style={styles.resendText}>
              Resend in <Text style={commonStyles.bold}>{countdown}s</Text>
            </Text>
          ) : (
            <Button
              mode="outlined"
              onPress={handleResend}
              style={styles.resendButton}
              labelStyle={styles.resendButtonText}
            >
              Resend Code
            </Button>
          )}
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            disabled={otp.length !== 4} // Disable continue button until OTP is filled
          >
            <Text style={[commonStyles.bold, styles.continue]}>Next</Text>
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff6200",
    borderRadius: 15,
    padding: 5,
  },
  resendButton: {
    alignSelf: "center",
    marginTop: 10,
    borderWidth: 0, // Remove border from button
    backgroundColor: "transparent",
  },
  resendButtonText: {
    color: "#ff6200",
    fontWeight: "bold",
  },
  resendText: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  info: {
    fontSize: 15,
    fontWeight: "400",
    textTransform: "capitalize",
    color: "gray",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  boldOrangeText: {
    color: "#ff6200",
    fontWeight: "bold",
  },
  orangeText: {
    color: "#ff6200",
    fontWeight: "bold",
  },
  label: {
    color: "#ff6200",
  },
  forgot: {
    fontSize: 25,
  },
  continue: {
    color: "#fff",
    fontSize: 17,
  },
});

export default OTPScreen;
