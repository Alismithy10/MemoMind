// app/index.jsx
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useFonts } from 'expo-font';

export default function HomeScreen() {
  const router = useRouter();
  const [active, setActive] = useState(null);

  const buttons = [
    { title: 'View Tasks', route: '/list' },
    { title: 'Information', route: '/info' },
    { title: 'Statistics', route: '/statistics' },
  ];

  return (
    <View style={styles.container}>
      {/* Gradient Title */}
      <LinearGradient
        colors={['#6bd1ff', '#6f5ae0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.titleGradient}
      >
        <Text style={styles.title}>MemoMind</Text>
      </LinearGradient>

      {/* MemoMind Logo */}
      <Image
        source={require('../assets/images/Remind (1).png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Buttons */}
      {buttons.map((btn, idx) => (
        <Pressable
          key={btn.title}
          onPress={() => {
            setActive(idx);
            router.push(btn.route);
          }}
          style={[
            styles.buttonWrapper,
            active === idx && styles.activeBorder,
          ]}
        >
          <LinearGradient
            colors={['#6f5ae0', '#6a4b9b']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
          </LinearGradient>
        </Pressable>
      ))}
    </View>
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
  titleGradient: {
    marginBottom: 24,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 36,
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  activeBorder: {
    borderWidth: 1,
    borderColor: '#d0aaff',
    shadowColor: '#cfaaff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: 240,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#f2ebff',
    fontWeight: '600',
  },
});
