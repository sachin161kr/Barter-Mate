import React, {useState} from 'react';
import axios from 'axios';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  var name = '';
  var address = '';
  var phone = '';
  var landmark = '';
  var pincode = '';
  var email2 = '';

  var location = route.params.location;
  var userId = route.params.userId;

  const itemSelected = route.params.itemSelected;
  const subCategory = route.params.subCategory;

  //const [email2, setemail2] = useState('');

  const [isLoading, setLoading] = useState(false);

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'true');
    await AsyncStorage.setItem('User', `${name}`);
    await AsyncStorage.setItem('email', `${email2}`);
    await AsyncStorage.setItem('address', `${address}`);
    await AsyncStorage.setItem('phone', `${phone}`);
    await AsyncStorage.setItem('landmark', `${landmark}`);
    await AsyncStorage.setItem('pincode', `${pincode}`);
    await AsyncStorage.setItem('userId', `${userId}`);
  };

  const phoneCheck = phone => {
    var num = parseInt(phone, 10);
    var tempNum = num.toString(10);
    if (phone.length == 10 && phone.length === tempNum.length) {
      return true;
    } else {
      return false;
    }
  };

  const getCredentials = () => {
    if (email && password) {
      setLoading(true);

      var type = 'email';
      if (phoneCheck(email) == true) {
        type = 'number';
      }
      var data = JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        type: `${type}`,
      });

      var config = {
        method: 'post',
        url: 'https://bartermateapi.herokuapp.com/admin/registration-api/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setLoading(false);
          const userData = response.data;
          name = userData.data.userDetails.name;
          phone = userData.data.userDetails.phone;
          email2 = userData.data.userDetails.email;
          address = userData.data.userDetails.address;
          landmark = userData.data.userDetails.landMark;
          pincode = userData.data.userDetails.pinCode;
          userId = userData.data.userDetails._id;

          setUser();

          if (location != 'Profile') {
            navigation.navigate('Pickup Screen', {
              name: `${name}`,
              email: email2,
              phone: `${phone}`,
              address: `${address}`,
              landmark: `${landmark}`,
              pincode: `${pincode}`,
              itemSelected: `${itemSelected}`,
              subCategory: `${subCategory}`,
              userId: `${userId}`,
              loadAgain: `${false}`,
            });
          } else {
            //var tempUsername = await AsyncStorage.getItem('User');
            navigation.navigate('Profile Screen', {
              username: `${name}`,
            });
          }
        })
        .catch(function (error) {
          setLoading(false);
          Alert.alert('Login Failed');
          console.log(error);
        });
    } else {
      Alert.alert('Enter Valid Credentials');
    }
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

            marginTop: verticalScale(30),
            marginBottom: verticalScale(30),
            color: '#000000',
            marginLeft: scale(30),
          }}>
          Login
        </Text>
        <TextInput
          onChangeText={tempEmail => {
            setEmail(tempEmail);
          }}
          style={styles.textinput}
          placeholder="Email or Phone"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          style={styles.textinput}
          placeholder="Password"
          placeholderTextColor="#758283"
          secureTextEntry={true}
          onChangeText={tempPassword => {
            setPassword(tempPassword);
          }}></TextInput>

        {isLoading == false ? (
          <View style={styles.loginBtn}>
            <TouchableOpacity
              onPress={() => {
                getCredentials();
              }}>
              <LinearGradient
                colors={['#A363A9', '#FAB06D']}
                style={{
                  borderRadius: moderateScale(100),
                  height: verticalScale(48),
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    fontSize: moderateScale(25),
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: moderateScale(5),
                    //paddingBottom: verticalScale(10),
                  }}>
                  Login
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
        <View
          style={{
            alignSelf: 'center',
            marginTop: verticalScale(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot Screen');
            }}>
            <Text
              style={{
                fontSize: moderateScale(15),
                color: '#758283',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: moderateScale(18),
            alignSelf: 'center',
            marginTop: verticalScale(70),
            color: '#758283',
          }}>
          Not A Member Yet?
        </Text>

        <View style={styles.registerBtn}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register Screen', {
                itemSelected: `${itemSelected}`,
                subCategory: `${subCategory}`,
              });
            }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                alignSelf: 'center',
                color: '#A363A9',
                margin: moderateScale(5),
                paddingTop: verticalScale(2),
              }}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    borderColor: '#c4c4c4',
    borderWidth: 1,
    height: verticalScale(45),
    borderRadius: moderateScale(100),
    marginTop: verticalScale(15),
    marginLeft: scale(20),
    paddingLeft: moderateScale(15),
    marginRight: scale(20),
    color: '#000000',
  },

  loginBtn: {
    marginTop: verticalScale(25),
    backgroundColor: '#c4c4c4',
    marginLeft: scale(20),
    marginRight: scale(20),
    borderRadius: moderateScale(100),
  },

  registerBtn: {
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    //padding: moderateScale(8),
    borderWidth: 1,
    height: verticalScale(45),
    borderColor: '#A363A9',
    marginRight: scale(20),
    borderRadius: moderateScale(100),
  },
});
