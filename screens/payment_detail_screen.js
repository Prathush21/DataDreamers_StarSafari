import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable,TouchableOpacity,Image, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { database } from '../db/database';
import { useNavigation } from "@react-navigation/native";


const PaymentDetailScreen = ({route}) => {

  const { planet, trip, traveller_count, selected_seats,passengers } = route.params;
  const [paymentOption, setPaymentOption] = useState('payOnArrival');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [insertId,setInsertId]=useState(null)

  const [totalCost,setTotalCost]=useState(null)

  var totalAmount=0
  const navigation = useNavigation();
 

  useEffect(() => {
    database.getTripAmount(1).then(price => {
      if (price!=null){
        console.log('price:',price)
        setTotalCost(parseInt(price)*traveller_count)

      }
      
    })
  }, [])

  const handlePayment = () => {

    database.getBookingId(1,1,0,traveller_count,'Upcoming',totalAmount,selected_seats).then(id=>{
      setInsertId(id)
      console.log(id)

      const promises=passengers.map(tuple =>{
        var [name,passportNumber] = tuple;
        return database.insertPassenger(passportNumber,id,name)
      })

      return Promise.all(promises).then(()=>{
        console.log('All data inserted')
        navigation.navigate("BookingConfirmation", {
          planet: planet,
          trip: trip,
          traveller_count: traveller_count,
          total_amount: totalAmount
        })

      })
    })

  };

  const paymentMethods = [
    { label: 'Pay Later', value: 'paylater' },
    { label: 'Visa', value: 'visa' },
    { label: 'MasterCard', value: 'mastercard' },
    { label: 'PayPal', value: 'paypal' },
    
  ];

  const totalTax = Math.floor((totalCost*10)/100);
  totalAmount = totalCost + totalTax;


  return (
    <SafeAreaProvider style={{ backgroundColor: "#F6FAFD" }}>
      <View
        style={{
          margin: 20,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 7,
          paddingBottom: 20,
        }}
      >
        <Text style={styles.header}>Payment Details</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5, marginLeft: 20 }}>Choose your payment option</Text>

        <View style={styles.paymentMethodContainer}>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.value}
              style={[
                styles.paymentMethodCard,
                method.value === paymentOption && styles.selectedPaymentMethodCard,
              ]}
              onPress={() => setPaymentOption(method.value)}
            >
              {method.value=='paylater' ? (
                <Text style={styles.paymentMethodText}>Pay Later</Text>
              ): (
                <>
                <Image
                source={
                  method.value === 'visa'
                    ? require('../assets/visa_logo.jpeg')
                    : method.value === 'mastercard'
                      ? require('../assets/mastercard_logo.jpeg')
                      : method.value === 'paypal'
                        ? require('../assets/paypal_logo.png')
                        : require('../assets/visa_logo.jpeg')
                }
                style={styles.paymentMethodLogo}
              />
              {/* <Text style={styles.paymentMethodText}>{method.label}</Text> */}
                </>
              )}
              
            </TouchableOpacity>
          ))}
        </View>

        {paymentOption !== 'paylater' && (
          <View style={styles.cardDetailsForm}>
            <View style={styles.formField}>
              <Text style={styles.label}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter cardholder name"
                value={cardName}
                onChangeText={setCardName}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter card number"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter CVV"
                value={cvv}
                onChangeText={setCVV}
                secureTextEntry
              />
            </View>
          </View>
        )}

        <View style={styles.costBreakdown}>
          <Text>Total Cost: ${totalCost}</Text>
          <Text>Total Tax: ${totalTax}</Text>
          <View style={styles.line}></View>
          <Text>Total Amount: ${totalAmount}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Pressable style={styles.cancelbutton}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable style={styles.confirmbutton} onPress={handlePayment}>
          <Text>Confirm</Text>
        </Pressable>
      </View>

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center'

  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10
  },
  paymentMethodCard: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedPaymentMethodCard: {
    borderColor: 'blue',
  },
  paymentMethodLogo: {
    width: 50,
    height: 30,
    marginBottom: 5,
  },
  paymentMethodText: {
    margin: 5,
    fontWeight: 'bold',
  },
  cardDetailsForm: {
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: 20
  },
  formField: {
    marginBottom: 6,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    // marginLeft:20

  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  costBreakdown: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    marginLeft: 20
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 5,
  },
  confirmbutton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#09E488",
    width: 125,
    alignSelf: "center",
    marginLeft: 20,
  },

  cancelbutton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#8E929B",
    width: 125,
    alignSelf: "center",
  },

});

export default PaymentDetailScreen;