import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Category = (props) => {

    const navigation = useNavigation();
    const planet_data = props.data

    const handleCategoryClick = () => {
        navigation.navigate("DestinationInfo", { planet: planet_data });
      };

        return (
            <TouchableOpacity style={styles.categoryContainer} onPress={handleCategoryClick} disabled = {props.objCategory!='Planets'}>

            <View style={styles.view1}>
                <View style={styles.view2} elevation={0} >
                    <Image source={props.imageUri}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text} >{props.name}</Text>

            </View>
            </TouchableOpacity>

                                
        );
    }

export default Category;

const styles = StyleSheet.create({
    view1: { height: 150, width: 130, marginLeft: 20, },
    view2: { flex: 2, borderWidth: 0.5, borderColor: '#dddddd', borderRadius:10,},
    image: { flex: 1, width: null, height: null, resizeMode: 'cover', margin:10},
    text: {textAlign:'center', marginTop:2}
});