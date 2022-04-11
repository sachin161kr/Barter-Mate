import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import icon1 from '../assets/icon1.png';
import edit from '../assets/edit.png';

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
            marginTop: verticalScale(30),
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(30),
            }}>
            <Text
              style={{
                height: verticalScale(80),
                width: scale(85),
                backgroundColor: '#A363A9',
                fontWeight: 'bold',
                color: '#FFF',
                fontSize: moderateScale(35),
                textAlign: 'center',

                paddingTop: verticalScale(18),
                marginBottom: verticalScale(20),
              }}>
              {name.substring(0, 1)}
            </Text>
            <Text
              style={{
                marginLeft: scale(30),
                fontSize: moderateScale(20),
                color: '#5A2D94',
                fontWeight: '700',
                marginTop: verticalScale(30),
              }}>
              {name}
            </Text>
          </View>
          <Text
            style={{
              color: '#5A2D94',
              marginBottom: verticalScale(20),
              fontWeight: 'bold',
              marginTop: verticalScale(30),
            }}>
            PERSONAL DETAILS :
          </Text>
          <Text style={styles.text}>{name}</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.text}>{email}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Forgot Screen');
              }}>
              <Image
                source={edit}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: scale(30),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.text}>{phone}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Phone Screen', {
                  phone: `${phone}`,
                  userId: `${userId}`,
                });
              }}>
              <Image
                source={edit}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: scale(30),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(10),
    color: '#000',
    paddingBottom: verticalScale(10),
    width: scale(220),
    marginTop: verticalScale(10),
    borderBottomColor: '#CAD5E2',
    borderBottomWidth: 1,
  },
});
