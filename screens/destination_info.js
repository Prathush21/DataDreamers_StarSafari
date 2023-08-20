import * as React from "react";
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  View,
  FlatList,
  ImageBackground
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { database } from "../db/database";



const data = [
  {
    id: 1,
    title: "Culture",
  },
  {
    id: 2,
    title: "Climate",
  },
  {
    id: 3,
    title: "Tourist Attractions",
  },
];

const imagesList = {
  'Mars': {
    'image': require('../assets/mars.gif'),
    'culture': require('../assets/mars_culture.png'),
    'climate': require('../assets/mars_climate.png'),
    'tourist': require('../assets/mars_tourist.png')
  },
  
  'Jupiter': {
    'image': require('../assets/jupiter.gif'),
    'culture': require('../assets/jupiter_culture.png'),
    'climate': require('../assets/jupiter_climate.jpg'),
    'tourist': require('../assets/jupiter_tourist.jpg')
  },

}

const DestinationInfo = ({ route }) => {
  const navigation = useNavigation();
  const [trips, settrips] = React.useState();


  const planet = route.params.planet;

  useEffect(() => {
    database.getTrips(settrips);
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.horizontalCard}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.title === "Culture" && (
          
          <Image source={imagesList[planet.planet_name].culture} style={styles.cardImage} />
  
        )}
         {item.title === "Climate" && (
          
          <Image source={imagesList[planet.planet_name].climate} style={styles.cardImage} />
  
        )}
         {item.title === "Tourist Attractions" && (
          
          <Image source={imagesList[planet.planet_name].tourist} style={styles.cardImage} />
  
        )}
      {/* <Image source={imagesList[planet.planet_name].culture} style={styles.cardImage} /> */}
      <View style={styles.overlay}>
        {item.title === "Culture" && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{planet.culture}</Text>
          </View>
        )}
        {item.title === 'Climate' && (
    <View style={styles.overlay}>
      <Text style={styles.overlayText}>{planet.climate}</Text>
    </View>
  )}
   {item.title === 'Tourist Attractions' && (
    <View style={styles.overlay}>
      <Text style={styles.overlayText}>{planet.top_tourist_attraction}</Text>
    </View>
  )}
      </View>
    </View>
  );

  return (
    <SafeAreaProvider style={{ backgroundColor: "#F6FAFD" }}>
      <ImageBackground
            source={require("../assets/images/nightsky.jpg")}
            resizeMode="stretch"
            style={styles.img}>
      <Text style={styles.titleText}>{planet.planet_name}</Text>
      <Card style={styles.card}>
        <Image source={imagesList[planet.planet_name].image} style={styles.image} />
      </Card>

      <View style={{ height: 400, margin: 15 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={true}
        />
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("TravelDetails", {planet_name: planet.planet_name, trip: trips[0]})}
        >
          <Text>Book Now</Text>
        </Pressable>
      </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    // fontFamily: "Raleway-Bold",
  },

  image: {
    width: 200,
    height:200,
    resizeMode: "cover",
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

  button: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#09E488",
    width: 200,
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
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Raleway-Italic",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay absolutely within the container
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 20,
    // backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black overlay
  },
  overlayText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
});

export default DestinationInfo;
