import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <TouchableOpacity style={styles.pressable}>
        <Text style={styles.pressableText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{textAlign: 'center', fontSize: 20}}
        onPress={() => navigation.navigate('SignUp')}>
        Login
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
