import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function DefaultLoader() {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container ]}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
        //   width: 200,
        //   height: 200,
        backgroundColor: 'rgba(255,255,255,.5)',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/json/loading.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.3)',
        zIndex: 1
    },
  buttonContainer: {
    paddingTop: 20,
  },
});
