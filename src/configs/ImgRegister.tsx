import React, {useRef, useEffect} from "react";
import {Button, StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";

export default function ImgRegister() {
  return (
    <View
      style={{
        flex: 1,
    
   

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../assets/login.json")}
        autoPlay
        loop
        style={styles.loder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loder: {
    width: 300,

    height: 300,
    alignSelf: "center",
  },
});
