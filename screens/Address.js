import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const AddressScreen = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('Noida');
  const [state, setState] = useState('Uttar Pradesh');
  var userId = route.params.userId;
  var email = route.params.email;
  var phone = route.params.phone;
  var landmark = route.params.landmark;
  const [pincode, setPincode] = useState('Choose Pincode');

  const [myAddresses, setMyaddresses] = useState([]);

  const handleShowAddress = () => {
    var data = JSON.stringify({
      userId: `${userId}`,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/listAddAddress',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response.data.data));
        var temp = JSON.stringify(response.data.data);
        setMyaddresses(JSON.parse(temp));
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Something Went Wrong');
      });
  };

  useEffect(handleShowAddress, []);
  //handleShowAddress();

  const handleAddress = () => {
    var data = JSON.stringify({
      userId: `${userId}`,
      email: `${email}`,
      phone: `${phone}`,
      address1: `${address1}`,
      address2: `${address2}`,
      landMark: `${landmark}`,
      pinCode: `${pincode}`,
      city: `${city}`,
      state: `${state}`,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/addAddress',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //setLoading(false);
        console.log(JSON.stringify(response.data));
        handleShowAddress();
        //history = JSON.parse(temp);
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert('Something went wrong!');
        console.log(error);
      });
  };

  return (
    <>
      {loading == true ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
          }}>
          <ActivityIndicator size={'large'} color="#A363A9" />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              marginBottom: verticalScale(200),
            }}>
            <View>
              <TextInput
                defaultValue=""
                onChangeText={text => {
                  setAddress1(text);
                }}
                style={styles.textinput}
                placeholder="Enter Address Line 1"
                placeholderTextColor="#758283"></TextInput>
              <TextInput
                defaultValue=""
                onChangeText={text => {
                  setAddress2(text);
                }}
                style={styles.textinput}
                placeholder="Enter Address Line 2"
                placeholderTextColor="#758283"></TextInput>
              <TextInput
                defaultValue="Noida"
                onChangeText={text => {
                  setCity(text);
                }}
                style={styles.textinput}
                placeholder="Enter City"
                placeholderTextColor="#758283"></TextInput>
              <TextInput
                defaultValue="Uttar Pradesh"
                onChangeText={text => {
                  setState(text);
                }}
                style={styles.textinput}
                placeholder="Enter State"
                placeholderTextColor="#758283"></TextInput>
              <View
                style={{
                  marginLeft: scale(25),
                  marginRight: scale(25),
                  borderColor: '#A363A9',
                  borderWidth: 1,
                  borderRadius: moderateScale(100),
                  marginHorizontal: moderateScale(10),
                  marginTop: verticalScale(20),
                }}>
                <Picker
                  style={{
                    color: '#A363A9',
                  }}
                  dropdownIconColor="#A363A9"
                  dropdownIconRippleColor="#A363A9"
                  onTouchCancel={true}
                  mode="dropdown"
                  selectedValue={pincode}
                  onValueChange={itemValue => {
                    setPincode(itemValue);
                  }}>
                  <Picker.Item label="Choose Pincode" value="Choose Pincode" />
                  <Picker.Item label="201301" value="201301" />
                  <Picker.Item label="201304" value="201304" />
                </Picker>
              </View>
            </View>
            {loading == true ? (
              <ActivityIndicator
                size={'large'}
                color="#A363A9"
                style={{
                  alignSelf: 'center',
                  marginTop: verticalScale(15),
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (
                    pincode != 'Choose Pincode' &&
                    address1 &&
                    address2 &&
                    city &&
                    state
                  ) {
                    setLoading(true);
                    handleAddress();
                  }
                }}
                style={{
                  height: verticalScale(40),
                  width: scale(300),
                  marginLeft: scale(30),
                  marginRight: scale(30),
                  alignSelf: 'center',
                  marginTop: verticalScale(20),
                  borderRadius: moderateScale(100),
                  borderWidth: 2,
                  borderColor: '#A363A9',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: moderateScale(20),
                      marginTop: verticalScale(3),
                      color: '#A363A9',
                      textAlign: 'center',
                      // paddingTop: verticalScale(10),
                      // paddingBottom: verticalScale(10),
                    }}>
                    Add To My Addresses
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#E7E7E7',
                width: scale(260),
                marginTop: verticalScale(20),
                alignSelf: 'center',
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  fontWeight: 'bold',
                  marginLeft: scale(30),
                  marginTop: verticalScale(20),
                }}>
                My Saved Addresses
              </Text>
              {myAddresses.map(key => (
                <View
                  style={{
                    height: verticalScale(200),
                    width: scale(300),
                    alignSelf: 'center',
                    marginTop: verticalScale(20),
                    backgroundColor: '#FFF',
                    elevation: 5,
                    borderRadius: moderateScale(20),
                    padding: moderateScale(10),
                  }}>
                  <Text style={styles.text}> {key.address1} </Text>
                  <Text style={styles.text}> {key.address2} </Text>
                  <Text style={styles.text}> {key.city} </Text>
                  <Text style={styles.text}> {key.state} </Text>
                  <Text style={styles.text}> {key.pinCode} </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  textinput: {
    alignSelf: 'center',
    fontSize: moderateScale(18),
    borderColor: '#758283',
    borderWidth: 1,
    borderRadius: moderateScale(100),
    marginTop: verticalScale(15),
    marginLeft: scale(20),
    padding: moderateScale(15),
    marginRight: scale(20),
    color: '#000000',
    height: verticalScale(50),
    width: scale(300),
  },
  text: {
    fontSize: moderateScale(18),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(5),
  },
});
