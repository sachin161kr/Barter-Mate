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
  ScrollView
} from 'react-native';

import logo from '../assets/logo.png';

const LoginScreen = ({navigation,route}) => {
  // const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [address,setAddress] = useState('');
  // const [phone,setPhone] = useState('');
  // const [landMark,setLandMark] = useState('');
  // const [pinCode,setPincode] = useState('');

  var name = "";
  var address = "";
  var phone = "";
  var landmark = "";
  var pincode = "";
  
  const itemSelected = route.params.itemSelected;
  
  const [isLoading, setLoading] = useState(false);

  const setUser = async () => {
    console.log(name);
    console.log(email);
    console.log(address);
    console.log(phone);
    console.log(landmark);
    console.log(pincode);
    console.log("Done");
    await AsyncStorage.setItem('loginStatus', 'true');
    await AsyncStorage.setItem('User', `${name}`);
    await AsyncStorage.setItem('email',`${email}`);
    await AsyncStorage.setItem('address',`${address}`);
    await AsyncStorage.setItem('phone',`${phone}`);
    await AsyncStorage.setItem('landmark',`${landmark}`);
    await AsyncStorage.setItem('pincode',`${pincode}`);
   };

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
          name = userData.data.userDetails.name;
          phone = userData.data.userDetails.phone;
          address = userData.data.userDetails.address;
          landmark = userData.data.userDetails.landMark;
          pincode = userData.data.userDetails.pinCode;

          // setName(name);
          // setPhone(phone);
          // setAddress(addressSaved);
          // setLandMark(landmark);
          // setPincode(pincode);
          
          
        
    
          setUser();

          navigation.navigate('Pickup Screen', {
            name: `${name}`,
            email: email,
            phone: `${phone}`,
            address: `${address}`,
            landmark: `${landmark}`,
            pincode: `${pincode}`,
            itemSelected : itemSelected
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
      <ScrollView
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
      </ScrollView>
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
