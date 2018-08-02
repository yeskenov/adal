
import { createStackNavigator } from "react-navigation"; 
import React from "react";

import Main from "./components/main";
import Additives from "./components/additives";
// import Login from "./Login";
// import SignUp from "./signup";
// import Add from "./add";



const RootStack = createStackNavigator({
  Main: { screen: Main },
  Additives: { screen: Additives },
  
  
  // UniSearch: { screen: UniSearch },
  // SignUp: { screen: SignUp },
  // Add: { screen: Add }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}



