import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Button, Pressable } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { database } from '../db/database';
import { useNavigation } from "@react-navigation/native";

const SeatReservation = ({route}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats,setReservedSeats] = useState([])
  const [rowcount,setRowCount]=useState(null)
  const [columncount,setColumnCount]=useState(null)

  const vehicle_id=route.params.trip.vehicle_id
  const planet_name=route.params.planet_name
  const trip =route.params.trip
  const traveller_count= route.params.passengers_count

  const navigation = useNavigation();

  useEffect(() => {
    database.getReservedSeats(1).then(bookedSeats => {
      console.log('booked seats:',bookedSeats)
      setReservedSeats(bookedSeats)
    })

    database.getRowColumnCount(vehicle_id).then(info => {
      setRowCount(info.rowcount)
      setColumnCount(info.columncount)
      console.log(info)

      })

    
      
    
  }, [])


  // const reservedSeats = ['2A','4B']

  const seatLabels = Array.from({length:26},(_,index)=>String.fromCharCode(65+index))

  const handleSeatSelection = (seatNumber) => {
    if (reservedSeats.includes(seatNumber)){
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      if (selectedSeats.length < parseInt(traveller_count))
        setSelectedSeats([...selectedSeats, seatNumber]);
        console.log(selectedSeats)
    }
    
  };

  const handleReservation = () => {
    console.log(selectedSeats)
    const selectedSeatsFinal=selectedSeats.join(',')
    navigation.navigate("PersonalInfo", {
      planet_name: planet_name,
      trip: trip,
      traveller_count: traveller_count,
      selected_seats: selectedSeatsFinal
    })


  }

  const getSeatLabel = (row, col) => {
    const rowLabel = row.toString();
    const colLabel = seatLabels[col];
    return `${rowLabel}${colLabel}`;
  };

  const renderSeats = () => {
    const rows = rowcount;
    var leftColumns = 2;
    var rightColumns = 2;
    if (columncount%2==0){
      leftColumns=Math.floor(columncount/2)
      rightColumns=Math.floor(columncount/2)
    }
    else{
      leftColumns=Math.floor(columncount/2)
      rightColumns=columncount - leftColumns
    }
    
    const gapWidth = 20;
    const seats = [];

    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];

      for (let col = 0; col < leftColumns; col++) {
        const seatNumber = getSeatLabel(row,col);
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
        const seatNumber = getSeatLabel(row,col)
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

  const travel_string= 'Number of Passengers: ' + traveller_count.toString()

  return (
    <SafeAreaProvider style={{ backgroundColor: "#F6FAFD" }}>

      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Seats</Text>
        <Text style={styles.label}>{travel_string}</Text>
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

          <Pressable style={styles.confirmbutton} onPress={handleReservation}>
            <Text>Next</Text>
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