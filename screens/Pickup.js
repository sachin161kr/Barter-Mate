import React, {Component, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';

import sweeper from '../assets/garbageCleaner.png';

const PickupScreen = ({route, navigation}) => {
  var name = route.params.name;

  var email = route.params.email;
  var phone = route.params.phone;
  var landmark = route.params.landmark;
  var pincode = route.params.pincode;

  var tempCategory = route.params.itemSelected;
  var tempSubCategory = route.params.subCategory;
  var tempAddress = route.params.address;

  console.log(`${tempSubCategory}`);

  const [address, setAddress] = useState(`${tempAddress}`);
  const [category, setCategory] = useState(`${tempCategory}`);
  const [subCategory, setSubCategory] = useState(`${tempSubCategory}`);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  const handlePickeup = () => {
    setLoading(true);

    var data = JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
      address: `${address}`,
      landMark: `${landmark}`,
      pinCode: `${pincode}`,
      category: `${category}`,
    });

    var config = {
      method: 'post',
      url: 'https://enigmatic-bayou-48428.herokuapp.com/admin/registration-api/addPickup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        Alert.alert('We will send our representatives soon. Thank You');
        navigation.navigate('Category Screen');
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Sorry, Something Went Wrong');
        setLoading(false);
      });
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            height: verticalScale(200),
            width: scale(250),
            alignSelf: 'center',
            marginTop: verticalScale(12),
          }}>
          <Image
            style={{
              height: 200,
              width: 250,
              alignSelf: 'center',
            }}
            source={sweeper}
          />
        </View>

        <Text
          style={{
            fontSize: moderateScale(25),
            alignSelf: 'center',
            color: '#000000',
            fontWeight: 'bold',
            fontStyle: 'italic',
            marginBottom: verticalScale(20),
          }}>
          Hello! {name}
        </Text>

        <View style={styles.pickerStyle}>
          <Picker
            style={{
              color: '#A363A9',
            }}
            dropdownIconColor="#A363A9"
            dropdownIconRippleColor="#A363A9"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={category}
            onValueChange={itemValue => {
              setCategory(itemValue);
              setSubCategory('Choose Sub-Category');
              console.log(`${category}`);
            }}>
            <Picker.Item label="Glass" value="Glass" />
            <Picker.Item label="Metal" value="Metal" />
            <Picker.Item label="Plastic" value="Plastic" />
            <Picker.Item label="Paper" value="Paper" />
            <Picker.Item label="Electronics" value="Electronics" />
          </Picker>
        </View>

        <TextInput
          defaultValue={`${address}`}
          onChangeText={tempAddress => {
            setAddress(tempAddress);
          }}
          style={styles.textinput}
          placeholder="Enter Pickup Address"
          placeholderTextColor="#758283"></TextInput>

        {isLoading == false ? (
          <View style={styles.pickupBtn}>
            <TouchableOpacity
              onPress={() => {
                if (address.length != 0) {
                  handlePickeup();
                } else {
                  Alert.alert('Enter Valid Address');
                }
              }}>
              <LinearGradient
                colors={['#A363A9', '#FAB06D']}
                style={{
                  borderRadius: moderateScale(100),
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    fontSize: moderateScale(20),
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: moderateScale(5),
                    paddingTop: verticalScale(10),
                    paddingBottom: verticalScale(15),
                  }}>
                  Send Pickup Request
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator
            color="#A363A9"
            size={'large'}
            style={{
              marginTop: verticalScale(30),
            }}
          />
        )}

        <View>
          <TouchableOpacity
            onPress={() => {
              setUser();
              navigation.navigate('Category Screen');
              Alert.alert('You are logged out!');
            }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                textAlign: 'center',
                marginTop: verticalScale(10),
                color: '#A363A9',
                paddingBottom: verticalScale(10),
                alignSelf: 'center',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    borderColor: '#A363A9',
    borderRadius: moderateScale(100),
    padding: moderateScale(15),
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginRight: scale(20),
    color: '#000000',
  },

  pickupBtn: {
    marginTop: verticalScale(20),

    marginLeft: scale(15),
    marginRight: scale(15),
    borderRadius: moderateScale(100),
    padding: moderateScale(6),
  },

  pickerStyle: {
    marginLeft: scale(20),
    marginTop: verticalScale(10),
    borderColor: '#A363A9',
    marginRight: scale(20),
    borderRadius: moderateScale(100),
    borderWidth: 1,
  },
});
