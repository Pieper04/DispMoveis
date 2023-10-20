import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from './src/pages/Home/Index';
import Location from './src/pages/Location/Index';
import Camera from './src/pages/Camera/Index';
import Contatos from './src/pages/Contatos/Index';
import ManImages from './src/pages/ManImages/Index';
import ESMS from './src/pages/ESMS/Index';
import speech from './src/pages/Speech/Index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Location" component={Location}/>
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="Contatos" component={Contatos}/>
        <Stack.Screen name="ManImages" component={ManImages}/>
        <Stack.Screen name="ESMS" component={ESMS}/>
        <Stack.Screen name="speech" component={speech}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}