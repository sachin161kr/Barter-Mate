import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import LinearGradient from 'react-native-linear-gradient';

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const RegisterScreen = ({navigation, route}) => {
  const [pincode, setSelectedPincode] = useState('Choose Pincode');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLankmark] = useState('');

  const [isLoading, setLoading] = useState(false);

  const itemSelected = route.params.itemSelected;
  const subCategory = route.params.subCategory;

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

  const passCheck = () => {
    if (password != confirmPass) {
      Alert.alert('Password must be same as Confirmed Password');
      return false;
    } else if (password.length < 8) {
      Alert.alert('Password length must be greater than 7');
      return false;
    } else {
      return true;
    }
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

  const handleSubmit = () => {
    setLoading(true);
    var data = JSON.stringify({
      name: `${fullName}`,
      email: `${email}`,
      phone: `${phone}`,
      password: `${password}`,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/registration',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        Alert.alert('Successfully Registered');
        navigation.navigate('Login Screen', {
          itemSelected: `${itemSelected}`,
          subCategory: `${subCategory}`,
          location: 'Register',
        });
      })
      .catch(error => {
        setLoading(false);
        //console.log(error.response.data.msg);
        Alert.alert(error.response.data.msg);
      });
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#FFFFFF',
        }}>
        <Text
          style={{
            fontSize: moderateScale(30),
            textAlign: 'left',
            marginTop: verticalScale(10),
            color: '#000000',
            marginLeft: scale(30),
          }}>
          Sign Up
        </Text>
        <View
          style={{
            marginTop: verticalScale(10),
          }}>
          <TextInput
            style={styles.textinput}
            placeholder="Full Name"
            placeholderTextColor="#758283"
            onChangeText={text => {
              setFullName(text);
            }}></TextInput>

          <TextInput
            onChangeText={text => {
              setEmail(text);
            }}
            style={styles.textinput}
            placeholder="Email"
            placeholderTextColor="#758283"
            keyboardType="email-address"></TextInput>

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
              onChangeText={tempPhone => {
                setPhone(tempPhone);
              }}
              style={{
                fontSize: moderateScale(20),

                color: '#000000',
              }}
              placeholder="Enter Phone Number"
              maxLength={10}
              placeholderTextColor="#758283"></TextInput>
          </View>
          <TextInput
            onChangeText={text => {
              setPassword(text);
            }}
            style={styles.textinput}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#758283"></TextInput>
          <TextInput
            onChangeText={text => {
              setConfirmPass(text);
            }}
            style={styles.textinput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="#758283"></TextInput>

          {/* <View style={styles.pickerStyle}>
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
                setSelectedPincode(itemValue);
              }}>
              <Picker.Item label="Choose Pincode" value="Choose Pincode" />
              <Picker.Item label="201301" value="201301" />
              <Picker.Item label="201304" value="201304" />
            </Picker>
          </View> */}

          {isLoading == false ? (
            <View style={styles.registerBtn}>
              <TouchableOpacity
                onPress={() => {
                  if (fullName && email && phone && password && confirmPass) {
                    if (passCheck() && phoneCheck()) {
                      handleSubmit();
                    }
                  } else {
                    Alert.alert('Enter Valid Details');
                  }
                }}>
                <LinearGradient
                  colors={['#A363A9', '#FAB06D']}
                  style={{
                    borderRadius: moderateScale(100),
                    height: verticalScale(45),
                  }}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text
                    style={{
                      fontSize: moderateScale(20),
                      alignSelf: 'center',
                      color: '#FFFFFF',
                      margin: moderateScale(5),
                      paddingTop: verticalScale(3),
                    }}>
                    Register
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
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    height: verticalScale(45),
    borderColor: '#758283',
    borderWidth: 1,
    borderRadius: moderateScale(100),
    marginTop: verticalScale(15),
    marginLeft: scale(20),
    padding: moderateScale(15),
    marginRight: scale(20),
    color: '#000000',
  },

  registerBtn: {
    marginTop: verticalScale(15),
    height: verticalScale(45),
    backgroundColor: '#c4c4c4',
    marginLeft: scale(20),
    marginRight: scale(20),
    borderRadius: moderateScale(100),
    //marginBottom: verticalScale(20),
  },

  pickerStyle: {
    marginLeft: scale(20),
    marginTop: verticalScale(15),
    marginRight: scale(20),
    borderWidth: 1,
    borderRadius: moderateScale(100),
    borderColor: '#A363A9',
  },
});
