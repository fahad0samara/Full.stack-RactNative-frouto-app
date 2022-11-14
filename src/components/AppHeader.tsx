import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLogIN} from "../../ContText";
import {AntDesign} from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
const AppHeader = () => {
  const { width, height } = Dimensions.get("window");
;


  


  
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
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            backgroundColor: "#7e22ce",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Order")}
        >
          {
            // icon for cart
          }

          <AntDesign name="shoppingcart" size={24} color="white" />

          {products.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{products.length}</Text>
            </View>
          )}
        </TouchableOpacity>
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
  badge: {
    position: 'absolute',
    backgroundColor: 'red',
    aspectRatio: 1,
    width: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: -6,
    top: -5,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
