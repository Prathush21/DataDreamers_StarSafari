import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, ImageBackground, SafeAreaProvider } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";
import { database } from "../db/database";
const HomeScreen = () => {
  const [planets, setplanets] = useState()
  const [vehicles, setvehicles] = useState()

  useEffect(() => {
    database.getPlanets(setplanets)
    database.getVehicles(setvehicles)

  }, [])

  useEffect(() => {
    console.log(vehicles)
  }, [vehicles])
  if (!planets){
    return <Text>Loading...</Text>;
  }
  
  return (
    <ImageBackground
      source={require("../assets/images/nightsky.jpg")}
      style={styles.backgroundImage}
    >
    <ScrollView >
      
      <View style={{ flex: 1 }}>
        <HorizontalScroll title="Planets" objects={planets}/>
        <HorizontalScroll title="Spacelines" objects={vehicles} />
      </View>
    </ScrollView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // You can change the resizeMode as needed
  },
});

export default HomeScreen;
