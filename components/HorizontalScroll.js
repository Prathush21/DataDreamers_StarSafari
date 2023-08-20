import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Category from "./category";
const { height, width } = Dimensions.get("window");

const HorizontalScroll = (props) => {
  if (!props.objects) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.view1}>
        <Text style={styles.title}>{props.title}</Text>

        <View style={styles.view2}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={16}
          >
            {props.objects.map((object, index) => {
              return (
                <Category
                  key={index}
                  imageUri={require("../assets/images/nasa.jpg")}
                  name={object.planet_name}
                  data = {object}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  view2: {
    height: 150,
    marginTop: 20,
  },

  title: { fontSize: 24, fontWeight: "700", paddingHorizontal: 20},
});
export default HorizontalScroll;
