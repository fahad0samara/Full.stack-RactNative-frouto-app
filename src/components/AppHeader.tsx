import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLogIN} from "../../ContText";
import {AntDesign} from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
const AppHeader = () => {
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
      
        <Image
          // her the image the come from the backend
          source={require("../../assets/fruit1.jpg")}
          style={styles.avatar}
        />

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
                fahad
              </Text>
            </Text>
          </Text>
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
  },

});
