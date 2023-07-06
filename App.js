import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

import 'expo-dev-client';

import { NavigationContainer } from "@react-navigation/native";

import Header from "./src/Header";
import SignIn from "./src/screens/SignIn";
import Chat from "./src/screens/Chat";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      const userData = await AsyncStorage.getItem("@user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0e806a" barStyle="light-content" />
      <View style={styles.container}>
        <Header />
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {user ? <Chat user={user} /> : <SignIn />}
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
