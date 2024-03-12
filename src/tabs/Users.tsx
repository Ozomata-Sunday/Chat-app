import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

let id: '';

const Users = () => {
  const [user, setUser] = useState([]);
  const active = auth().currentUser?.uid;
  // console.log(active);

  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const tempData = [];
    // console.log(tempData);
    const email = await AsyncStorage.getItem('EMAIL');
    // console.log(email)

    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != null) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUser(tempData);
        // console.log(user.userId)
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
              onPress={() =>
                navigation.navigate('Chat', {data: item, id: active})
              }>
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

export default Users;
