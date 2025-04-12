//Import required files and functions
import React, { useEffect, useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text, Platform, Alert} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { db } from './firebaseConfig';
import {doc, getDoc, updateDoc, Timestamp} from 'firebase/firestore';
import { useFonts } from 'expo-font';

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch item data
  useEffect(() => {
    const loadItem = async () => {
      try {
        const docRef = doc(db, 'items', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const item = docSnap.data();
          setName(item.name);
          const date = item.dueDate?.seconds
            ? new Date(item.dueDate.seconds * 1000)
            : new Date(item.dueDate);
          setDueDate(date);
        } else {
          Alert.alert('Error', 'Task not found.');
        }
      } catch (error) {
        console.error('Failed to load item:', error);
        Alert.alert('Error', 'Could not fetch task.');
      } finally {
        setLoading(false);
      }
    };

    if (id) loadItem();
  }, [id]);

  //handles new saved data for task and updates the database
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Task name cannot be empty.');
      return;
    }

    try {
      const docRef = doc(db, 'items', id);
      await updateDoc(docRef, {
        name,
        dueDate: Timestamp.fromDate(dueDate),
      });

      Alert.alert('Success', 'Task updated successfully!');
      router.back(); // go back to the list page
    } catch (error) {
      console.error('Failed to update item:', error);
      Alert.alert('Error', 'Could not update task.');
    }
  };

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading task...</Text>
      </View>
    ); //Shows message when task is being loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Task Name</Text>
      <TextInput
        placeholder="Enter task name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.dateRow}>
        <Text style={styles.label}>Due: {dueDate.toLocaleString()}</Text>
        <Button title="Pick Date & Time" onPress={showDatePicker} />
      </View>


      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Button title="Save Changes" onPress={handleSave} />
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
    fontSize: 20,
    color: 'white',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    color: 'white',
  },
});
