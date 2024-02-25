import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Users = () => {
  const [user, setUser] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const tempData = [];
    const email = await AsyncStorage.getItem('Email');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.doc != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUser(tempData);
      });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={user}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                navigation.navigate('Chat', {data: item});
              }}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.icon}
              />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userItem: {
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderColor: 'pink',
    borderRadius: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
  name: {
    color: 'black',
    marginLeft: 20,
    fontSize: 20,
  },
});
