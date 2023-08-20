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
import { DatePickerInput } from "react-native-paper-dates";
import DateTimePickerModal from "react-native-modal-datetime-picker";




const TravelDetails = ({navigation}) => {
  const [departureDate, setDepartureDate] = React.useState(new Date());
  const [travelDetails, onChangeTravelDetails] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [passengers, onChangePassengers] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

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
  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    time = formatTimeToHoursMins(time);
    hideDatePicker();
    setSelectedTime(time);
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
          marginBottom:10,
          marginTop:5
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

          <Text style={{ fontSize: 20, marginTop: 4 }}>Mars</Text>
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
            Mars Space Station
          </Text>
        </View>
        <Divider bold style={{ backgroundColor: "black" }} />
        <DatePickerInput
          locale="en"
          label="Departure Date"
          value={departureDate}
          mode="outlined"
          onChange={(d) => setDepartureDate(d)}
          inputMode="start"
          style={{ backgroundColor: "#F6FAFD", margin: 8, marginBottom:20 }}
          // mode="outlined" (see react-native-paper docs)
        />

        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        ></View>
        <Text style={{ marginLeft: 10, fontSize: 15, marginBottom:20 }}> Departure Time</Text>
        <View style={{ flexDirection: "row" }}>
      <Pressable
        style={[
          styles.timeCard,
          { backgroundColor: isTimeSelected("08:00") ? "#09E488" : "#F6FAFD" },
        ]}
        onPress={() => handleTimePress("08:00")}
      >
        <Text style={{ color: isTimeSelected("08:00") ? "white" : "black", fontWeight: 'bold' }}>
          08:00
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.timeCard,
          { backgroundColor: isTimeSelected("16:00") ? "#09E488" : "#F6FAFD" },
        ]}
        onPress={() => handleTimePress("16:00")}
      >
        <Text style={{ color: isTimeSelected("16:00") ? "white" : "black", fontWeight: 'bold' }}>
          16:00
        </Text>
      </Pressable>
    </View>

        <Text style={{ marginLeft: 10, fontSize: 15, marginTop:20 }}>
          {" "}
          Travel Package Details
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeTravelDetails}
          value={travelDetails}
          numberOfLines={4}
          multiline = {true}
        />
        <Text style={{ marginLeft: 10, fontSize: 15, marginTop:20 }}>
          {" "}
          Number of Passengers
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangePassengers}
          value={travelDetails}
          numberOfLines={4}
          multiline = {true}
          keyboardType="numeric"

        />

        
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Pressable style={styles.cancelbutton}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable style={styles.confirmbutton}>
          <Text>Confirm</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

export default TravelDetails;
