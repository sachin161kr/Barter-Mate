import React, {Component, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import calender from '../assets/calender.png';

const PickupScreen = ({route, navigation}) => {
  var name = route.params.name;

  var email = route.params.email;
  var phone = route.params.phone;
  var landmark = route.params.landmark;
  var pincode = route.params.pincode;

  var tempCategory = route.params.itemSelected;
  var tempSubCategory = route.params.subCategory;
  var tempAddress = route.params.address;

  const [address, setAddress] = useState(`${tempAddress}`);
  const [category, setCategory] = useState(`${tempCategory}`);
  const [subCategory, setSubCategory] = useState(`${tempSubCategory}`);

  const [isLoading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState('');
  const [remark, setRemark] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [dateLabel, setDateLabel] = useState('Pick A Date');
  const [shift, changeShift] = useState('First Shift');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    //setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    console.log(fDate);
    setDateLabel(fDate);
  };

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
      url: 'https://bartermate01.herokuapp.com/admin/registration-api/addPickup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        Alert.alert('We will send our representatives soon. Thank You');
        navigation.navigate('Category Screen');
      })
      .catch(function (error) {
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
            fontWeight: '600',
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: verticalScale(50),
                borderRadius: moderateScale(100),
                marginTop: verticalScale(10),
                alignSelf: 'center',
                //borderWidth: 1,
                borderColor: '#000',
                width: scale(180),
              }}>
              <Image
                source={calender}
                style={{
                  height: verticalScale(50),
                  width: scale(50),
                  resizeMode: 'contain',
                  marginLeft: scale(20),
                  //marginTop: verticalScale(15),
                }}
              />

              <View
                style={{
                  marginLeft: scale(15),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    textAlign: 'center',
                    color: '#000',
                  }}>
                  {`${dateLabel}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: scale(150),
              height: 60,
              justifyContent: 'center',
              borderColor: '#A363A9',
              borderWidth: 1,
              marginTop: verticalScale(10),
              borderRadius: moderateScale(100),
            }}>
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={shift}
              onValueChange={itemValue => {
                changeShift(itemValue);
              }}>
              <Picker.Item label="First Shift" value="First Shift" />
              <Picker.Item label="Second Shift" value="Second Shift" />
            </Picker>
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            minimumDate={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <TextInput
          defaultValue={`${remark}`}
          onChangeText={tempRemark => {
            setRemark(tempRemark);
          }}
          style={styles.textinput}
          placeholder="Enter Remarks"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          defaultValue={`${feedback}`}
          onChangeText={tempFeedback => {
            setFeedback(tempFeedback);
          }}
          style={styles.textinput}
          placeholder="Put your feedback here."
          placeholderTextColor="#758283"></TextInput>

        {isLoading == false ? (
          <View style={styles.pickupBtn}>
            <TouchableOpacity
              onPress={() => {
                if (
                  address.length != 0 &&
                  shift &&
                  dateLabel != 'Pick A Date'
                ) {
                  handlePickeup();
                } else {
                  Alert.alert('Enter Valid Details');
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
                paddingBottom: verticalScale(20),
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
