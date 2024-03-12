import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [spin, setSpin] = useState(false);

  const SignUp = async () => {
    if (!email || !password || !name) {
      ToastAndroid.show('Enter Name, Email, & password', ToastAndroid.LONG);
      console.log('Enter Name, Email, & password');
      Keyboard.dismiss();
    }
    if (password !== confirmPassword) {
      ToastAndroid.show('Confirm Password', ToastAndroid.LONG);
      console.log('Confirm Password');
      Keyboard.dismiss();
    } else {
      try {
        Keyboard.dismiss();
        setSpin(true);
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await userCredential.user?.updateProfile({
          displayName: name,
        });
        addUser();
        console.log('User account created successfully');
        navigation.navigate('Login');
      } catch (error: any) {
        Alert.alert('Error', error.message);
        console.error('Error during user registration:', error);
      } finally {
        setSpin(false);
      }
    }
  };

  const addUser = () => {
    const uuId = uuid.v4();
    firestore().collection('users').doc(uuId).set({
      name: name,
      email: email,
      number: number,
      userId: uuId,
    });
  };

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 40,
          fontSize: 23,
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}>
        SignUp
      </Text>
      <TextInput
        placeholder="Enter name"
        placeholderTextColor={'grey'}
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Enter Email"
        placeholderTextColor={'grey'}
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Enter Phone Number"
        placeholderTextColor={'grey'}
        style={styles.input}
        value={number}
        onChangeText={text => setNumber(text)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'grey'}
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={'grey'}
        style={styles.input}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.pressable} onPress={SignUp}>
        {spin ? (
          <ActivityIndicator size={20} color={'black'} />
        ) : (
          <Text style={styles.pressableText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <Text
        style={{textAlign: 'center', fontSize: 20}}
        onPress={() => navigation.navigate('Login')}>
        Login
      </Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    width: '90%',
    height: 45,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'pink',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    // backgroundColor: 'grey',
  },
  pressable: {
    width: '90%',
    height: 45,
    borderRadius: 10,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  pressableText: {
    textAlign: 'center',
    color: 'black',
  },
});
