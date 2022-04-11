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

  var profile = route.params.profile;

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
      Alert.alert('Enter Valid Number');
      return false;
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    // var type = 'email';
    // if (phoneCheck1(email) == true) {
    //   type = 'number';
    // }

    var data = JSON.stringify({
      name: `${fullName}`,
      email: `${email}`,
      phone: `${phone}`,
      password: `${password}`,
      // type: `${type}`,
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
        //navigation.navigate('Category Screen');
        navigation.navigate('Login Screen', {
          itemSelected: `${itemSelected}`,
          subCategory: `${subCategory}`,
          profile: `${profile}`,
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
        <LinearGradient
          colors={['#5A2D94', '#f2748e']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            margin: verticalScale(15),
            borderRadius: moderateScale(15),
          }}>
          <View>
            <Text
              style={{
                fontSize: moderateScale(16),
                alignSelf: 'center',
                color: '#FFF',
                fontWeight: '300',
                marginTop: verticalScale(20),
              }}>
              Welcome
            </Text>
            <Text
              style={{
                fontSize: moderateScale(28),
                textAlign: 'center',
                fontWeight: '600',
                marginTop: verticalScale(10),
                color: '#FFF',
              }}>
              Register to Access
            </Text>
          </View>
          <View
            style={{
              marginTop: verticalScale(10),
            }}>
            <TextInput
              style={styles.textinput}
              placeholder="Full Name"
              placeholderTextColor="#FFF"
              onChangeText={text => {
                setFullName(text);
              }}></TextInput>

            <TextInput
              onChangeText={text => {
                setEmail(text);
              }}
              style={styles.textinput}
              placeholder="Email"
              placeholderTextColor="#FFF"
              keyboardType="email-address"></TextInput>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignSelf: 'center',
                padding: moderateScale(5),
                borderBottomWidth: 1,
                borderBottomColor: '#FFFFFF80',
                width: scale(280),
                marginTop: verticalScale(10),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  marginTop: verticalScale(13),
                  marginRight: scale(10),
                  marginLeft: scale(3),
                  color: '#FFF',
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
                  fontSize: moderateScale(12),
                  color: '#FFF',
                }}
                placeholder="Enter Phone Number"
                maxLength={10}
                placeholderTextColor="#FFF"></TextInput>
            </View>
            <TextInput
              onChangeText={text => {
                setPassword(text);
              }}
              style={styles.textinput}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#FFF"></TextInput>
            <TextInput
              onChangeText={text => {
                setConfirmPass(text);
              }}
              style={styles.textinput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#FFF"></TextInput>

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
                  <View>
                    <Text
                      style={{
                        fontSize: moderateScale(20),
                        alignSelf: 'center',
                        color: '#FFF',
                        margin: moderateScale(5),
                        paddingTop: verticalScale(13),
                      }}>
                      Sign Up
                    </Text>
                  </View>
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
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(12),
    borderColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff80',
    //borderWidth: 1,
    height: verticalScale(45),
    //borderRadius: moderateScale(100),
    marginTop: verticalScale(15),
    marginLeft: scale(20),
    paddingLeft: moderateScale(15),
    marginRight: scale(20),
    color: '#FFF',
  },

  registerBtn: {
    marginTop: verticalScale(25),
    height: verticalScale(68),
    marginBottom: verticalScale(20),
    backgroundColor: '#000',
    borderRadius: moderateScale(10),
    marginHorizontal: scale(20),
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
