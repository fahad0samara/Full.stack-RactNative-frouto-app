import React, {useRef, useEffect} from "react";
import {Button, StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";

export default function Splash() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../assets/splash.json")}
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
