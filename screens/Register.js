import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

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

const RegisterScreen = ({navigation,route}) => {
  const [pincode, setSelectedPincode] = useState('827013');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLankmark] = useState('');

  const [isLoading, setLoading] = useState(false);

  const itemSelected = route.params.itemSelected;

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

  const handleSubmit = () => {
    setLoading(true);
    var data = JSON.stringify({
      name: `${fullName}`,
      email: `${email}`,
      phone: `${phone}`,
      address: `${address}`,
      landMark: `${landmark}`,
      pinCode: `${pincode}`,
      password: `${password}`,
    });

    var config = {
      method: 'post',
      url: 'https://enigmatic-bayou-48428.herokuapp.com/admin/registration-api/registration',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        Alert.alert('Successfully Registered');
        navigation.navigate('Login Screen',{
          itemSelected : `${itemSelected}`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            marginTop: 10,
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

          <TextInput
            onChangeText={text => {
              setPhone(text);
            }}
            style={styles.textinput}
            placeholder="Phone"
            placeholderTextColor="#758283"
            keyboardType="phone-pad"></TextInput>

          <TextInput
            onChangeText={text => {
              setPassword(text);
            }}
            style={styles.textinput}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#758283"
           ></TextInput>
          <TextInput
            onChangeText={text => {
              setConfirmPass(text);
            }}
            style={styles.textinput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="#758283"></TextInput>
          <TextInput
            onChangeText={text => {
              setAddress(text);
            }}
            style={styles.textinput}
            placeholder="Address"
            placeholderTextColor="#758283"></TextInput>

          <TextInput
            onChangeText={text => {
              setLankmark(text);
            }}
            style={styles.textinput}
            placeholder="Lankmark"
            placeholderTextColor="#758283"></TextInput>

          <View style={styles.pickerStyle}>
            <Text
              style={{
                color: '#758283',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Choose Pincode
            </Text>
            <Picker
              style={{
                color: '#1FAA59',
              }}
              dropdownIconColor="#1FAA59"
              dropdownIconRippleColor="#1FAA59"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={pincode}
              onValueChange={itemValue => {
                setSelectedPincode(itemValue);
              }}>
              <Picker.Item label="827013" value="827013" />
              <Picker.Item label="827004" value="827004" />
            </Picker>
          </View>

          {isLoading == false ? (
            <View style={styles.registerBtn}>
              <TouchableOpacity
                onPress={() => {
                  //navigation.navigate('Category Screen');
                  if (
                    fullName &&
                    email &&
                    phone &&
                    password &&
                    confirmPass &&
                    address &&
                    landmark
                  ) {
                    if (passCheck() && phoneCheck()) {
                      handleSubmit();
                    }
                  } else {
                    Alert.alert('Enter Valid Details');
                  }
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: 5,
                    paddingBottom: 10,
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator
              size={'large'}
              style={{
                marginTop: 10,
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
    fontSize: 20,
    borderColor: '#1FAA59',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    color: '#000000',
  },

  registerBtn: {
    marginTop: 10,
    backgroundColor: '#1FAA59',
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 50,
    borderRadius: 10,
  },

  pickerStyle: {
    marginLeft: 70,
    marginTop: 15,
    marginRight: 70,
  },
});
