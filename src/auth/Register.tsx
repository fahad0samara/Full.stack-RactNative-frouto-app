import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
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

import * as Animatable from "react-native-animatable";
import {FontAwesome} from "@expo/vector-icons";
import ImgRegister from "../configs/ImgRegister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackActions} from "@react-navigation/native";
import {useLogIN} from "../../ContText";
import LoderApp from "../configs/LoderApp";

const Sing = ({navigation}: any) => {
  const {setProfile} = useLogIN();
  const [email, setemail] = React.useState("");
  const [name, setname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [PhoneNumber, setPhoneNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValidUserName, setisValidUserName] = React.useState(false);

  const [secureTextEntry, setsecureTextEntry] = React.useState(false);
  // register for user
  const onSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://10.0.2.2:2020/auth/register", {
        name,
        email,
        password,
      });
     
   
      setError("");

      setLoading(false);
      const LOgIne = await axios.post("http://10.0.2.2:2020/auth/LogIN", {
        email,
        password,
      });

      await AsyncStorage.setItem("token", LOgIne.data.token);
      navigation.dispatch(
        StackActions.replace("UploadImage", {
          token: LOgIne.data.token,
        })
      );



    
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      console.log(
        "🚀 ~ file: Register.tsx ~ line 64 ~ onSignUp ~ error",
        error.response.data
      );
      
   
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Animatable.View animation="fadeInUpBig" style={styles.container}>
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
          <Text style={styles.titleText}> Sign Up </Text>
          <View style={[styles.action, {marginTop: 20}]}>
            <FontAwesome
              //  name="user-o"
              name="user"
              color="#EAB308"
              size={20}
            />
            {
              // this is the name input and the name is required
              //
            }
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => {
                setname(text);
                if (text.length >= 4) {
                  setisValidUserName(true);
                } else {
                  setisValidUserName(false);
                }
              }}
              placeholderTextColor="#fff"
            />

            {isValidUserName ? (
              <Animatable.View animation="bounceIn">
                <FontAwesome name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <View style={[styles.action, {marginTop: 20}]}>
            <FontAwesome
              //  name="user-o"
              name="envelope"
              color="#EAB308"
              size={20}
            />
            {
              // this is the email input and the email is required
            }

            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              value={email}
              autoCapitalize="none"
              onChangeText={text => {
                setemail(text);
                // this is the email validation
                if (text.includes("@") && text.includes(".")) {
                  setIsValidEmail(true);
                } else {
                  setIsValidEmail(false);
                }
              }}
              placeholderTextColor="#fff"
            />

            {isValidEmail ? (
              <Animatable.View animation="bounceIn">
                <FontAwesome name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <View style={[styles.action, {marginTop: 20}]}>
            <FontAwesome name="lock" color="#EAB308" size={20} />
            {
              // this is the password input and the password is required
            }

            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              value={password}
              autoCapitalize="none"
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry={secureTextEntry ? true : false}
              placeholderTextColor="#fff"
            />

            <TouchableOpacity
              onPress={() => setsecureTextEntry(!secureTextEntry)}
            >
              {secureTextEntry ? (
                <FontAwesome name="eye-slash" color="grey" size={20} />
              ) : (
                <FontAwesome name="eye" color="white" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.button_signUp}
              onPress={() => onSignUp()}
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
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LogIN")}
              style={{
                marginTop: 10,
                backgroundColor: "#7e22ce",
                padding: 10,
                borderRadius: 10,
                width: 150,
                alignSelf: "center",
              }}
            >
              <Text style={{color: "#fff", textAlign: "center", fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </Animatable.View>
      {
        // loding

        loading ? <LoderApp /> : null
      }
    </KeyboardAvoidingView>
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
    color: "#fff",
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
export default Sing;
