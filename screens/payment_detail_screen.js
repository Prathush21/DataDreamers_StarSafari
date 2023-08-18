import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';


const PaymentDetailScreen = () => {
  const [paymentOption, setPaymentOption] = useState('payOnArrival');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const totalCost = 500; 
  const totalTax = 50; 
  const totalAmount = totalCost + totalTax;

  const handlePayment = () => {
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>
      <Text style={styles.label}>Choose your payment option</Text>
      <View style={styles.paymentOptions}>
        <Picker
          selectedValue={paymentOption}
          onValueChange={(itemValue) => setPaymentOption(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pay on Arrival" value="payOnArrival" />
          <Picker.Item label="Visa" value="visa" />
          <Picker.Item label="MasterCard" value="mastercard" />
          <Picker.Item label="PayPal" value="paypal" />
        </Picker>
      </View>

      {paymentOption !== 'payOnArrival' && (
        <View style={styles.cardDetailsForm}>
             <View style={styles.formField}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cardholder name"
              value={cardNumber}
              onChangeText={setCardNumber}
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

      <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => console.log('Cancel pressed')} />
            <View style={{width:20}}/>
            <Button title="Pay Now" onPress={handlePayment} />
          </View>
    </View>
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
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center'
  },
  picker: {
    flex: 1,
  },
  cardDetailsForm: {
    marginBottom: 20,
    textAlign:'left',
  },
  formField: {
    marginBottom: 10,
    textAlign:'left',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign:'left',
  },
  costBreakdown: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
   
  },
});

export default PaymentDetailScreen;