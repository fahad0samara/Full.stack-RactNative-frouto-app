import * as React from "react";
import {StackActions} from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import * as Progress from "react-native-progress";
import {useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const [email, setemail] = React.useState("");
  const [name, setname] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState();

  const navigation = useNavigation();

  // Log IN
  const register = async () => {
    //    "https://firstauth.azurewebsites.net/auth/login",
    if (
      // if the email not valid
      !email ||
      !password ||
      email === "" ||
      password === ""
    ) {
      setError("Please fill in all fields");
    } else {
      setLoading(true);

      setLoading(true);
      const user = {name, email, password};
      try {
        const response = await axios.post(
          "https://firstauth.azurewebsites.net/auth/register",
          user
          );
          
      
        const SingIN = await axios.post(
          "https://firstauth.azurewebsites.net/auth/login",
          {
            email,
            password,
          }
        );
        navigation.dispatch(
          StackActions.replace("UplodImage", {
            token: SingIN.data.token,
          })
        );
        console.log("====================================");
        console.log("ttttttt");
        console.log("====================================");
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error.response.data.message);
        console.log(error.response.data);

        console.log(error.response.data.message, "2");
      }
    }
  };

  return (
    // loading
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Progress.Circle
            size={100}
            indeterminate={true}
            color="#745f9a"
            borderWidth={0}
            thickness={
              4 // The thickness of the circle
            }
          />

          <Text
            style={{
              fontSize: 40,
              marginTop: 4,
              fontWeight: "600",

              color: "#745f9a",
              textAlign: "left",
            }}
          >
            Loading...
          </Text>
        </View>
      ) : (
        <View style={styles.loginView}>
          <View style={styles.rectangleView} />

         

          <Text style={styles.salutStevenText}>
            <Text style={styles.welcome}>
              Welcome to{"\n"}
              {"\n"}
            </Text>
            <Text style={styles.Back}>our blog</Text>
          </Text>
          {
            // TextInput for email and password
          }

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <TextInput
              style={{
                position: "absolute",
                top: 400,
                paddingLeft: -10,
                left: 30,

                paddingLeft: 40,
                width: 300,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#ccbee3",

                borderStyle: "dashed",
                borderColor: "#000",
                borderWidth: 2,
                overflow: "hidden",
              }}
              placeholder="
                              your Name"
              onChangeText={text => setname(text)}
              value={name}
              keyboardType="email-address"
            />
            {
              // name
            }

            <Ionicons
              name="person"
              size={26}
              style={{
                position: "absolute",
                top: 410,
                left: 40,
              }}
              color={"#fff"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 60,
            }}
          >
            <TextInput
              style={{
                position: "absolute",
                top: 400,

                left: 30,

                elevation: 5,
                paddingLeft: 40,
                width: 300,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#ccbee3",

                borderStyle: "dashed",
                borderColor: "#000",
                borderWidth: 2,
                overflow: "hidden",
              }}
              placeholder="Password"
              onChangeText={text => setemail(text)}
              value={email}
              secureTextEntry={true}
              keyboardType="email-address"
            />
            <Ionicons
              name="mail"
              size={26}
              style={{
                position: "absolute",
                top: 410,
                left: 40,
              }}
              color={"#fff"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <TextInput
              style={{
                position: "absolute",
                top: 450,
                paddingLeft: -10,
                left: 30,

                paddingLeft: 40,
                width: 300,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#ccbee3",

                borderStyle: "dashed",
                borderColor: "#000",
                borderWidth: 2,
                overflow: "hidden",
              }}
              placeholder="password"
              onChangeText={text => setpassword(text)}
              value={password}
              autoComplete="password"
            />
            <Ionicons
              name="lock-closed"
              size={26}
              style={{
                position: "absolute",
                top: 460,
                left: 40,
              }}
              color={"#fff"}
            />
          </View>
          <TouchableOpacity
            onPress={() => register()}
            style={{
              position: "absolute",
              shadowColor: "#000",
              shadowOffset: {
                width: 4,
                height: 6,
              },

              shadowOpacity: 6,
              shadowRadius: 2,
              elevation: 8,

              top: 600,

              marginHorizontal: "15%",
              borderRadius: 38,
              backgroundColor: "#ccbee3",
              borderStyle: "solid",
              borderColor: "#fff",
              borderWidth: 2,
              overflow: "hidden",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 250,
              height: 50,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: 660,
              marginHorizontal: "25%",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 15,
              }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {
            // Error message
          }
          {error ? (
            <View
              style={{
                position: "absolute",
                top: 700,
                marginHorizontal: "15%",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 15,
                }}
              >
                {error}
              </Text>
            </View>
          ) : null}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rectangleView: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 45,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    width: 375,
    height: 812,
  },
  emailText: {
    position: "absolute",
    top: 442,
    left: 62,
    fontSize: 14,

    color: "#ccbee3",
    textAlign: "left",
  },
  motDePasse: {
    position: "absolute",
    top: 540,
    left: 62,
    fontSize: 14,

    color: "#ccbee3",
    textAlign: "left",
  },
  vectorIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 400,
    height: 397,
  },
  rectangleIcon: {
    position: "absolute",
    top: -6,
    left: 232.79,
    width: 492.58,
    height: 485.1,
    display: "none",
  },
  rectangleIcon1: {
    position: "absolute",
    top: 14.86,
    left: 68.1,
    width: 419.69,
    height: 443.09,
  },

  salutText: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  Back: {
    margin: 0,
  },
  salutStevenText: {
    position: "absolute",
    top: 155,
    left: 52,
    fontSize: 30,

    color: "#fff",
    textAlign: "left",
  },
  rectangleView1: {
    position: "absolute",
    top: 677,
    left: 62,
    borderRadius: 38,
    shadowColor: "#b9abd2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    width: 270,
    height: 55,
  },
  sinscrireText: {
    position: "absolute",
    top: 694,
    left: 159,
    fontSize: 18,
    fontWeight: "600",

    color: "#fff",
    textAlign: "left",
  },

  lineView1: {
    position: "absolute",
    top: 499.5,
    left: 61.5,
    borderStyle: "solid",
    borderColor: "#ccbee3",
    borderTopWidth: 1,
    width: 271,
    height: 1,
  },
  icons8SignMail1: {
    position: "absolute",
    top: 468,
    left: 62,
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  icons8Key1: {
    position: "absolute",
    top: 566,
    left: 60,
    width: 24,
    height: 24,
    overflow: "hidden",
  },
});

export default Register;
