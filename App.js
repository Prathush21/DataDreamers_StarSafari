import AppBar from "./components/appbar";
import HomeScreen from "./screens/homescreen";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DestinationInfo from "./components/destination_info";
import TravelDetails from "./components/travel_details";
import SeatReservation from "./components/seat_reservation";


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
        {/* <Stack.Screen
          name="DestinationInfo"
          component={DestinationInfo}
        /> */}
      <Stack.Screen
          name="TravelDetails"
          component={TravelDetails}
          options={{title:'Star Safari'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

