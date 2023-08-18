import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";

const HomeScreen = () => {
  return (
    <ScrollView >
      <View style={{ flex: 1 , backgroundColor:'green'}}>
        <HorizontalScroll title="Planets" />
        <HorizontalScroll title="Spacelines" />
      </View>
    </ScrollView>
  );
};



export default HomeScreen;
