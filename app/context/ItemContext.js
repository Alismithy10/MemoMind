import React, { createContext, useEffect, useState } from 'react'; //Import 
import { useRouter } from 'expo-router';
import { db } from '../firebaseConfig'; //Importing database from firebaseConfig
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';  //Import database modifying functions

export const ItemContext = createContext();  //Create item context

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const addItem = async (item) => {
    try {
      await addDoc(collection(db, 'items'), {
        name: item.name,
        dueDate: item.dueDate,
        createdAt: new Date(),
      });  //Adds item entered in the add.jsx page to the firestore database
      router.back(); // Go back to the list after adding
    } catch (error) {
      console.error('Error adding item:', error); //catch incase of error
    }
  };

  return (
    <ItemContext.Provider value={{ items, addItem }}>
      {children}
    </ItemContext.Provider>
  );
};
