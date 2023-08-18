import * as React from "react";
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  View,
  FlatList
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Card } from "react-native-paper";



const data = [
  {
    id: 1,
    title: "Culture",
    image: require("../assets/upscaled.png"),
  },
  {
    id: 2,
    title: "Climate",
    image: require("../assets/mars_climate.png"),
  },
  {
    id: 3,
    title: "Tourist Attractions",
    image: require("../assets/tourist.png"),
  },
];

const renderItem = ({ item }) => (
  <View style={styles.horizontalCard}>
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
  </View>
);

const DestinationInfo = () => (
  <SafeAreaProvider style={{backgroundColor: '#F6FAFD'}}>
    <Text style={styles.titleText}>Mars</Text>
    <Card style={styles.card}>
      <Image source={require("../assets/mars.gif")} style={styles.image} />
    </Card>
    <Pressable style={styles.button}>
      <Text>Book Now</Text>
    </Pressable>
    <View style={{ height:400, margin:15 }}>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={true}
    />
    </View>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  image: {
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
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#09E488",
    width: 200,
    alignSelf: "center",
  },

  horizontalCard: {
    backgroundColor: '#F6FAFD',
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
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default DestinationInfo;
