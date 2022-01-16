import React, {useState} from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackActions } from '@react-navigation/native';

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
  const subCategory = route.params.subCategory;

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

          setUser();
          
          // const pushAction = StackActions.push('Category Screen');
          // navigation.dispatch(
          //   pushAction,
          //   StackActions.replace('Pickup Screen', {
          //   name: `${name}`,
          //   email: email,
          //   phone: `${phone}`,
          //   address: `${address}`,
          //   landmark: `${landmark}`,
          //   pincode: `${pincode}`,
          //   itemSelected : `${itemSelected}`
          //   })
          // );

          navigation.navigate('Pickup Screen', {
            name: `${name}`,
            email: email,
            phone: `${phone}`,
            address: `${address}`,
            landmark: `${landmark}`,
            pincode: `${pincode}`,
            itemSelected : `${itemSelected}`,
            subCategory : `${subCategory}`,
          });
        })
        .catch(function (error) {
          console.log(error);
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
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'left',
            
            marginTop: 30,
            marginBottom: 30,
            color: '#A363A9',
            marginLeft: 30,
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
              <LinearGradient colors={['#A363A9', '#FAB06D']}
                   style = {
                     {
                      borderRadius: 25,
                      //marginTop : 10,
                                        
                     }
                   }
                   start={{x: 0, y: 0}} 
                   end={{x: 1, y: 0}}
                >
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
              </LinearGradient>  
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator
            color="#A363A9"
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
            color : "#758283",
            
          }}>
          Not A Member Yet?
        </Text>

        <View style={styles.registerBtn}>
          <TouchableOpacity
            onPress={() => {
              console.log('Register Button Clicked');
              navigation.navigate('Register Screen',{
                itemSelected : `${itemSelected}`,
                subCategory : `${subCategory}`,
              });
            }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color : "#A363A9",
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
    borderColor: '#c4c4c4',
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 15,
    marginLeft: 20,
    padding : 15,
    marginRight: 20,
    color: '#000000',
  },

  loginBtn: {
    marginTop: 25,
    backgroundColor: '#c4c4c4',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
  },

  registerBtn: {
    marginTop: 10,
    marginLeft: 20,
    padding : 8,
    borderWidth : 1,
    borderColor : "#A363A9",
    marginRight: 20,
    borderRadius: 25,
    
  },
});
