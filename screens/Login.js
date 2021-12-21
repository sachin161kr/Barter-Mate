import React, {useState} from 'react';
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
} from 'react-native';

import logo from '../assets/logo.png';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var address = "";
  //const [name,setName] = useState('');
  var username = '';
  const [isLoading, setLoading] = useState(false);

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'true');
    await AsyncStorage.setItem('User', `${username}`);
    await AsyncStorage.setItem('address',`${address}`);

    //getUser();
  };

  //   const getUser = async ()=>{
  //     var tempLoginStatus = await AsyncStorage.getItem("loginStatus");
  //     var tempUsername =  await AsyncStorage.getItem("User");
  //     console.log(tempLoginStatus);
  //     console.log(tempUsername);

  // }

  const getCredentials = () => {
    if (email && password) {
      setLoading(true);
      var data = JSON.stringify({email: `${email}`, password: `${password}`});
      var config = {
        method: 'post',
        url: 'https://enigmatic-bayou-48428.herokuapp.com/admin/registration-api/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          const userData = response.data;
          var name = userData.data.userDetails.name;
          var phone = userData.data.userDetails.phone;
          var addressSaved = userData.data.userDetails.address;
          var landmark = userData.data.userDetails.landMark;
          var pincode = userData.data.userDetails.pinCode;
          username = name;
          address = addressSaved;

          //console.log(name);
          //setName(username);
          setUser();

          navigation.navigate('Pickup Screen', {
            name: `${name}`,
            email: email,
            phone: `${phone}`,
            addressSaved: `${addressSaved}`,
            landMark: `${landmark}`,
            pincode: `${pincode}`,
          });
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert('Login Failed');
        });
    } else {
      Alert.alert('Enter Valid Credentials');
    }
  };

  return (
    <>
      <View
        style={{
          marginTop: 20,
        }}>
        <Image
          source={logo}
          style={{
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 30,
            marginBottom: 30,
            color: '#000000',
            fontStyle: 'italic',
          }}>
          Welcome To TrashToCash
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
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: 5,
                  paddingBottom: 10,
                }}>
                Login
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
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            marginTop: 70,
            color: '#758283',
          }}>
          Don't Have An Account?
        </Text>

        <View style={styles.registerBtn}>
          <TouchableOpacity
            onPress={() => {
              console.log('Register Button Clicked');
              navigation.navigate('Register Screen');
            }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#000000',
                margin: 5,
                paddingBottom: 5,
              }}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: 20,
    borderColor: '#1FAA59',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    color: '#000000',
  },

  loginBtn: {
    marginTop: 25,
    backgroundColor: '#1FAA59',
    marginLeft: 90,
    marginRight: 90,
    borderRadius: 15,
  },

  registerBtn: {
    marginTop: 10,
    borderColor: '#1FAA59',
    borderWidth: 1,
    marginLeft: 100,
    marginRight: 100,
  },
});
