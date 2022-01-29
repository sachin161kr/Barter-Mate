import React, {Component, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { NavigationActions } from 'react-navigation';
import { BackHandler } from 'react-native';
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
  Button
} from 'react-native';

import sweeper from '../assets/sweeper.png';

const PickupScreen = ({route, navigation}) => {

  // useLayoutEffect(()=>{
  //    navigation.setOptions({
  //      headerLeft : ()=>(
  //        <Button 
  //           onPress={()=>null}
  //           title='Back Button'
  //        />
  //      )
  //    })
  // })
  
  var name = route.params.name;
  
  var email = route.params.email;
  var phone = route.params.phone;
  var landmark = route.params.landmark;
  var pincode = route.params.pincode;
  
  

  var tempCategory = route.params.itemSelected;
  var  tempSubCategory = route.params.subCategory;
  var tempAddress = route.params.address;

  console.log(`${tempSubCategory}`);
  
  const [address,setAddress] = useState(`${tempAddress}`);
  const [category,setCategory] = useState(`${tempCategory}`);
  const [subCategory,setSubCategory] = useState(`${tempSubCategory}`);

  // console.log(`${address}`);
  // console.log(`${category}`);
  // console.log(`${subCategory}`);
  
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, []) 

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  const handlePickeup = () => {
    setLoading(true);

    var data = JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      phone: `+91${phone}`,
      address: `${address}`,
      landMark: `${landmark}`,
      pinCode: `${pincode}`,
      category: `${category}`,
    });

    var config = {
      method: 'post',
      url: 'https://enigmatic-bayou-48428.herokuapp.com/admin/registration-api/addPickup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        Alert.alert('We will send our representatives soon. Thank You');
        navigation.navigate('Category Screen');
        // console.log(name);
        // console.log(email);
        // console.log(phone);
        // console.log(categorySaved);
        // console.log(addressSaved);
        // console.log(pincode);
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Sorry, Something Went Wrong');
        setLoading(false);

      });
  };

  return (
    <>
      <ScrollView
         style = {
           {
             backgroundColor : "#FFFFFF"
           }
         }
      >
        <View
          style = {
            { 
               height : verticalScale(180),
               width : scale(180),
               alignSelf: 'center',
               margin: moderateScale(20),
            } 
          }
        >
        <Image
          style={{
            height: 180,
            width: 180,
           
           
            
          }}
          source={sweeper}
        />
        </View>
        <Text
          style={{
            fontSize: moderateScale(25),
            alignSelf: 'center',
            color: '#000000',
            fontWeight: 'bold',
            fontStyle: 'italic',
            marginBottom : verticalScale(20),
          }}>
          Hello! {name}
        </Text>

        <View style={styles.pickerStyle}>
          {/* <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#758283',
            }}>
            Category Chosen
          </Text> */}
          <Picker
            style={{
              color: '#A363A9',
            }}
            dropdownIconColor="#A363A9"
            dropdownIconRippleColor="#A363A9"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={category}
            onValueChange={(itemValue) => {
              setCategory(itemValue);
              setSubCategory('Choose Sub-Category');
              console.log(`${category}`);
            }}>
            <Picker.Item label="Glass" value="Glass" />
            <Picker.Item label="Metal" value="Metal" />
            <Picker.Item label="Plastic" value="Plastic" />
            <Picker.Item label="Paper" value="Paper" />
            <Picker.Item label="Electronics" value="Electronics" />
          </Picker>
        </View>

        {/* <View style={styles.pickerStyle}>
         

          {
             category=="Glass"?
             <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
                //console.log(`${subCategory}`);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />   
              <Picker.Item label="Bottles" value="Bottles" />
              <Picker.Item label="Mirrors" value="Mirrors" />
            </Picker>:
              category=="Metal"?
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
                //console.log(`${subCategory}`);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />   
              <Picker.Item label="Steel" value="Steel" />
              <Picker.Item label="Brass" value="Brass" />
              <Picker.Item label="Motor" value="Motor" />
              <Picker.Item label="Aluminium" value="Aluminium" />
              <Picker.Item label="Copper" value="Copper" />
              <Picker.Item label="Iron" value="Iron" />
              <Picker.Item
                label="Beer/Beverage Cans"
                value="Beer/Beverage Cans"
              />
            </Picker> :
             category=="Paper"?
             <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
                //console.log(`${subCategory}`);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />   
              <Picker.Item label="Mil Board" value="Mil Board" />
              <Picker.Item label="Magazine" value="Magazine" />
              <Picker.Item
                label="Gatta/Corrugated Board"
                value="Gatta/Corrugated Board"
              />
              <Picker.Item label="Newspaper" value="Newspaper" />
              <Picker.Item label="Books" value="Books" />
            </Picker> : 
            category=="Plastic"?
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
                //console.log(`${subCategory}`);
              }}>
               <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />  
               <Picker.Item label="Milk Pouch" value="Milk Pouch" />
              <Picker.Item label="Plastic Bottles" value="Plastic Bottles" />
            </Picker> :
            <Picker
            style={{
              color: '#A363A9',
            }}
            dropdownIconColor="#A363A9"
            dropdownIconRippleColor="#A363A9"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={subCategory}
            onValueChange={(itemValue) => {
              setSubCategory(itemValue);
              //console.log(`${subCategory}`);
            }}>
             <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />  
            <Picker.Item label="Black Battery" value="Black Battery" />
              <Picker.Item label="White Battery" value="White Battery" />
              <Picker.Item
                label="Single-Door Fridge"
                value="Single-Door Fridge"
              />
              <Picker.Item
                label="Double-Door Fridge"
                value="Double-Door Fridge"
              />
              <Picker.Item label="Air Conditioner" value="Air Conditioner" />
              <Picker.Item label="Washing Machine" value="Washing Machine" />
          </Picker>
          }
        </View> */}

       
        <TextInput
          defaultValue={`${address}`}
          onChangeText={tempAddress => {
            setAddress(tempAddress);
            
          }}
          style={styles.textinput}
          placeholder="Enter Pickup Address"
          placeholderTextColor="#758283"></TextInput>

        {isLoading == false ? (
          <View style={styles.pickupBtn}>
            <TouchableOpacity
              onPress={() => {
                
                  if (address.length != 0) {
                    handlePickeup();
                    //printAll();
                  } else {
                    Alert.alert('Enter Valid Address');
                  }
                
                
                
              }}>
              <LinearGradient colors={['#A363A9', '#FAB06D']}
                   style = {
                     {
                      borderRadius: moderateScale(100),
                      //marginTop : 10,
                                        
                     }
                   }
                   start={{x: 0, y: 0}} 
                   end={{x: 1, y: 0}}
                >
                   <Text
                style={{
                  fontSize: moderateScale(20),
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: moderateScale(5),
                  paddingTop : verticalScale(10),
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
                paddingBottom : verticalScale(10),
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
    padding : moderateScale(15),
    justifyContent : "center",
    borderWidth: 1,
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginRight: scale(20),
    color: '#000000',
  },

  pickupBtn: {
    marginTop: verticalScale(20),
    //borderWidth : 2,
    //borderColor : 'red',
   
    marginLeft: scale(15),
    marginRight: scale(15),
    borderRadius : moderateScale(100),
    padding : moderateScale(6),
  },

  pickerStyle: {
    marginLeft: scale(20),
    marginTop: verticalScale(10),
    borderColor : "#A363A9",
    marginRight: scale(20),
    borderRadius : moderateScale(100),
    borderWidth : 1,

  },
});
