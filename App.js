import AppBar from "./components/appbar";
import DestinationInfo from "./screens/destination_info";
import TravelDetails from "./screens/travel_details";
import HomeScreen from "./screens/homescreen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeatReservation from "./screens/seat_reservation";
import PaymentDetailScreen from "./screens/payment_detail_screen";
import BookingConfirmation from "./screens/booking_confirmation";
import useDatabase from "./hooks/useDatabase";
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";

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
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const fetchFonts = async () => {
    await Font.loadAsync({
      "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
      "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
      "Raleway-Italic": require("./assets/fonts/Raleway-Italic.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  if (!dbLoaded || !fontsLoaded) {
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
        <Stack.Screen
          name="DestinationInfo"
          component={DestinationInfo}
          options={{ title: "Star Safari" }}
        />
        <Stack.Screen name="TravelDetails" component={TravelDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
