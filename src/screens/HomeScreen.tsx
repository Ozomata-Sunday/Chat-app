import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}: any) => {
  const user = auth().currentUser;

  const Logout = async () => {
    try {
      await auth().signOut();
      console.log('User logged out');
      navigation.push('Login');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="LogOut" onPress={Logout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
