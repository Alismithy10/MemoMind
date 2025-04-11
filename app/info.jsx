import { Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';

export default function Index() {

  useFonts({'Jomhuria-Regular': require('../assets/fonts/Jomhuria-Regular.ttf')}) //Imported required font

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is MemoMind?</Text>
      <Text style={styles.text}>This is the MemoMind Application, use this page to find information on how it works and the functions that are available</Text>
      <Text style={styles.title}>How to use?</Text>
      <Text style={styles.text}>This application is supposed to be used to help you remember anything in your daily life, from habits to tasks and even events, you can use it for anything!</Text>
      <Text style={styles.title}>Statistics?</Text>
      <Text style={styles.text}>Streaks and other statistics are used as an incentive to keep up with those tasks, it shows as a number in the top right of your screen with a number, this number represents how many days in a row you confirmed that you have kept up with your tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#8699f0',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  
    title: {
      fontFamily: 'Jomhuria-Regular',
      fontSize: 40,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
    },

    text: {
      fontFamily: 'Jomhuria-Regular',
      fontSize: 35,
      textAlign: 'center',
      color: '#fff',
      marginRight: 5,
      marginLeft: 5,
    }
});