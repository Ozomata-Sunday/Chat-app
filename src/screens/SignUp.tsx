import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const SignUp = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View>
      <Text style={{textAlign: 'center', marginVertical: 40}}>SignUp</Text>
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
      <TouchableOpacity style={styles.pressable}>
        <Text style={styles.pressableText}>Sign Up</Text>
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
