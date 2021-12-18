import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';

import sweeper from '../assets/sweeper.png';

const PickupScreen = ({route, navigation}) => {
  var categorySaved = 'Glass';
  if (route.params.itemSelected) {
    categorySaved = route.params.itemSelected;
  }
  var email = 'notprovided@example.com';
  if (route.params.email) {
    email = route.params.email;
  }
  var phone = '';
  if (route.params.phone) {
    phone = route.params.phone;
  }
  var landMark = '';
  if (route.params.landMark) {
    landMark = route.params.landMark;
  }
  var pincode = '827013';
  var name = 'Guest';
  if (route.params.name) {
    name = route.params.name;
  }

  var addressSaved = '';
  if (route.params.addressSaved) {
    addressSaved = route.params.addressSaved;
  }


  const [category, setCategory] = useState(`${categorySaved}`);
  const [address, setAddress] = useState(`${addressSaved}`);

  const [isLoading, setLoading] = useState(false);

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
        console.log(JSON.stringify(response.data));
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
      <View>
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
            fontStyle : "italic"
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
          defaultValue={`${addressSaved}`}
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
                  //printAll();
                } else {
                  Alert.alert('Enter Valid Address');
                }
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
      </View>
    </>
  );
};

export default PickupScreen;

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
  },

  pickerStyle: {
    marginLeft: 70,
    marginTop: 15,
    marginRight: 70,
  },
});
