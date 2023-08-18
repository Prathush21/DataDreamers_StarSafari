import AppBar from "./components/appbar";
import HomeScreen from "./screens/homescreen";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#346FC7',
    background:'#F6FAFD'
  },
};
export default function App() {
  return (

    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{header:AppBar}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title:'Star Safari'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

