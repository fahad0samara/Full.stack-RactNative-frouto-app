import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";

import TabNav from "./TabNav";
import Register from "../auth/Register";
import LogIN from "../auth/LogIN";
import { useLogIN } from "../../ContText";

const Stack = createNativeStackNavigator();


const StackNav = () => {
  const { log }=useLogIN()
  return log ? (
    <TabNav/>
  ) : (


  
    
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="LogIN" component={LogIN} />

      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        
    </Stack.Navigator>
  );
  
};

export default StackNav;
