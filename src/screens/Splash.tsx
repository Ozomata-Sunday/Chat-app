import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Splash = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      console.log(user);
      Next(user?.email);
    });

    return () => subscriber();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      CheckLogin();
    }, 2000);
  }, []);

  const Next = async (email) => {
    await AsyncStorage.setItem('EMAIL', email);
  };

  const CheckLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    console.log(email);
    if (email !== null) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SignUp');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Chat App</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
