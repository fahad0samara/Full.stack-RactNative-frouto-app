import {NavigationContainer} from "@react-navigation/native";
import React from "react";

import LogCheck from "./ContText";
import StackNav from "./src/navigation/StackNav";
import Splash from "./src/configs/Splash";

// create app context

function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  const SplashScreen = () => {
    return <Splash />;
  };
  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 5000);
  }, []);
  return (
    <>
      <LogCheck>
        <NavigationContainer>
          {hideSplashScreen ? <StackNav /> : <SplashScreen />}
        </NavigationContainer>
      </LogCheck>
    </>
  );
}

export default App;
