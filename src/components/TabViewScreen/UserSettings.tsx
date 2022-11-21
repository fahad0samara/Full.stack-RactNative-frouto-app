import {
  View,
  Switch,
  Text,
  TouchableOpacity,
  Share,
  ScrollView,
} from "react-native";
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import {LogBox} from "react-native";
import Toast from "react-native-simple-toast";
import {useLogIN} from "../../../ContText";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UserSettings = () => {
  const {setLog, setProfile, setLoading} = useLogIN();
  // log out
   const logout = async () => {
     setLoading(true);
     try {
       const response = await axios.get("http://10.0.2.2:2020/auth/logout", {
         headers: {
           Authorization: `Jwt ${await AsyncStorage.getItem("token")}`,
         },
       });

       await AsyncStorage.removeItem("token");
       setLoading(false);
       setLog(false);
        setProfile({});
        Toast.show("Log out successfully");
     } catch (error) {
       setLoading(false);
       console.log(
         error.response.data.message || "Something went wrong, try again"
         
       );
       

   
    

     }
   };

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  //Share the app
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          " Hey, I am using this app to learn about the stock market. You should try it out too! https://play.google.com/store/apps/details?id=com.stockmarketapp",
        url: "https://play.google.com/store/apps/details?id=com.stockmarketapp",

        ///
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          Toast.show("Shared!");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        Toast.show("Dismissed!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",

            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#7e22ce",
              borderRadius: 50,
              padding: 1,
            }}
          >
            <AntDesign name="notification" size={24} color="white" />
          </View>
          <Text
            style={{
              color: "#696969",
              fontSize: 15,
              fontStyle: "italic",

              marginHorizontal: 5,
            }}
          >
            Notifications
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Push Notification
          </Text>
          <Switch
            trackColor={{false: "#767577", true: "#81b0ff"}}
            thumbColor={isEnabled ? "#7e22ce" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Email Notification
          </Text>

          <Switch
            trackColor={{false: "#767577", true: "#fff"}}
            thumbColor={isEnabled2 ? "#7e22ce" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",

            marginHorizontal: 20,
            marginVertical: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "#7e22ce",
              borderRadius: 50,
              padding: 1,
            }}
          >
            <AntDesign name="infocirlceo" size={20} color="white" />
          </View>
          <Text
            style={{
              color: "#696969",
              fontSize: 15,
              fontStyle: "italic",

              marginHorizontal: 5,
            }}
          >
            About
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 7,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            About Us
          </Text>
        </View>
        {
          // feedback
        }
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 7,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Feedback
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",

            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#7e22ce",
              borderRadius: 50,
              padding: 1,
            }}
          >
            <AntDesign name="setting" size={20} color="white" />
          </View>

          <Text
            style={{
              color: "#696969",
              fontSize: 15,
              fontStyle: "italic",

              marginHorizontal: 5,
            }}
          >
            Other
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Terms and Conditions
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Privacy Policy
          </Text>

          <AntDesign name="right" size={24} color="#fff" />
        </View>
        <TouchableOpacity
          onPress={onShare}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 17,
              fontStyle: "italic",
            }}
          >
            Share the app
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Rate the app
          </Text>
        </View>
        <TouchableOpacity
          // logout
          onPress={() => logout()}
          style={{
            flexDirection: "row",
            backgroundColor: "#7e22ce",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 30,
            borderRadius: 10,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",

              fontSize: 20,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserSettings;
