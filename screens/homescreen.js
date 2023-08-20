import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";
import { database } from "../db/database";
const HomeScreen = () => {
  const [planets, setplanets] = useState()
  useEffect(() => {
    database.getPlanets(setplanets)
  }, [])

  useEffect(() => {
    // console.log(planets)
  }, [planets])
  if (!planets){
    return <Text>Loading...</Text>;
  }
  
  return (
    <ScrollView >
      <View style={{ flex: 1 , backgroundColor:'green'}}>
        <HorizontalScroll title="Planets" objects={planets}/>
        <HorizontalScroll title="Spacelines" />
      </View>
    </ScrollView>
  );
};



export default HomeScreen;
