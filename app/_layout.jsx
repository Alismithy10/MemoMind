import { Stack } from 'expo-router';
import { ItemProvider } from './context/ItemContext';
import GradientHeaderTitle from './components/GradientHeaderTitle';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function Layout() { //layout adds standards for each page

  useFonts({'Jomhuria-Regular': require('../assets/fonts/Jomhuria-Regular.ttf')})

  return (
    <ItemProvider> 
      <Stack 
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#6bd1ff', '#6f5ae0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          ),
        }}
      > 
        <Stack.Screen //sets header title for each page
          name="index"
          options={{ headerTitle: () => <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'Jomhuria-Regular' }}>Main Page</Text> }}
        />
        <Stack.Screen
          name="list"
          options={{ headerTitle: () => <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'Jomhuria-Regular' }}>Task List</Text> }}
        />
        <Stack.Screen
          name="add"
          options={{ headerTitle: () => <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'Jomhuria-Regular' }}>Add Task</Text> }}
        />
        <Stack.Screen
          name="edit"
          options={{ headerTitle: () => <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'Jomhuria-Regular' }}>Edit Task</Text> }}
        />
        <Stack.Screen
          name="statistics"
          options={{ headerTitle: () => <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'Jomhuria-Regular' }}>Statistics</Text> }}
        />
        <Stack.Screen
          name="info"
          options={{ headerTitle: () => <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'Jomhuria-Regular' }}>Information</Text> }}
        />
      </Stack>
    </ItemProvider>
  );
}
