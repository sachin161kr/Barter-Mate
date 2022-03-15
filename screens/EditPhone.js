import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPhoneScreen = ({route, navigation}) => {
  var userId = route.params.userId;
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const setUser = async () => {
    await AsyncStorage.setItem('phone', `${phone}`);
    navigation.navigate('Category Screen');
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

  const handlePhone = () => {
    setLoading(true);
    var data = JSON.stringify({
      userId: `${userId}`,
      phone: `${phone}`,
    });

    var config = {
      method: 'put',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/editUser',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        Alert.alert('Phone No. Successfully Changed');
        setUser();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            borderColor: '#758283',
            borderRadius: moderateScale(100),
            borderWidth: 1,
            padding: moderateScale(5),

            width: scale(310),
            marginTop: verticalScale(20),
          }}>
          <Text
            style={{
              fontSize: moderateScale(20),
              marginTop: verticalScale(8),
              marginRight: scale(10),
              marginLeft: scale(3),
              color: '#758283',
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
              fontSize: moderateScale(20),
              height: verticalScale(45),
              color: '#000000',
            }}
            placeholder="Enter Phone Number"
            maxLength={10}
            placeholderTextColor="#758283"></TextInput>
        </View>
        {loading == true ? (
          <ActivityIndicator
            color="#A363A9"
            size={'large'}
            style={{
              marginTop: verticalScale(10),
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (phone.length && phoneCheck()) {
                handlePhone();
              } else {
                Alert.alert('Enter Valid Phone Number');
              }
            }}>
            <View
              style={{
                alignSelf: 'center',
                borderColor: '#A363A9',
                borderWidth: 2,
                width: scale(280),
                height: verticalScale(45),
                marginTop: verticalScale(20),
                borderRadius: moderateScale(100),
                padding: moderateScale(10),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  textAlign: 'center',
                  color: '#A363A9',
                }}>
                Save Phone Number
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default EditPhoneScreen;
