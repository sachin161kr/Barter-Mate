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
import LinearGradient from 'react-native-linear-gradient';

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
      <LinearGradient
        colors={['#5A2D94', '#f2748e']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          backgroundColor: '#FFF',
          margin: verticalScale(15),
          borderRadius: moderateScale(15),
          paddingBottom: verticalScale(80),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignSelf: 'center',

            padding: moderateScale(5),
            borderBottomColor: '#CAD5E2',
            borderBottomWidth: 1,
            width: scale(280),
            marginTop: verticalScale(60),
          }}>
          <Text
            style={{
              fontSize: moderateScale(12),
              marginTop: verticalScale(13),
              marginRight: scale(10),
              marginLeft: scale(3),
              color: '#FFF',
            }}>
            +91
          </Text>
          <TextInput
            defaultValue={`${phone}`}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={tempPhone => {
              setPhone(tempPhone);
            }}
            style={{
              fontSize: moderateScale(12),

              color: '#FFF',
            }}
            placeholder="Contact Number*"
            placeholderTextColor="#FFF"></TextInput>
        </View>
        {loading == true ? (
          <ActivityIndicator
            color="#FFF"
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

                width: scale(280),
                height: verticalScale(45),
                marginTop: verticalScale(20),
                backgroundColor: '#000',
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                width: scale(220),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  textAlign: 'center',
                  paddingTop: verticalScale(3),
                  color: '#FFF',
                }}>
                Save Phone Number
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </>
  );
};

export default EditPhoneScreen;
