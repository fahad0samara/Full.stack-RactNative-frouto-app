import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { useLogIN } from "../../../ContText";

const {width} = Dimensions.get("window");
const {height} = Dimensions.get("window");
const Profile = () => {
  const { setProfile } = useLogIN();
  return (
    // profile secern
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        marginTop: height / 20,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: 300,
                height: 40,
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeholder="Name"
            />

            <TextInput
              style={{
                width: 300,
                height: 40,

                backgroundColor: "#fff",
                borderRadius: 10,
                paddingLeft: 10,
                marginTop: 10,
              }}
              placeholder="Email"
            />
            <TextInput
              style={{
                width: 300,
                height: 40,
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingLeft: 10,
                marginTop: 10,
              }}
              placeholder="Phone"
            />
            {
              // for password
            }
            <TextInput
              style={{
                width: 300,
                height: 40,
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingLeft: 10,
                marginTop: 10,
              }}
              placeholder="Password"
            />
            <TextInput
              style={{
                width: 300,
                height: 40,
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingLeft: 10,
                marginTop: 10,
              }}
              placeholder="Confirm Password"
            />
            {
              // for button edit the user
            }
            <TouchableOpacity
              style={{
                width: 300,
                height: 40,
                backgroundColor: "#7e22ce",
                borderRadius: 10,
                paddingLeft: 10,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Edit your profile
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};

export default Profile;
