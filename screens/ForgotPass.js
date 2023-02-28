import React, {useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';

import reset from '../assets/reset.png';
import confused from '../assets/confused.png';
import ellipse from '../assets/ellipse.png';
import forget from '../assets/forget.png';
import {ScrollView} from 'react-native-gesture-handler';

const ForgotPassScreen = ({navigation}) => {
  const [isloading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  var id = '';

  const emailCheck = () => {
    if (
      email.includes('@gmail.com') ||
      email.includes('@yahoo.com') ||
      email.includes('@rediff.com') ||
      email.includes('@hotmail.com')
    ) {
      return true;
    }

    return false;
  };

  const getId = () => {
    console.log(email);
    var data = JSON.stringify({
      email: `${email.toLowerCase()}`,
    });
    var config = {
      method: 'post',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/emailcheck',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        id = response.data.data._id;
        console.log('this is id');
        console.log(id);

        setLoading(false);
        navigation.navigate('Reset Screen', {
          id: `${id}`,
        });
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert('Email Not Found');
      });
  };

  return (
    <>
      <ScrollView>
        <LinearGradient
          colors={['#5A2D94', '#f2748e']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            margin: verticalScale(15),
            borderRadius: moderateScale(15),
            paddingBottom: verticalScale(80),
          }}>
          <Image
            source={forget}
            style={{
              height: verticalScale(30),
              width: scale(200),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: verticalScale(40),
            }}
          />
          <Image
            source={ellipse}
            style={{
              height: verticalScale(150),
              width: scale(150),
              position: 'relative',
              alignSelf: 'center',
              resizeMode: 'contain',
              marginTop: verticalScale(20),
            }}
          />
          <Image
            source={confused}
            style={{
              height: verticalScale(80),
              width: scale(100),
              position: 'absolute',
              resizeMode: 'contain',
              marginTop: verticalScale(125),
              marginLeft: scale(113),
            }}
          />
          <View>
            <Text
              style={{
                alignSelf: 'center',
                color: '#F4BE2C',
                fontFamily: 'Ubuntu-Regular',
              }}>
              Oops!! Forgot Password
            </Text>

            <Text
              style={{
                alignSelf: 'center',
                color: '#FFF',
                marginTop: verticalScale(10),
                fontFamily: 'Ubuntu-Regular',
              }}>
              Please enter the registered email ID or
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: '#FFF',
                marginTop: verticalScale(10),
                fontFamily: 'Ubuntu-Regular',
              }}>
              Mobile no. to reset the password.
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Registered Email / Mobile No."
              placeholderTextColor="#FFF"
              onChangeText={tempEmail => {
                setEmail(tempEmail);
              }}></TextInput>
          </View>
          {isloading == true ? (
            <View
              style={{
                height: verticalScale(50),
                width: scale(310),
                marginTop: verticalScale(15),
                alignSelf: 'center',
              }}>
              <ActivityIndicator
                color="#FFF"
                size={'large'}
                style={{
                  alignSelf: 'center',
                }}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (email.length > 0) {
                  setLoading(true);
                  getId();
                } else {
                  Alert.alert('Enter Valid Details');
                  setLoading(false);
                }
              }}>
              <View
                style={{
                  marginTop: verticalScale(45),
                  alignSelf: 'center',
                  height: verticalScale(68),
                  width: scale(250),
                  marginBottom: verticalScale(30),
                  backgroundColor: '#000',
                  marginLeft: scale(20),
                  marginRight: scale(20),
                  borderRadius: moderateScale(10),
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    alignSelf: 'center',
                    paddingTop: verticalScale(18),
                    color: '#FFFFFF',
                    margin: moderateScale(5),
                    fontFamily: 'Ubuntu-Regular',
                  }}>
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default ForgotPassScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(12),
    borderColor: '#FFF',
    borderBottomWidth: 1,
    fontFamily: 'Ubuntu-Regular',
    borderBottomColor: '#FFFFFF80',
    //borderWidth: 1,
    height: verticalScale(45),
    //borderRadius: moderateScale(100),
    marginTop: verticalScale(25),
    marginLeft: scale(20),
    paddingLeft: moderateScale(15),
    marginRight: scale(20),
    color: '#FFF',
  },
  forgotBtn: {
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    padding: moderateScale(8),
    borderWidth: 1,
    height: verticalScale(45),
    borderColor: '#A363A9',
    marginRight: scale(20),
    borderRadius: moderateScale(100),
  },
});
