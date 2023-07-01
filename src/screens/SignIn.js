import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import { signIn, signUp } from '../../firebase';

const SignIn = ({ currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signUp');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit() {
    if (mode === 'signUp') {
      try {
        await signUp(email, password);
        console.log('User signed up successfully!');
      } catch (error) {
        console.log('Error signing up:', error.message);
      }
    }

    if (mode === 'signIn') {
      try {
        await signIn(email, password);
        console.log('User signed in successfully!');
      } catch (error) {
        console.log('Error signing in:', error.message);
      }
    }
  }

  if (currentUser) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>You are already signed in!</Text>
      </View>
    );
  }

  return (
    <View style={styles.loginContainer}>
      <Image
        source={require('../../assets/welcome-img.png')}
        style={styles.welcomeImage}
      />

      <Text style={styles.welcomeText}>Welcome To WhatsApp</Text>

      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.textInput}
        />
      </View>

      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      ) : null}

      <View style={{ marginTop: 20 }}>
        <Button
          title={mode === 'signUp' ? 'Sign Up' : 'Login'}
          disabled={!password || !email}
          color="#25D366"
          onPress={handleSubmit}
        />
      </View>
      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => (mode === 'signUp' ? setMode('signIn') : setMode('signUp'))}
      >
        <Text style="#757575">
          {mode === 'signUp'
            ? "Already have an Account? Sign In"
            : "Don't have an Account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  welcomeText: {
    color: '#075e54',
    fontSize: 24,
    marginTop: 20,
  },

  welcomeImage: {
    width: 280,
    height: 280,
    resizeMode: 'cover',
  },

  textInput: {
    borderBottomColor: '#075e54',
    borderBottomWidth: 2,
    marginBottom: 30,
    width: 200,
  },

  errorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  errorMessage: {
    color: 'red',
    fontSize: 16,
  },
});

export default SignIn;  