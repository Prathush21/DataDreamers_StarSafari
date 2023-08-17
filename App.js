import AppBar from "./components/appbar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SeatReservation from "./components/seat_reservation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{header:AppBar}}>
        <Stack.Screen
          name="Home"
          component={SeatReservation}
          // options={{title:'Star Safari'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

