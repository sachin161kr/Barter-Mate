import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import icon1 from '../assets/icon1.png';

const MyProfileScreen = ({route, navigation}) => {
  var name = route.params.name;
  var email = route.params.email;
  var phone = route.params.phone;
  var userId = route.params.userId;

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            alignSelf: 'center',
            marginTop: verticalScale(30),
          }}>
          <Text
            //source={icon1}
            style={{
              height: verticalScale(80),
              width: scale(85),
              backgroundColor: '#A363A9',
              alignSelf: 'center',
              fontWeight: 'bold',
              color: '#FFF',
              fontSize: moderateScale(35),
              textAlign: 'center',
              paddingTop: verticalScale(18),
              borderRadius: moderateScale(300),
              marginBottom: verticalScale(20),
            }}>
            {name.substring(0, 1)}
          </Text>
          <Text style={styles.text}>Name : {name}</Text>
          <Text style={styles.text}>Email : {email}</Text>
          <Text style={styles.text}>Phone : {phone}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Forgot Screen');
          }}>
          <View
            style={{
              alignSelf: 'center',
              borderColor: '#A363A9',
              borderWidth: 2,
              width: scale(280),
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
              Edit Password
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Edit Phone Screen', {
              phone: `${phone}`,
              userId: `${userId}`,
            });
          }}>
          <View
            style={{
              alignSelf: 'center',
              borderColor: '#A363A9',
              borderWidth: 2,
              width: scale(280),
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
              Edit Phone Number
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(10),
  },
});
