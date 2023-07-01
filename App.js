import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import React, { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native';

import Header from './src/Header';
import Navigation from './src/Navigation';
import SignIn from './src/screens/SignIn';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

export default function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0e806a" barStyle="light-content" />
      {currUser ? (
        <View style={styles.container}>
          <Header />
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navigation />
          </View>
        </View>
      ) : (
      <SignIn currentUser={currUser} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});