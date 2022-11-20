import React from "react";
import axios from "axios";
import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackActions} from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {LinearGradient} from "expo-linear-gradient";
import {FontAwesome, Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import ImgRegister from "../configs/ImgRegister";
import {useLogIN} from "../../ContText";
import LoderApp from "../configs/LoderApp";
import Splash from "../configs/Splash";

const LogIN = ({}) => {
  const {setLog, setProfile} = useLogIN();
  const navigation = useNavigation();
  const [email, setemail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const [secureTextEntry, setsecureTextEntry] = React.useState(false);

  const handleLogin = () => {
    setLoading(true);
    axios
      .post("http://10.0.2.2:2020/auth/LogIN", {
        email,
        password,
      })

      .then(res => {
        console.log("====================================");
        console.log(
          "🚀 ~ file: Register.tsx ~ line 64 ~ onSignUp ~ res",
          res.data
        );
        console.log("====================================");
        setLoading(false);

        setLog(true);
        setProfile(res.data.user);
        AsyncStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        setLoading(false);
        console.log("====================================");
        console.log(
          "🚀 ~ file: Register.tsx ~ line 64 ~ onSignUp ~ err",
          err.response
        );
        console.log("====================================");
      });
  };

  return (
    <>
      {
        // loding

        loading ? <Splash /> :
      
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <View style={styles.container}>
          <Animatable.View
            style={styles.header}
            animation="pulse"
            iterationCount="infinite"
            direction="alternate"
          >
            <ImgRegister />
          </Animatable.View>

          <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              direction="alternate"
            >
              {error ? (
                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginTop: 20,
                    fontSize: 20,
                  }}
                >
                  {error}
                </Text>
              ) : null}
            </Animatable.View>
            <Text style={styles.titleText}>Log in</Text>

            <View style={[styles.action, {marginTop: 20}]}>
              <Feather name="mail" color="#7e22ce" size={20} />
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChangeText={text => setemail(text)}
                value={email}
                placeholderTextColor="#fff"
              />
            </View>

            <View style={[styles.action, {marginTop: 20}]}>
              <FontAwesome name="lock" color="#7e22ce" size={20} />

              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.textInput}
                placeholderTextColor="#fff"
                onChangeText={password => setPassword(password)}
                value={password}
              />

              <Animatable.View animation="bounceIn">
                <TouchableOpacity onPress={() => setPassword()}>
                  {secureTextEntry ? (
                    <Feather name="eye-off" color="#fff" size={18} />
                  ) : (
                    <Feather name="eye" color="#fff" size={18} />
                  )}
                </TouchableOpacity>
              </Animatable.View>
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.button_signUp}
                onPress={() => handleLogin()}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.btnTextSignUp}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 16,
                }}
              >
                not a member?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={{
                  marginTop: 10,
                  backgroundColor: "#7e22ce",
                  padding: 10,
                  borderRadius: 10,
                  width: 150,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{color: "#fff", textAlign: "center", fontSize: 16}}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
          </KeyboardAvoidingView>
      }
    </>
  );
};
const image_width = Dimensions.get("window").width;
const image_height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  footer: {
    flex: 1,
    backgroundColor: "#000",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: image_width,
    height: image_height / 2,
  },
  titleText: {
    alignContent: "center",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  action: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#7e22ce",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#7e22ce",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  button_signUp: {
    backgroundColor: "#7e22ce",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: image_width - 50,
    height: 50,
  },
  btnTextSignUp: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
export default LogIN;
