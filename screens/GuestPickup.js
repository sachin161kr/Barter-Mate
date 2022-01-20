import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
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

import sweeper from '../assets/sweeper.png';

const GuestPickupScreen = ({route, navigation}) => {
  const [category, setCategory] = useState(`${route.params.itemSelected}`);
  const [subCategory, setSubCategory] = useState(`${route.params.subCategory}`);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [landMark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('Choose Pincode');
  const [name, setName] = useState('');

  //setCategory(tempCategory);

  //const [loginStatus,setLogin] = useState('');

  // const getUser = async ()=>{
  //     var tempLoginStatus = await AsyncStorage.getItem("loginStatus");
  //     setLogin(tempLoginStatus);
  // }

  // getUser();

  const [address, setAddress] = useState(``);

  const [isLoading, setLoading] = useState(false);

  // const setUser = async ()=>{
  //   await AsyncStorage.setItem("loginStatus","false");
  //   await AsyncStorage.setItem("User","Guest");

  // }

  const passCheck = () => {
    console.log(password);
    console.log(confirmPass);
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

  const handlePickeup = () => {
    setLoading(true);

    var data = JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
      address: `${address}`,
      landMark: `${landMark}`,
      pinCode: `${pincode}`,
      category: `${subCategory}`,
    });

    console.log(`${name}`);
    console.log(`${email}`);
    console.log(`${phone}`);
    console.log(`${address}`);
    console.log(`${landMark}`);
    console.log(`${pincode}`);
    console.log(`${subCategory}`);

    var config = {
      method: 'post',
      url: 'https://enigmatic-bayou-48428.herokuapp.com/admin/registration-api/guest',
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
        style={{
          backgroundColor: '#FFFFFF',
        }}>
        <Image
          style={{
            height: 180,
            width: 180,
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
            marginTop: 10,
          }}>
          Hello! {name}
        </Text>

        <View style={styles.pickerStyle}>
          {/* <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#758283',
              marginTop: 10,
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

          {category == 'Glass' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={itemValue => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item
                label="Choose Sub-Category"
                value="Choose Sub-Category"
              />
              <Picker.Item label="Bottles" value="Bottles" />
              <Picker.Item label="Mirrors" value="Mirrors" />
            </Picker>
          ) : category == 'Metal' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={itemValue => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item
                label="Choose Sub-Category"
                value="Choose Sub-Category"
              />
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
            </Picker>
          ) : category == 'Paper' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={itemValue => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item
                label="Choose Sub-Category"
                value="Choose Sub-Category"
              />
              <Picker.Item label="Mil Board" value="Mil Board" />
              <Picker.Item label="Magazine" value="Magazine" />
              <Picker.Item
                label="Gatta/Corrugated Board"
                value="Gatta/Corrugated Board"
              />
              <Picker.Item label="Newspaper" value="Newspaper" />
              <Picker.Item label="Books" value="Books" />
            </Picker>
          ) : category == 'Plastic' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={itemValue => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item
                label="Choose Sub-Category"
                value="Choose Sub-Category"
              />
              <Picker.Item label="Milk Pouch" value="Milk Pouch" />
              <Picker.Item label="Plastic Bottles" value="Plastic Bottles" />
            </Picker>
          ) : (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={itemValue => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item
                label="Choose Sub-Category"
                value="Choose Sub-Category"
              />
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
          )}
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

        <TextInput
          defaultValue={`${phone}`}
          onChangeText={tempPhone => {
            setPhone(tempPhone);
          }}
          style={styles.textinput}
          placeholder="Enter Phone Number"
          placeholderTextColor="#758283"></TextInput>

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
            marginLeft: 20,
            marginRight: 20,
            borderColor: '#A363A9',
            borderWidth: 1,
            borderRadius: 25,
            margin: 10,
            marginTop: 10,
          }}>
          {/* <Text
            style={{
              color: '#758283',
              fontSize: 20,
              textAlign: 'center',
              marginTop : 15,
            }}>
            Choose Pincode
          </Text> */}
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

        {isLoading == false ? (
          <View style={styles.pickupBtn}>
            <TouchableOpacity
              onPress={() => {
                if (
                  name &&
                  email &&
                  phone &&
                  address &&
                  landMark
                ) {
                  if (phoneCheck()) {
                    if(pincode!="Choose Pincode")
                    {
                      handlePickeup();
                    }
                    else
                    {
                      Alert.alert("Choose Pincode");
                    }
                  }
                } else {
                  Alert.alert('Enter Valid Details');
                }
              }}>
              <LinearGradient
                colors={['#A363A9', '#FAB06D']}
                style={{
                  borderRadius: 25,
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: 5,
                    paddingTop: 10,

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
              marginTop: 10,
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
    fontSize: 20,
    borderColor: '#758283',
    borderRadius: 25,
    padding: 15,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#000000',
  },

  pickupBtn: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    padding: 6,
    marginBottom: 30,
    borderRadius: 25,
  },

  pickerStyle: {
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#A363A9',
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
  },
});
