import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import { database } from '../db/database';
import ConfirmationRow from "../components/confirmationRow";
import { useNavigation } from "@react-navigation/native";

const BookingConfirmation = ({ route }) => {

    const [vehicleName, setVehicleName] = useState('');

    const vehicle_id = route.params.trip.vehicle_id
    console.log(route.params.planet)
    const planet_name = route.params.planet.name
    const trip = route.params.trip
    const traveller_count = route.params.traveller_count
    const total_amount = route.params.total_amount

    const navigation = useNavigation();

    useEffect(() => {
        database.getVehicleName(vehicle_id).then(info => {
            setVehicleName(info.vehiclename)
            console.log('vehicle name: ', info)
        })

    }, [])

    return (
        < SafeAreaProvider >
            <ImageBackground
                source={require("../assets/images/nightsky.jpg")}
                resizeMode="stretch"
                style={styles.img}>
                <Text style={styles.titleText}>Booking Confirmation</Text>
                <Image source={require("../assets/mars.gif")} style={styles.image} />
                <Card style={styles.card}>
                    <ConfirmationRow title='Planet' value={planet_name}></ConfirmationRow>
                    <ConfirmationRow title='Spaceline' value={vehicleName}></ConfirmationRow>
                    <ConfirmationRow title='Departure' value={trip.departure_date}></ConfirmationRow>
                    <ConfirmationRow title='Price' value={'$ ' + total_amount}></ConfirmationRow>
                    <ConfirmationRow title='Passengers' value={traveller_count}></ConfirmationRow>
                </Card>
                <Pressable
                    style={styles.confirmbutton}
                    onPress={() =>
                        navigation.navigate("Home", {})
                    }
                >
                    <Text>Ok</Text>
                </Pressable>
            </ImageBackground>
        </SafeAreaProvider >
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: 'white',
        paddingTop: 40,
        // fontFamily:'Raleway-Medium'
    },
    image: {
        resizeMode: "cover",
        alignSelf: "center",
        margin: 10,
        height: 200,
        width: 200
    },
    card: {
        borderRadius: 15,
        alignSelf: "center",
        backgroundColor: "#CFEBFF",
        height: '40%',
        width: '90%',
        marginTop: 10,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginTop: 20,
        marginLeft: 20
    },
    column: {
        flex: 1,
    },
    columnText: {
        fontSize: 18,
        fontWeight: 'bold',
        // fontFamily:'Raleway-Medium'
    },
    columnMiddle: {
        flex: 0.25,
        marginLeft: 20,
        width: 5
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
        marginBottom: 50
      },
});

export default BookingConfirmation;
