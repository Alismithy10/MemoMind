import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { BarChart } from 'react-native-chart-kit';
import { useFonts } from 'expo-font';

export default function Statistics() {

    useFonts({'Jomhuria-Regular': require('../assets/fonts/Jomhuria-Regular.ttf')})

  const [stats, setStats] = useState({
    total: 0,
    streak: 0,
    mostCommonDay: '',
    weeklyCounts: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'completedTasks'));
        const tasks = snapshot.docs.map(doc => doc.data());

        const taskDates = tasks
          .map(t => t.completedAt?.seconds ? new Date(t.completedAt.seconds * 1000) : null)
          .filter(Boolean);

        const today = new Date();
        const normalizedDates = taskDates.map(d => new Date(d.getFullYear(), d.getMonth(), d.getDate()));

        // Count tasks per date
        const dateMap = {};
        normalizedDates.forEach(date => {
          const key = date.toDateString();
          dateMap[key] = (dateMap[key] || 0) + 1;
        });

        // Calculate streak
        let streak = 0;
        for (let i = 0; ; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const key = date.toDateString();
          if (dateMap[key]) {
            streak++;
          } else {
            break;
          }
        }

        // Most common day
        const dayMap = {};
        normalizedDates.forEach(date => {
          const day = date.toLocaleDateString('en-US', { weekday: 'long' });
          dayMap[day] = (dayMap[day] || 0) + 1;
        });

        const mostCommonDay = Object.entries(dayMap).reduce(
          (max, entry) => (entry[1] > max[1] ? entry : max),
          ['', 0]
        )[0];

        // Weekly graph data (last 7 days)
        const labels = [];
        const counts = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const key = date.toDateString();
          labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
          counts.push(dateMap[key] || 0);
        }

        setStats({
          total: taskDates.length,
          streak,
          mostCommonDay,
          weeklyCounts: { labels, counts },
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📈 Task Statistics</Text>
      <Text style={styles.stat}>🔥 Streak: {stats.streak} day(s)</Text>
      <Text style={styles.stat}>✅ Total Completed: {stats.total}</Text>
      <Text style={styles.stat}>📆 Most Active Day: {stats.mostCommonDay || 'N/A'}</Text>
      <Text style={styles.stat}>📊Weekly Results: </Text>

      {stats.weeklyCounts.labels?.length > 0 && (
        <BarChart
          data={{
            labels: stats.weeklyCounts.labels,
            datasets: [{ data: stats.weeklyCounts.counts }],
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#f5f5f5',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: () => '#444',
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8699f0',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Jomhuria-Regular',
    color: 'white',
  },
  stat: {
    fontSize: 30,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Jomhuria-Regular',
    color: 'white',
  },
});