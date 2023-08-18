import AppBar from "./components/appbar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DestinationInfo from "./components/destination_info";
import TravelDetails from "./components/travel_details";

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{header:AppBar}}>
        {/* <Stack.Screen
          name="DestinationInfo"
          component={DestinationInfo}
        /> */}
      <Stack.Screen
          name="TravelDetails"
          component={TravelDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

