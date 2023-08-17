import AppBar from "./components/appbar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DestinationInfo from "./components/destination_info";

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{header:AppBar}}>
        <Stack.Screen
          name="Home"
          component={DestinationInfo}
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

