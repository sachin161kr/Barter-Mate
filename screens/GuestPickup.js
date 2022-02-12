import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';

import sweeper from '../assets/garbageCleaner.png';
import calender from '../assets/calender.png';

const GuestPickupScreen = ({route, navigation}) => {
  const [category, setCategory] = useState(`${route.params.itemSelected}`);
  const [subCategory, setSubCategory] = useState(`${route.params.subCategory}`);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [landMark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('Choose Pincode');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [remark, setRemark] = useState('');

  const [address, setAddress] = useState(``);

  const [isLoading, setLoading] = useState(false);

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

  const emailCheck = () => {
    if (
      email.includes('@gmail.com') ||
      email.includes('@yahoo.com') ||
      email.includes('@rediff.com') ||
      email.includes('@hotmail.com')
    ) {
      return true;
    }

    return false;
  };

  const phoneCheck = () => {
    var num = parseInt(phone, 10);
    var tempNum = num.toString(10);
    if (phone.length == 10 && phone.length === tempNum.length) {
      return true;
    } else {
      Alert.alert('Enter Valid Phone Number');
      return false;
    }
  };

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
      url: 'https://bartermate01.herokuapp.com/admin/registration-api/guest',
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
          }}>
          Hello! User
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            borderColor: '#758283',
            borderRadius: moderateScale(100),
            borderWidth: 1,
            padding: moderateScale(5),

            width: scale(310),
            marginTop: verticalScale(10),
          }}>
          <Text
            style={{
              fontSize: moderateScale(20),
              marginTop: verticalScale(8),
              marginRight: scale(10),
              marginLeft: scale(3),
              color: '#758283',
            }}>
            +91
          </Text>
          <TextInput
            defaultValue={`${phone}`}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={tempPhone => {
              setPhone(tempPhone);
            }}
            style={{
              fontSize: moderateScale(20),

              color: '#000000',
            }}
            placeholder="Enter Phone Number"
            placeholderTextColor="#758283"></TextInput>
        </View>

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

        <View
          style={{
            marginLeft: scale(20),
            marginRight: scale(20),
            borderColor: '#A363A9',
            borderWidth: 1,
            borderRadius: moderateScale(100),
            marginHorizontal: moderateScale(10),
            marginTop: verticalScale(10),
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
                  name &&
                  email &&
                  phone &&
                  address &&
                  shift &&
                  dateLabel != 'Pick A Date' &&
                  emailCheck()
                ) {
                  if (phoneCheck()) {
                    if (pincode != 'Choose Pincode') {
                      handlePickeup();
                    } else {
                      Alert.alert('Choose Pincode');
                    }
                  }
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
              marginTop: verticalScale(10),
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
    fontSize: moderateScale(20),
    borderColor: '#758283',
    borderRadius: moderateScale(100),
    padding: moderateScale(15),
    borderWidth: 1,
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginRight: scale(20),
    color: '#000000',
  },

  pickupBtn: {
    marginTop: verticalScale(5),
    marginLeft: scale(15),
    marginRight: scale(15),
    padding: moderateScale(6),
    marginBottom: verticalScale(30),
    borderRadius: moderateScale(100),
  },

  pickerStyle: {
    marginLeft: scale(20),
    marginRight: scale(20),
    borderColor: '#A363A9',
    borderWidth: 1,
    borderRadius: moderateScale(100),
    margin: moderateScale(10),
  },
});
