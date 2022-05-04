import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import ValidationComponent from 'react-native-form-validator';
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
  Image,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import edit from '../assets/edit.png';
import trash from '../assets/trash.png';

const AddressScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('Noida');
  const [state, setState] = useState('Uttar Pradesh');
  var userId = route.params.userId;
  var email = route.params.email;
  var phone = route.params.phone;
  var landmark = route.params.landmark;
  var itemSelected = route.params.itemSelected;
  var name = route.params.name;
  var pincodeRoute = route.params.pincode;

  var loadAgain = route.params.loadAgain;

  const [pincode, setPincode] = useState('Choose Pincode');
  const [addressType, setAddressType] = useState('Choose Address Type');

  const [myAddresses, setMyaddresses] = useState([]);

  const [addressId, setAddressId] = useState('Empty');

  var addressIdDelete = '';

  const [visible, setVisible] = useState(true);

  const handleEdit = () => {
    console.log(addressId);
    setLoading(true);
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
      tags: `${addressType}`,
      addressId: `${addressId}`,
    });

    console.log(data);

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/editAddress',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        Alert.alert('Address Successfully Changed');
        setVisible(true);
        handleShowAddress();
        console.log(JSON.stringify(response.data.data));
        console.log('editCalled');
        // var temp = JSON.stringify(response.data.data);
        // setMyaddresses(JSON.parse(temp));
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Something Went Wrong');
        setVisible(true);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    setLoading(true);
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
      tags: `${addressType}`,
      addressId: `${addressIdDelete}`,
    });

    console.log(data);

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/deleteAddress',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        Alert.alert('Address Successfully Deleted');
        handleShowAddress();
        //console.log(JSON.stringify(response.data.data));
        // var temp = JSON.stringify(response.data.data);
        // setMyaddresses(JSON.parse(temp));
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Something Went Wrong');
        setLoading(false);
      });
  };

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
        //console.log(JSON.stringify(response.data.data));
        var temp = JSON.stringify(response.data.data);
        setMyaddresses(JSON.parse(temp));
        //setAddressType(temp.addressType);
        //setAddressType(temp.tags);
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Something Went Wrong');
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(loadAgain, 'Address');
    handleShowAddress();
  }, []);

  //handleShowAddress();

  const handleAddress = () => {
    setLoading(true);
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
      tags: `${addressType}`,
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
        //console.log(JSON.stringify(response.data));

        Alert.alert('Address added successfully.');

        handleShowAddress();

        // if (pickupScreen) {
        //   navigation.navigate('Category Screen');
        // }

        if (loadAgain) {
          if (loadAgain == 'true') {
            loadAgain = 'false';
            console.log(loadAgain, 'changed');
          } else {
            loadAgain = 'true';
            console.log(loadAgain, 'changed');
          }
          navigation.navigate('Pickup Screen', {
            userId: `${userId}`,
            email: `${email}`,
            phone: `${phone}`,
            landMark: `${landmark}`,
            itemSelected: `${itemSelected}`,
            name: `${name}`,
            pincode: `${pincodeRoute}`,
            loadAgain: `${loadAgain}`,
          });
        }
        //history = JSON.parse(temp);
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert('Something went wrong!');
        console.log(error);
      });
  };

  // useEffect(() => {
  //   refreshData();
  // });

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
              paddingBottom: verticalScale(160),
            }}>
            <Picker
              style={{
                color: '#000',
                width: scale(300),
                fontSize: moderateScale(12),
                marginLeft: scale(14),
                marginTop: verticalScale(20),
                fontFamily: 'Ubuntu-Regular',
              }}
              dropdownIconColor="#000"
              dropdownIconRippleColor="#000"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={addressType}
              onValueChange={itemValue => {
                setAddressType(itemValue);
              }}>
              <Picker.Item
                label="Choose Address Type"
                value="Choose Address Type"
              />
              <Picker.Item label="HOME" value="HOME" />
              <Picker.Item label="OFFICE" value="OFFICE" />
              <Picker.Item label="OTHER" value="OTHER" />
            </Picker>

            <View>
              <TextInput
                defaultValue={address1}
                onChangeText={text => {
                  setAddress1(text);
                }}
                style={styles.textinput}
                placeholder="Enter Address Line 1 *"
                placeholderTextColor="#758283"></TextInput>
              <TextInput
                defaultValue={address2}
                onChangeText={text => {
                  setAddress2(text);
                }}
                style={styles.textinput}
                placeholder="Enter Address Line 2 (optional)"
                placeholderTextColor="#758283"></TextInput>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: scale(25),
                }}>
                <TextInput
                  defaultValue={city}
                  onChangeText={text => {
                    setCity(text);
                  }}
                  style={{
                    fontSize: moderateScale(12),
                    borderBottomColor: '#CAD5E2',
                    borderBottomWidth: 1,
                    marginTop: verticalScale(10),
                    marginRight: scale(20),
                    color: '#000000',
                    height: verticalScale(50),
                    width: scale(100),
                    fontFamily: 'Ubuntu-Regular',
                  }}
                  placeholder="Enter City *"
                  placeholderTextColor="#758283"></TextInput>
                <Picker
                  style={{
                    color: '#000',
                    width: scale(180),
                    marginLeft: scale(10),
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(12),
                  }}
                  dropdownIconColor="#000"
                  dropdownIconRippleColor="#000"
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
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TextInput
                  defaultValue={state}
                  onChangeText={text => {
                    setState(text);
                  }}
                  style={{
                    alignSelf: 'center',
                    fontSize: moderateScale(12),
                    borderBottomColor: '#CAD5E2',
                    borderBottomWidth: 1,
                    marginTop: verticalScale(10),
                    marginRight: scale(20),
                    color: '#000000',
                    height: verticalScale(50),
                    width: scale(100),
                    marginLeft: scale(25),
                    fontFamily: 'Ubuntu-Regular',
                  }}
                  placeholder="Enter State *"
                  placeholderTextColor="#758283"></TextInput>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    marginTop: verticalScale(27),
                    marginLeft: scale(60),
                    borderBottomColor: '#CAD5E2',
                    borderBottomWidth: 1,
                    width: scale(100),
                    color: '#000',
                    fontFamily: 'Ubuntu-Regular',
                  }}>
                  India
                </Text>
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
                  if (addressType == 'Choose Address Type') {
                    Alert.alert('Choose Address Type');
                  } else if (address1.length == 0) {
                    Alert.alert('Enter Valid Address in Address Line1');
                  } else if (city.length == 0) {
                    Alert.alert('Enter Valid City');
                  } else if (pincode == 'Choose Pincode') {
                    Alert.alert('Choose Valid Pincode');
                  } else if (state.length == 0) {
                    Alert.alert('Choose State');
                  } else {
                    if (visible) {
                      handleAddress();
                    } else {
                      console.log(addressId);
                      handleEdit();
                    }
                  }

                  // if (
                  //   pincode != 'Choose Pincode' &&
                  //   address1 &&
                  //   addressType &&
                  //   city &&
                  //   state &&
                  //   addressType != 'Choose Address Type'
                  // ) {
                  //   //setLoading(true);
                  //   //console.log(addressId);

                  // }
                }}
                style={{
                  height: verticalScale(40),
                  width: scale(150),
                  marginLeft: scale(30),
                  marginRight: scale(30),
                  alignSelf: 'center',
                  marginTop: verticalScale(20),
                  backgroundColor: '#5A2D94',
                  borderRadius: moderateScale(10),
                }}>
                <View>
                  {visible == true ? (
                    <Text
                      style={{
                        fontSize: moderateScale(12),
                        marginTop: verticalScale(3),
                        color: '#FFF',
                        textAlign: 'center',
                        fontFamily: 'Ubuntu-Bold',
                        paddingTop: verticalScale(10),
                        // paddingTop: verticalScale(10),
                        // paddingBottom: verticalScale(10),
                      }}>
                      Save Addresses
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: moderateScale(12),
                        marginTop: verticalScale(3),
                        color: '#FFF',
                        textAlign: 'center',
                        fontFamily: 'Ubuntu-Bold',
                        paddingTop: verticalScale(10),
                        // paddingTop: verticalScale(10),
                        // paddingBottom: verticalScale(10),
                      }}>
                      Save Edited Addresses
                    </Text>
                  )}
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

            {visible == true ? (
              <View>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: 'Ubuntu-Regular',
                    color: '#5A2D94',
                    marginLeft: scale(30),
                    marginTop: verticalScale(20),
                  }}>
                  MY SAVED ADDRESSES :
                </Text>
                {myAddresses.map(key => (
                  <View
                    style={{
                      flexDirection: 'row',
                      height: verticalScale(60),
                      width: scale(300),
                      borderColor: '#FFF',
                      borderBottomWidth: 1,
                      borderBottomColor: '#CAD5E2',
                      alignSelf: 'center',
                      marginTop: verticalScale(10),
                    }}>
                    <Text
                      style={{
                        marginLeft: scale(10),
                        marginTop: verticalScale(12),
                        fontSize: moderateScale(18),
                        color: '#5A2D94',
                        width: scale(80),
                        fontFamily: 'Ubuntu-Bold',
                      }}>
                      {key.tags}
                    </Text>
                    <Text
                      style={{
                        width: scale(180),

                        marginTop: verticalScale(10),
                        color: '#000',
                        fontFamily: 'Ubuntu-Regular',
                      }}>
                      {key.address1},{key.address2},{key.city},{key.state},{' '}
                      {key.pinCode}
                    </Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setLoading(true);
                          setAddressType(key.tags);
                          setAddress1(key.address1);
                          setAddress2(key.address2);
                          setCity(key.city);
                          setPincode(key.pinCode);
                          setState(key.state);
                          console.log('done');
                          setLoading(false);

                          // console.log(addressType);
                          // console.log(address1);
                          // console.log(address2);
                          // console.log(city);
                          // console.log(pincode);
                          // console.log(state);
                          setVisible(false);
                          //addressId = key._id;
                          setAddressId(key._id);
                          console.log(addressId);
                        }}>
                        <Image
                          source={edit}
                          style={{
                            height: verticalScale(20),
                            width: scale(20),
                            resizeMode: 'contain',
                            marginTop: verticalScale(6),
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          addressIdDelete = key._id;
                          //setAddressId(key._id);
                          handleDelete();
                        }}>
                        <Image
                          source={trash}
                          style={{
                            height: verticalScale(20),
                            width: scale(20),
                            resizeMode: 'contain',
                            marginTop: verticalScale(5),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <></>
            )}
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
    fontFamily: 'Ubuntu-Regular',
    fontSize: moderateScale(12),
    borderBottomColor: '#CAD5E2',
    borderBottomWidth: 1,
    marginTop: verticalScale(10),
    marginRight: scale(20),
    color: '#000000',
    height: verticalScale(50),
    width: scale(280),
  },
  text: {
    fontSize: moderateScale(18),
    fontFamily: 'Ubuntu-Regular',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(5),
  },
});
