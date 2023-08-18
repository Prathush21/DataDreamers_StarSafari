import * as React from "react";
import {
    Text,
    StyleSheet,
    Image,
    View,
    ImageBackground
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Card } from "react-native-paper";

const BookingConfirmation = () => (
    <SafeAreaProvider>
        <ImageBackground
            source={require("../assets/images/nightsky.jpg")}
            resizeMode="stretch"
            style={styles.img}>
            <Text style={styles.titleText}>Booking Confirmation</Text>
            <Image source={require("../assets/mars.gif")} style={styles.image} />
            <Card style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>Planet</Text>
                    </View>
                    <View style={styles.columnMiddle}>
                        <Text style={styles.columnText}>:</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>Mars</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>Spaceline</Text>
                    </View>
                    <View style={styles.columnMiddle}>
                        <Text style={styles.columnText}>:</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>NASA</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>Departure</Text>
                    </View>
                    <View style={styles.columnMiddle}>
                        <Text style={styles.columnText}>:</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>18/08/2023</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>Price</Text>
                    </View>
                    <View style={styles.columnMiddle}>
                        <Text style={styles.columnText}>:</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>10 million</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>Passengers</Text>
                    </View>
                    <View style={styles.columnMiddle}>
                        <Text style={styles.columnText}>:</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.columnText}>2</Text>
                    </View>
                </View>

            </Card>
        </ImageBackground>
    </SafeAreaProvider>
);

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
        height: 300,
        width: 200
    },
    card: {
        borderRadius: 15,
        alignSelf: "center",
        backgroundColor: "#CFEBFF",
        height: '40%',
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
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
    }
});

export default BookingConfirmation;
