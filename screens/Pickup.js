import React, {Component, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
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
      phone: `${phone}`,
      address: `${address}`,
      landMark: `${landmark}`,
      pinCode: `${pincode}`,
      category: `${subCategory}`,
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
        <Image
          style={{
            height: 180,
            width: 180,
            margin: 20,
            marginTop: 20,
            alignSelf: 'center',
          }}
          source={sweeper}
        />
        <Text
          style={{
            fontSize: 25,
            alignSelf: 'center',
            color: '#000000',
            fontWeight: 'bold',
            fontStyle: 'italic',
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

        <View style={styles.pickerStyle}>
          {/* <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#758283',
              marginTop: 10,
            }}>
            Sub-Category Chosen
          </Text> */}

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
        </View>

       
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
                if(subCategory!="Choose Sub-Category")
                {
                  if (address.length != 0) {
                    handlePickeup();
                    //printAll();
                  } else {
                    Alert.alert('Enter Valid Address');
                  }
                }
                else
                {
                  Alert.alert("Choose a Sub-Category");
                }
                
              }}>
              <LinearGradient colors={['#A363A9', '#FAB06D']}
                   style = {
                     {
                      borderRadius: 100,
                      //marginTop : 10,
                                        
                     }
                   }
                   start={{x: 0, y: 0}} 
                   end={{x: 1, y: 0}}
                >
                   <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: 5,
                  paddingTop : 10,
                  paddingBottom: 15,
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
              marginTop: 30,
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
                fontSize: 20,
                textAlign: 'center',
                marginTop: 10,
                color: '#A363A9',
                paddingBottom : 10,
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
    fontSize: 20,
    borderColor: '#A363A9',
    borderRadius: 25,
    padding : 15,
    justifyContent : "center",
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#000000',
  },

  pickupBtn: {
    marginTop: 20,
    //borderWidth : 2,
    //borderColor : 'red',
   
    marginLeft: 15,
    marginRight: 15,
    borderRadius : 50,
    padding : 6,
  },

  pickerStyle: {
    marginLeft: 20,
    marginTop: 10,
    borderColor : "#A363A9",
    marginRight: 20,
    borderRadius : 25,
    borderWidth : 1,

  },
});
