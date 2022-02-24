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

  var location = route.params.location;

  const itemSelected = route.params.itemSelected;
  const subCategory = route.params.subCategory;

  const [isLoading, setLoading] = useState(false);

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'true');
    await AsyncStorage.setItem('User', `${name}`);
    await AsyncStorage.setItem('email', `${email}`);
    await AsyncStorage.setItem('address', `${address}`);
    await AsyncStorage.setItem('phone', `${phone}`);
    await AsyncStorage.setItem('landmark', `${landmark}`);
    await AsyncStorage.setItem('pincode', `${pincode}`);
  };

  const getCredentials = () => {
    if (email && password) {
      setLoading(true);
      var data = JSON.stringify({email: `${email}`, password: `${password}`});
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
          setLoading(false);
          const userData = response.data;
          name = userData.data.userDetails.name;
          phone = userData.data.userDetails.phone;
          address = userData.data.userDetails.address;
          landmark = userData.data.userDetails.landMark;
          pincode = userData.data.userDetails.pinCode;

          setUser();

          if (location != 'Profile') {
            navigation.navigate('Pickup Screen', {
              name: `${name}`,
              email: email,
              phone: `${phone}`,
              address: `${address}`,
              landmark: `${landmark}`,
              pincode: `${pincode}`,
              itemSelected: `${itemSelected}`,
              subCategory: `${subCategory}`,
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
          placeholder="Email"
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
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    fontSize: moderateScale(30),
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: moderateScale(5),
                    paddingBottom: verticalScale(10),
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
                paddingBottom: verticalScale(5),
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
    borderRadius: moderateScale(100),
    marginTop: verticalScale(15),
    marginLeft: scale(20),
    padding: moderateScale(15),
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
    padding: moderateScale(8),
    borderWidth: 1,
    borderColor: '#A363A9',
    marginRight: scale(20),
    borderRadius: moderateScale(100),
  },
});
