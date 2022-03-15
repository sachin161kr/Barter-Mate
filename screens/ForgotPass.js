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
} from 'react-native';

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
    var data = JSON.stringify({
      email: `${email}`,
    });
    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/emailcheck',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        id = response.data.data._id;

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
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Enter Registered Email"
            placeholderTextColor="#758283"
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
              color="#A363A9"
              size={'large'}
              style={{
                alignSelf: 'center',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (email.length >= 10 && emailCheck()) {
                setLoading(true);
                getId();
              } else {
                Alert.alert('Enter Valid Email');
                setLoading(false);
              }
            }}>
            <LinearGradient
              colors={['#A363A9', '#FAB06D']}
              style={{
                borderRadius: moderateScale(100),
                height: verticalScale(45),
                width: scale(310),
                marginTop: verticalScale(15),
                alignSelf: 'center',
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={{
                  fontSize: moderateScale(25),
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: moderateScale(5),
                  paddingBottom: verticalScale(10),
                }}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default ForgotPassScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    borderColor: '#758283',
    borderWidth: 1,
    height: verticalScale(45),
    borderRadius: moderateScale(100),
    marginTop: verticalScale(35),
    marginLeft: scale(20),
    paddingLeft: moderateScale(15),
    marginRight: scale(20),
    color: '#000000',
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
