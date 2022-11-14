import {NavigationContainer} from "@react-navigation/native";
import React from "react";

import "./mocks/server";
import LogCheck from "./ContText";
import StackNav from "./src/navigation/StackNav";

// create app context

const AppContext = React.createContext(null);

export const useAppContext = () => {
  return React.useContext(AppContext);
};

function App() {
  return (
    <LogCheck>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </LogCheck>
  );
}

export default App;
