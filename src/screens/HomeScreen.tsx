import React, {useState} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';
const HomeScreen = ({navigation}: any) => {
  const [selectTab, setSelectedTab] = useState(0);
  const user = auth().currentUser;

  const Logout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('EMAIL');
      console.log('User logged out');
      navigation.push('Login');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.profile}>
          <Text
            style={{
              fontStyle: 'italic',
              fontSize: 30,
              fontWeight: 'bold',
              color: 'pink',
            }}>
            Chat App
          </Text>
          <Pressable onPress={Logout}>
            <Image
              source={require('../assets/logout.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
        </View>
      </View>
      <Users />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    backgroundColor: 'grey',
    height: '15%',
    width: '100%',
    borderBottomEndRadius: 50,
    padding: 10,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    elevation: 10,
    marginVertical: 20,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarIcon: {
    width: 30,
    height: 30,
  },
});
export default HomeScreen;
