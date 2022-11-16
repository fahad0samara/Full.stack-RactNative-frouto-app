import * as React from "react";
import {View,Text, useWindowDimensions, Dimensions, StyleProp, TextStyle, ViewStyle} from "react-native";
import { TabView, TabBar, SceneMap, NavigationState, Route, SceneRendererProps, TabBarIndicatorProps, TabBarItemProps } from "react-native-tab-view";
import Setting from "./UserSettings";
import Profile from "./Profile";
import { Scene, Event } from "react-native-tab-view/lib/typescript/types";
 const {width} = Dimensions.get("window");
const { height } = Dimensions.get("window");
 

const renderScene = SceneMap({
  first: Setting,
  second: Profile,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: "first", title: "Setting"},
    {key: "second", title: "Profile"},
  ]);
    const renderTabBar = (props: JSX.IntrinsicAttributes & SceneRendererProps & { navigationState: NavigationState<Route>; scrollEnabled?: boolean | undefined; bounces?: boolean | undefined; activeColor?: string | undefined; inactiveColor?: string | undefined; pressColor?: string | undefined; pressOpacity?: number | undefined; getLabelText?: ((scene: Scene<Route>) => string | undefined) | undefined; getAccessible?: ((scene: Scene<Route>) => boolean | undefined) | undefined; getAccessibilityLabel?: ((scene: Scene<Route>) => string | undefined) | undefined; getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined; renderLabel?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderIcon?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderBadge?: ((scene: Scene<Route>) => React.ReactNode) | undefined; renderIndicator?: ((props: TabBarIndicatorProps<Route>) => React.ReactNode) | undefined; renderTabBarItem?: ((props: TabBarItemProps<Route> & { key: string; }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) | undefined; onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; tabStyle?: StyleProp<ViewStyle>; indicatorStyle?: StyleProp<ViewStyle>; indicatorContainerStyle?: StyleProp<ViewStyle>; labelStyle?: StyleProp<TextStyle>; contentContainerStyle?: StyleProp<ViewStyle>; style?: StyleProp<ViewStyle>; gap?: number | undefined; }) => (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: '#fff',
          height: 3,  

        }}

        style={{
          backgroundColor: '#7e22ce',
          height: 50,
          borderRadius: 10,
          marginHorizontal: 10,
          marginTop: height / 10,
          marginBottom: 20,

        }}
        activeColor={"white"}
        inactiveColor={"black"}
        labelStyle={{
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'capitalize',

        }}

      />
    );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ 
        width: layout.width,
        height: layout.height,

       }}
      renderTabBar={renderTabBar}
   


   
      
    />
  );
}
