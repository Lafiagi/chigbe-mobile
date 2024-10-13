import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import Swiper from 'react-native-swiper';

export const Screen1 = () => (
    <View style={styles.slide}>
      <Image source={require('./assets/image1.jpg')} style={styles.image} />
      <Text style={styles.text}>Welcome to the App!</Text>
    </View>
  );
  
 export const Screen2 = () => (
    <View style={styles.slide}>
      <Image source={require("../assets/images/sakaslist-logo5.png")} style={styles.image} />
      <Text style={styles.text}>Discover amazing features.</Text>
    </View>
  );
  
 export const Screen3 = () => (
    <View style={styles.slide}>
      <Image source={require("../assets/images/sakaslist-logo5.png")} style={styles.image} />
      <Text style={styles.text}>Get started easily.</Text>
    </View>
  );
  
 export const Screen4 = () => (
    <View style={styles.slide}>
      <Image source={require("../assets/images/sakaslist-logo5.png")} style={styles.image} />
      <Text style={styles.text}>Let's begin!</Text>
      <Button title="Get Started" onPress={() => /* Handle get started press */} />
    </View>
  );
  