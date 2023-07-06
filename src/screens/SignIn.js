import { StyleSheet, View, Text, Image, Button } from "react-native";
import * as React from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [userInfo, setUserInfo] = React.useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "283875335460-7k7upo9v4ihc6smvdp5fp9ubr8lk9kt4.apps.googleusercontent.com",
    webClientId:
      "283875335460-nqf5a7bhb2mn2jm5aur70i5kelbi4ntg.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");

    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  };

  return (
    <View style={styles.loginContainer}>
      <Image
        source={require("../../assets/welcome-img.png")}
        style={styles.welcomeImage}
      />

      <Text style={styles.welcomeText}>Welcome To WhatsApp</Text>
      <Text style={styles.welcomeText}>{JSON.stringify(userInfo, null, 2)}</Text>

      <View style={{ marginTop: 20 }}>
        <Button
          color="#25D366"
          title="Sign In With Google"
          onPress={() => promptAsync()}
        />
        <Button color="#25D366" title="Logout" onPress={() => handleLogout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  welcomeText: {
    color: "#075e54",
    fontSize: 24,
    marginTop: 20,
  },

  welcomeImage: {
    width: 280,
    height: 280,
    resizeMode: "cover",
  },

  textInput: {
    borderBottomColor: "#075e54",
    borderBottomWidth: 2,
    marginBottom: 30,
    width: 200,
  },

  errorContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  errorMessage: {
    color: "red",
    fontSize: 16,
  },
});

export default SignIn;