import AppBar from "./components/appbar";
import DestinationInfo from "./components/destination_info";
import TravelDetails from "./components/travel_details";
import HomeScreen from "./screens/homescreen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeatReservation from "./screens/seat_reservation";
import PaymentDetailScreen from "./screens/payment_detail_screen";
import BookingConfirmation from "./screens/booking_confirmation";
import useDatabase from "./hooks/useDatabase";
import { Text } from "react-native";
const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#346FC7",
    background: "#F6FAFD",
  },
};
export default function App() {
  const dbLoaded = useDatabase();

  if (!dbLoaded) {
    return <Text>Initializing...</Text>;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ header: AppBar }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Star Safari" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
