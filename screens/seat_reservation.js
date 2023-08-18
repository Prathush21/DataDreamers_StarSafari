import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Button, Pressable } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

const SeatReservation = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const reservedSeats = [5,10,15]

  const seatLabels = ['A', 'B', 'C', 'D'];

  const handleSeatSelection = (seatNumber) => {
    if (reservedSeats.includes(seatNumber)){
      return;
    }

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
        const isReserved = reservedSeats.includes(seatNumber)

        rowSeats.push(
          <TouchableOpacity
            key={seatNumber}
            onPress={() => handleSeatSelection(seatNumber)}
            style={[styles.seat, isSelected && styles.selectedSeat, isReserved && styles.reservedSeat]}
          >
            <Text style={styles.seatText}>{getSeatLabel(row, col)}</Text>
          </TouchableOpacity>
        );
      }

      rowSeats.push(<View style={{ width: gapWidth }} key={`gap-${row}`} />);

      for (let col = leftColumns; col < leftColumns + rightColumns; col++) {
        const seatNumber = (row - 1) * (leftColumns + rightColumns) + col;
        const isSelected = selectedSeats.includes(seatNumber);
        const isReserved = reservedSeats.includes(seatNumber)

        rowSeats.push(
          <TouchableOpacity
            key={seatNumber}
            onPress={() => handleSeatSelection(seatNumber)}
            style={[styles.seat, isSelected && styles.selectedSeat, isReserved && styles.reservedSeat]}
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
    <SafeAreaProvider style={{ backgroundColor: "#F6FAFD" }}>

      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Seats</Text>
        <Text style={styles.label}>Number of Passengers: 1 Adult</Text>
        <View style={styles.legendContainer}>
          <View style={[styles.legendItem, styles.availableLegend]} />
          <Text style={styles.legendText}>Available</Text>
          <View style={[styles.legendItem, styles.selectedLegend]} />
          <Text style={styles.legendText}>Selected</Text>
          <View style={[styles.legendItem, styles.reservedLegend]} />
          <Text style={styles.legendText}>Reserved</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 7,
            paddingBottom: 20,
            marginBottom:20
            
          }}
        >{renderSeats()}</View>
        <View >

          <Pressable style={styles.confirmbutton}>
            <Text>Confirm</Text>
          </Pressable>
        </View>
      </View>

    </SafeAreaProvider>

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
  reservedLegend: {
    backgroundColor: 'black',
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
    marginTop:20,
    marginRight:10
  },
  selectedSeat: {
    backgroundColor: 'green',
  },
  reservedSeat: {
    backgroundColor: 'black',
  },
  seatText: {
    fontSize: 16,
  },
  confirmbutton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#09E488",
    width: 155,
    alignSelf: "center",
    marginLeft: 20,
  },

});

export default SeatReservation;