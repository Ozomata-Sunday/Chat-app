import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  View,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spin, setSpin] = useState(false);

  const HandleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show('Enter Email & password', ToastAndroid.LONG);
      console.log('Enter Email & password');
      Keyboard.dismiss();
    } else {
      try {
        setSpin(true);
        Keyboard.dismiss();
        await auth().signInWithEmailAndPassword(email, password);
        console.log('User logged in successfully');
        navigation.navigate('Home');
      } catch (error: any) {
        Alert.alert('Error', error.message);
        console.error('Error during login:', error);
      } finally {
        setSpin(false);
      }
    }
  };

  return (
    <View>
      <Text style={{textAlign: 'center', marginVertical: 40}}>Login</Text>

      <TextInput
        placeholder="Enter Email"
        placeholderTextColor={'grey'}
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'grey'}
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.pressable} onPress={HandleLogin}>
        {spin ? (
          <ActivityIndicator size={20} color={'black'} />
        ) : (
          <Text style={styles.pressableText}>Login</Text>
        )}
      </TouchableOpacity>
      <Text
        style={{textAlign: 'center', fontSize: 20}}
        onPress={() => navigation.navigate('SignUp')}>
        Sign Up
      </Text>
    </View>
  );
};

export default Login;

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
