import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
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
      <Button title="LogOut" onPress={Logout} />
      {selectTab == 0 ? <Users /> : <Setting />}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(0)}>
          <Image
            source={require('../assets/group.png')}
            style={[
              styles.tabBarIcon,
              {tintColor: selectTab == 0 ? 'white' : 'gray'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(1)}>
          <Image
            source={require('../assets/settings.png')}
            style={[
              styles.tabBarIcon,
              {tintColor: selectTab == 1 ? 'white' : 'gray'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'pink',
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
