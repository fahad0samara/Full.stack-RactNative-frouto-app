import React, {useRef, useEffect} from "react";
import {Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import LottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";
export default function LoderCart() {
  const navigation = useNavigation();


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../assets/cart.json")}
        autoPlay
        loop
        style={{
          width: 300,
          height: 300,
          alignSelf: "center",
          alignItems: "center",
        }}
      />
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Your cart is empty
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Shop Now
        </Text>
      </TouchableOpacity>
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
