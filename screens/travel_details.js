import * as React from "react";
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  TextInput,
  View,
  Button,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Card, Divider } from "react-native-paper";
import { database } from "../db/database";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const TravelDetails = ({ route }) => {
  const [travelDetails, onChangeTravelDetails] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [passengers, onChangePassengers] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [trips, settrips] = React.useState();
  const [vehicles, setvehicles] = React.useState();
  const [timeList, setTimeList] = React.useState();
  const navigation = useNavigation();

  const planet = route.params.planet;
  const trip = route.params.trip;

  useEffect(() => {
    database.getVehicles(setvehicles);
  }, []);

  const handleTimePress = (time) => {
    if (selectedTime === time) {
      setSelectedTime(null); // Reset the selected time if clicked again
    } else {
      setSelectedTime(time);
    }
  };

  const isTimeSelected = (time) => selectedTime === time;

  function formatTimeToHoursMins(date) {
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const styles = StyleSheet.create({
    titleText: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 0.75,
      padding: 10,
      borderRadius: 5,
    },
    hourinput: {
      height: 40,
      width: 70,
      margin: 12,
      borderWidth: 0.75,
      padding: 10,
      borderRadius: 5,
    },

    image1: {
      width: 100,
      height: 70,
      resizeMode: "cover",
      alignSelf: "center",
      margin: 10,
    },

    image2: {
      width: 200,
      height: 5,
      alignSelf: "center",
      margin: 10,
      marginRight: 5,
    },
    card: {
      borderRadius: 15,
      alignSelf: "center",
      backgroundColor: "black",
      marginTop: 10,
      marginBottom: 10,
    },

    confirmbutton: {
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: "#09E488",
      width: 125,
      alignSelf: "center",
      marginLeft: 20,
    },

    cancelbutton: {
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: "#8E929B",
      width: 125,
      alignSelf: "center",
    },

    horizontalCard: {
      backgroundColor: "#F6FAFD",
      borderRadius: 10,
      marginHorizontal: 10,
    },

    cardImage: {
      width: 350,
      height: 300,
      borderRadius: 10,
    },
    cardTitle: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },

    timeCard: {
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: "#8E929B",
      width: 125,
      alignSelf: "center",
      marginLeft: 20,
    },
  });

  return (
    <SafeAreaProvider style={{ backgroundColor: "#F6FAFD" }}>
      <View
        style={{
          margin: 20,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 7,
          paddingBottom: 20,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Card style={styles.card}>
          <Image
            source={require("../assets/spacex.jpeg")}
            style={styles.image1}
          />
        </Card>
        <Divider bold style={{ backgroundColor: "black" }} />

        <View
          style={{
            margin: 20,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 4 }}>Earth</Text>

          <Image
            source={require("../assets/a26f5a5d1677c840eb556ced719307a3de52c26f.png")}
            style={styles.image2}
          />

          <Text style={{ fontSize: 20, marginTop: 4 }}>{planet.name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 25,
          }}
        >
          <Text style={{ fontSize: 12, paddingLeft: 10 }}>
            USA Space Station
          </Text>
          <Text style={{ fontSize: 12, paddingLeft: 120 }}>
            {planet.name} Space Station
          </Text>
        </View>
        <Divider bold style={{ backgroundColor: "black" }} />

        <Text style={{ marginLeft: 10, fontSize: 15, marginTop: 10 }}>
          {" "}
          Departure Date
        </Text>

        <TextInput
          style={styles.input}
          value={trip.departure_date}
          numberOfLines={4}
          editable={false}
          selectTextOnFocus={false}
        />
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        ></View>
        <Text style={{ marginLeft: 10, fontSize: 15 }}> Departure Time</Text>
        <TextInput
          style={styles.input}
          value={trip.departure_time}
          numberOfLines={4}
          editable={false}
          selectTextOnFocus={false}
        />

        <Text style={{ marginLeft: 10, fontSize: 15, marginTop: 10 }}>
          {" "}
          Travel Package Details
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeTravelDetails}
          value={trip.trip_facilities}
          numberOfLines={4}
          multiline={true}
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={{ marginLeft: 10, fontSize: 15, marginTop: 10 }}>
          {" "}
          Number of Passengers
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangePassengers}
          value={passengers}
          numberOfLines={4}
          multiline={true}
          keyboardType="numeric"
        />
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Pressable
          style={styles.cancelbutton}
          onPress={() =>
            navigation.navigate("DestinationInfo", { planet: planet })
          }
        >
          <Text>Cancel</Text>
        </Pressable>
        <Pressable
          style={styles.confirmbutton}
          onPress={() =>
            navigation.navigate("SeatReservation", {
              planet_name: planet_name,
              trip: trip,
              passengers_count: passengers,
            })
          }
        >
          <Text>Confirm</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

export default TravelDetails;
