import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

import sweeper from '../assets/sweeper.png';

const GuestPickupScreen = ({route, navigation}) => {
  const [category, setCategory] = useState(`${route.params.itemSelected}`);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [landMark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('827013');
  const [name, setName] = useState('');

  //setCategory(tempCategory);

  //const [loginStatus,setLogin] = useState('');

  // const getUser = async ()=>{
  //     var tempLoginStatus = await AsyncStorage.getItem("loginStatus");
  //     setLogin(tempLoginStatus);
  // }

  // getUser();

  const [address, setAddress] = useState(``);

  const [isLoading, setLoading] = useState(false);

  // const setUser = async ()=>{
  //   await AsyncStorage.setItem("loginStatus","false");
  //   await AsyncStorage.setItem("User","Guest");

  // }

  const handlePickeup = () => {
    setLoading(true);

    var data = JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
      address: `${address}`,
      landMark: `${landMark}`,
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
        //console.log(JSON.stringify(response.data));
        setLoading(false);
        Alert.alert('Pickup Scheduled Successfully');
        navigation.navigate('Category Screen');
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Sorry, Something Went Wrong');
      });
  };

  return (
    <>
      <ScrollView>
        <Image
          style={{
            height: 180,
            width: 180,
            margin: 20,
            marginTop: 50,
            alignSelf: 'center',
          }}
          source={sweeper}
        />
        <Text
          style={{
            fontSize: 25,
            alignSelf: 'center',
            marginTop: 30,
            color: '#000000',
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          Hello! {name}
        </Text>

        <View style={styles.pickerStyle}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#758283',
              marginTop: 10,
            }}>
            Category Chosen
          </Text>
          <Picker
            style={{
              color: '#1FAA59',
            }}
            dropdownIconColor="#1FAA59"
            dropdownIconRippleColor="#1FAA59"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={category}
            onValueChange={itemValue => {
              setCategory(itemValue);
            }}>
            <Picker.Item label="Glass" value="Glass" />
            <Picker.Item label="Metal-Others" value="Metal-Others" />
            <Picker.Item label="Plastic" value="Plastic" />
            <Picker.Item label="Paper" value="Paper" />
            <Picker.Item label="Electronics" value="Electronics" />
            <Picker.Item label="Copper Items" value="Copper Items" />
            <Picker.Item label="Iron Items" value="Iron Items" />
          </Picker>
        </View>

        <TextInput
          defaultValue={`${name}`}
          onChangeText={tempName => {
            setName(tempName);
          }}
          style={styles.textinput}
          placeholder="Enter Name"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          defaultValue={`${email}`}
          onChangeText={tempEmail => {
            setEmail(tempEmail);
          }}
          style={styles.textinput}
          placeholder="Enter Email"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          defaultValue={`${phone}`}
          onChangeText={tempPhone => {
            setPhone(tempPhone);
          }}
          style={styles.textinput}
          placeholder="Enter Phone Number"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          defaultValue={`${address}`}
          onChangeText={tempAddress => {
            setAddress(tempAddress);
          }}
          style={styles.textinput}
          placeholder="Enter Pickup Address"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          defaultValue={`${landMark}`}
          onChangeText={tempLandmark => {
            setLandmark(tempLandmark);
          }}
          style={styles.textinput}
          placeholder="Enter Landmark"
          placeholderTextColor="#758283"></TextInput>

        <View style={styles.pickerStyle}>
          <Text
            style={{
              color: '#758283',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Choose Pincode
          </Text>
          <Picker
            style={{
              color: '#1FAA59',
            }}
            dropdownIconColor="#1FAA59"
            dropdownIconRippleColor="#1FAA59"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={pincode}
            onValueChange={itemValue => {
              setPincode(itemValue);
            }}>
            <Picker.Item label="827013" value="827013" />
            <Picker.Item label="827004" value="827004" />
          </Picker>
        </View>

        {isLoading == false ? (
          <View style={styles.pickupBtn}>
            <TouchableOpacity
              onPress={() => {
                // if (address.length != 0) {
                //   handlePickeup();
                //   //printAll();
                // } else {
                //   Alert.alert('Enter Valid Address');
                // }
                Alert.alert('Button Pressed');
              }}>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: 5,
                  paddingBottom: 5,
                }}>
                Send Pickup Request
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator
            size={'large'}
            style={{
              marginTop: 30,
            }}
          />
        )}
      </ScrollView>
    </>
  );
};

export default GuestPickupScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: 20,
    borderColor: '#1FAA59',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#000000',
  },

  pickupBtn: {
    marginTop: 25,
    backgroundColor: 'red',
    marginLeft: 90,
    marginRight: 90,
    marginBottom: 30,
  },

  pickerStyle: {
    marginLeft: 70,
    marginTop: 15,
    marginRight: 70,
  },
});
