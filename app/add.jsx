import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ItemContext } from './context/ItemContext';
import { useFonts } from 'expo-font';

//Import required files

export default function AddScreen() {

  useFonts({'Jomhuria-Regular': require('../assets/fonts/Jomhuria-Regular.ttf')})

  const { addItem } = useContext(ItemContext);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true); //shows date picker modal when called
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false); //hides date picker modal when called
  };

  const handleConfirm = (date) => {
    setDueDate(date);
    hideDatePicker(); //when cofirmed it sets the due date and hides the date picker
  };

  const handleAdd = () => {
    if (!name.trim()) return;

    addItem({
      name,
      dueDate: dueDate.toISOString(),
      createdAt: new Date().toISOString(),
    });

    setName(''); //handles added items and adds them to the database
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task name"
        style={styles.input}
        value={name}
        onChangeText={setName} //displays a text input
      />

      <View style={styles.dateRow}>
        <Text style={styles.label}>Due: {dueDate.toLocaleString()}</Text> 
        <Button title="Pick Date & Time" onPress={showDatePicker} //displays the datetime button
        /> 
      </View> 

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker} //DateTimePickerModal which displays when button is pressed
      />

      <Button
        title="Add"
        onPress={handleAdd}
        disabled={!name.trim()} //Button for handling the add function
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#8699f0',
    flex: 1,
    gap: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Jomhuria-Regular'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Jomhuria-Regular'
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    color: 'white',
    fontFamily: 'Jomhuria-Regular'
  },
});
