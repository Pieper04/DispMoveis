import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './src/pages/Login/Index';
import Home from './src/pages/Home/Index';
import Sobre from './src/pages/Sobre/Index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Sobre" component={Sobre}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}