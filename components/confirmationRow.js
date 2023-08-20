import * as React from "react";
import {
    Text,
    StyleSheet,
    View
} from "react-native";

const ConfirmationRow = (props) => (
    <View style={styles.row}>
        <View style={styles.column}>
            <Text style={styles.columnText}>{props.title}</Text>
        </View>
        <View style={styles.columnMiddle}>
            <Text style={styles.columnText}>:</Text>
        </View>
        <View style={styles.column}>
            <Text style={styles.columnText}>{props.value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
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

export default ConfirmationRow;
