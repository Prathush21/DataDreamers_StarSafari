import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable,TouchableOpacity,Image, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider } from "react-native-safe-area-context";


const PersonalInfo = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const [dob, setDOB] = useState(new Date());

  const [passengers, setPassengers] = useState(Array(2).fill({ name: '', passportNumber: '' }));

  const handleDOBChange = (_, selectedDOB) => {
    const currentDOB = selectedDOB || dob;
    setShowPicker(false);
    setDOB(currentDOB);
  };

  const updatePassenger = (index, fieldName, value) => {
    const updatedPassengers = passengers.map((passenger, i) => {
      if (i === index) {
        return { ...passenger, [fieldName]: value };
      }
      return passenger;
    });
    setPassengers(updatedPassengers);
  };

  const handlePersonalInfo = () => {
    console.log('INFO: Submitted personal info');
    console.log(fullName);
  };


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
        <Text style={styles.header}>Personal Info</Text>

        <View style={styles.personalInfoForm}>
          <View style={styles.formField}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              value={contactNumber}
              onChangeText={setContactNumber}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>DOB</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select DOB"
                value={dob.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDOBChange}
              />
            )}
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Passengers</Text>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={styles.halfLabel}>Name</Text>
                <Text style={styles.halfLabel}>Passport No.</Text>
              </View>
              {passengers.map((passenger, index) => (
                <View key={index} style={{ flexDirection: "row", alignSelf: "center" }}>
                  <TextInput
                    style={styles.halfInput}
                    value={passenger.name}
                    onChangeText={(text) => updatePassenger(index, 'name', text)}
                  />
                  <TextInput
                    style={styles.halfInput}
                    value={passenger.passportNumber}
                    onChangeText={(text) => updatePassenger(index, 'passportNumber', text)}
                  />
                </View>
              ))}
          </View>
        </View>

      </View>

      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Pressable style={styles.confirmbutton} onPress={handlePersonalInfo}>
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
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center'

  },
  personalInfoForm: {
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
  },
  halfLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '50%',
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
  halfInput: {
    width: '48%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 5,
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  confirmbutton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#09E488",
    width: 250,
    alignSelf: "center",
    marginLeft: 20,
  },

});

export default PersonalInfo;