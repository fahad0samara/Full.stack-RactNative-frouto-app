import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLogIN} from "../../ContText";
import {AntDesign} from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
const AppHeader = () => {
  const {setLog, profile} = useLogIN();
  const { width, height } = Dimensions.get("window");

  const navigation = useNavigation();
  const { products } = useLogIN() 
  const [greeting, setGreeting] = React.useState("");

  React.useEffect(() => {
    //show the usr if in the morning or in evening
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Image
            // her the image the come from the backend
            source={{
              uri: profile.image.url,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View style={styles.groupText}>
          <Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {greeting}
            </Text>
            ,{" "}
            <Text>
              {
                // the name come from the backend
              }
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {profile.name}
              </Text>
            </Text>
          </Text>
          {
            // notification
          }
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="bells" size={24} color="black" />
          </TouchableOpacity>

          {
            // the number of the Notification
          }
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{color: "#000", fontSize: 12}}>
              {
                // the number of the Notification
              }
              {products.length}
            </Text>
          </View>

          <Text style={styles.desc}>What would you buy today?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  desc: {
    fontSize: 14,
    color: '#A1A1A1',
    marginTop: 4,
  },
  groupText: {
    flex: 1,
    marginLeft: 12,
  },
  container: {

    flexDirection: 'row',
    alignItems: 'center',

  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 2,


  },

});
