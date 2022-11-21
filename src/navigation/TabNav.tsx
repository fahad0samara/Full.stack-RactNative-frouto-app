import React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {getFocusedRouteNameFromRoute, NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome} from "@expo/vector-icons";
import {Image, ScrollView, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";

import {useLogIN} from "../../ContText";
import Settings from "../components/TabViewScreen/Settings";

const BottomTab = ({type, color, size = 24, isFocused, index}) => {
  const {products} = useLogIN();
  const icons = [
    {
      name: "home",
    },
    {
      name: "shopping-basket",
    },
    {
      name: "user",
    },
  ];

  const gradient = index == 1;
  return (
    <View>
      {gradient ? (
        <LinearGradient
          colors={["#7e22ce", "#4e32ce"]}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}
        >
          <FontAwesome
            // if the tab is focused, change the color to white

            name={icons[index].name}
            size={size}
            color={isFocused ? "#fff" : "#fff"}
          />

          {products.length > 0 && (
            // if there is no product in the cart
            // the badge will not show
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <Text
                style={{
                  color: "#7e22ce",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {products.length}
              </Text>
            </View>
          )}
        </LinearGradient>
      ) : (
        <FontAwesome
          // if the tab is focused, change the color to white

          name={icons[index].name}
          size={size}
          color={color}
        />
      )}
    </View>
  );
};

const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomBar}>
      {state.routes.map(
        (
          route: {key: string | number; name: any},
          index: React.Key | null | undefined
        ) => {
          const isFocused = state.index === index;

          const {options} = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",

              target: route.key,

              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const color = isFocused ? "#7e22ce" : "#fff";

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              testID={options.tabBarTestID}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
            >
              <BottomTab
                type={options.type}
                index={index}
                isFocused={isFocused}
                size={24}
                color={color}
              />
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = ({route,navigation}) => {
 
  
      
    
  


  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: "Home",

          tabBarLabelStyle: {
            fontSize: 12,
            color: "#000",
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{tabBarBadge: 3}}
        name="CartScreen"
        component={CartScreen}
      />

      <Tab.Screen
        name="Settings"
        options={{
          tabBarLabel: "Settings",
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#fff",
          },
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const TabNav = ({}) => {
  return <TabNavigator />;

};

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    // LinearGradient ba
    backgroundColor: "#000",
    alignItems: "center",
  },
  gradient: {
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    elevation: 8,
  },
});

export default TabNav;
