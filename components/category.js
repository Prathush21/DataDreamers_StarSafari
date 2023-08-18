import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

const Category = (props) => {
        return (
            <View style={styles.view1}>
                <View style={styles.view2} elevation={0} >
                    <Image source={props.imageUri}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text} >{props.name}</Text>

            </View>
                                
        );
    }

export default Category;

const styles = StyleSheet.create({
    view1: { height: 150, width: 130, marginLeft: 20, },
    view2: { flex: 2, borderWidth: 0.5, borderColor: '#dddddd', borderRadius:10,},
    image: { flex: 1, width: null, height: null, resizeMode: 'cover', margin:10},
    text: {textAlign:'center', marginTop:2}
});