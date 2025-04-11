import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function ListScreen() {
  
  useFonts({'Jomhuria-Regular': require('../assets/fonts/Jomhuria-Regular.ttf')}) //Imported required font

  const [items, setItems] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchItems = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'items'));
          const fetchedItems = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(fetchedItems);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      fetchItems();
    }, [])
  );

  const handleComplete = async (item) => {
    try {
      // Add task to completedTasks collection
      await addDoc(collection(db, 'completedTasks'), {
        name: item.name,
        completedAt: serverTimestamp(),
      });

      // Delete task from items collection
      await deleteDoc(doc(db, 'items', item.id));

      // Update local state
      setItems((prevItems) => prevItems.filter(i => i.id !== item.id));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const getTimeDifference = (dueDateInput) => {
    const now = new Date();
    const dueDate = new Date(
      dueDateInput?.seconds ? dueDateInput.seconds * 1000 : dueDateInput
    );
    const diffMs = dueDate - now;
    const isPast = diffMs < 0;
    const absDiff = Math.abs(diffMs);
    const minutes = Math.floor(absDiff / (1000 * 60)) % 60;
    const hours = Math.floor(absDiff / (1000 * 60 * 60));

    return isPast
      ? `⚠️ Overdue by ${hours}h ${minutes}m`
      : `🕒 Due in ${hours}h ${minutes}m`;
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const due = new Date(
              item.dueDate?.seconds ? item.dueDate.seconds * 1000 : item.dueDate
            );
            return (
              <View style={styles.item}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => router.push(`/edit?id=${item.id}`)}
                >
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.date}>Due: {due.toLocaleString()}</Text>
                  <Text style={styles.countdown}>{getTimeDifference(item.dueDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleComplete(item)}
                >
                  <Text style={styles.completeText}>✓</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add')}
      >
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#8699f0', },
  item: {
    backgroundColor: '#a3b1f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { fontSize: 25, fontWeight: 'bold', color: 'white', fontFamily: 'Jomhuria-Regular' },
  date: { fontSize: 20, color: '#666', marginBottom: 4, color: 'white', fontFamily: 'Jomhuria-Regular' },
  countdown: { fontSize: 14, color: 'white' },
  completeButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  completeText: {
    color: '#white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Jomhuria-Regular',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    margin: 10,
  },
  addText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Jomhuria-Regular',
  },
});