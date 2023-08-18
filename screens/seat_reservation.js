import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';

const SeatReservation = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const seatLabels = ['A', 'B', 'C', 'D'];

    const handleSeatSelection = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleReservation = () => {

    }

    const getSeatLabel = (row, col) => {
        const rowLabel = row.toString();
        const colLabel = seatLabels[col];
        return `${rowLabel}${colLabel}`;
      };
    
      const renderSeats = () => {
        const rows = 5;
        const leftColumns = 2;
        const rightColumns = 2;
        const gapWidth = 20;
        const seats = [];
    
        for (let row = 1; row <= rows; row++) {
          const rowSeats = [];
    
          for (let col = 0; col < leftColumns; col++) {
            const seatNumber = (row - 1) * (leftColumns + rightColumns) + col;
            const isSelected = selectedSeats.includes(seatNumber);
    
            rowSeats.push(
              <TouchableOpacity
                key={seatNumber}
                onPress={() => handleSeatSelection(seatNumber)}
                style={[styles.seat, isSelected && styles.selectedSeat]}
              >
                <Text style={styles.seatText}>{getSeatLabel(row, col)}</Text>
              </TouchableOpacity>
            );
          }
    
          rowSeats.push(<View style={{ width: gapWidth }} key={`gap-${row}`} />);
    
          for (let col = leftColumns; col < leftColumns + rightColumns; col++) {
            const seatNumber = (row - 1) * (leftColumns + rightColumns) + col;
            const isSelected = selectedSeats.includes(seatNumber);
    
            rowSeats.push(
              <TouchableOpacity
                key={seatNumber}
                onPress={() => handleSeatSelection(seatNumber)}
                style={[styles.seat, isSelected && styles.selectedSeat]}
              >
                <Text style={styles.seatText}>{getSeatLabel(row, col)}</Text>
              </TouchableOpacity>
            );
          }
    
          seats.push(
            <View key={row} style={styles.row}>
              {rowSeats}
            </View>
          );
        }
    
        return seats;
      };

    return (
        <SafeAreaView style={styles.areacontainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Choose Your Seats</Text>
                <Text style={styles.label}>Number of Passengers: 1 Adult</Text>
                <View style={styles.legendContainer}>
                    <View style={[styles.legendItem, styles.availableLegend]} />
                    <Text style={styles.legendText}>Available</Text>
                    <View style={[styles.legendItem, styles.selectedLegend]} />
                    <Text style={styles.legendText}>Selected</Text>
                </View>
                <View style={styles.seatContainer}>{renderSeats()}</View>
                <Button title='Confirm' onPress={handleReservation} />
            </View>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    areacontainer: {
        flex: 1,
        backgroundColor: '#f6fafd',
    },
    container: {
      flex: 1,
      padding: 5,
      paddingTop: 40,
      alignItems: 'center',
      // justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
    },
    label: {
      fontSize: 24,
      marginBottom: 15,
      
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    legendItem: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    availableLegend: {
        backgroundColor: 'lightgray',
    },
    selectedLegend: {
        backgroundColor: 'green',
    },
    legendText: {
        fontSize: 16,
        marginRight: 20,
    },
    seatContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    seat: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: 'lightgray',
    },
    selectedSeat: {
        backgroundColor: 'green',
    },
    seatText: {
        fontSize: 16,
    },
});

export default SeatReservation;