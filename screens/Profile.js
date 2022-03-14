import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';

const ProfileScreen = ({route, navigation}) => {
  var username = route.params.username;

  var userId = '';
  var name = '';
  var email = '';
  var phone = '';
  var landmark = '';

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  const getUser = async () => {
    name = await AsyncStorage.getItem('User');
    email = await AsyncStorage.getItem('email');
    phone = await AsyncStorage.getItem('phone');
    userId = await AsyncStorage.getItem('userId');
    landmark = await AsyncStorage.getItem('landmark');
  };

  getUser();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Category Screen');
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   navigation.navigate('Category Screen');
  // });

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            marginBottom: verticalScale(30),
          }}>
          <Text
            style={{
              fontSize: moderateScale(20),
              fontWeight: 'bold',
              marginLeft: scale(35),
              marginTop: verticalScale(15),
            }}>
            Hey! {username}
          </Text>
          <View
            style={{
              marginLeft: scale(30.17),
              marginTop: verticalScale(15),
              marginRight: scale(40),
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('My Profile Screen', {
                  name: `${name}`,
                  email: `${email}`,
                  phone: `${phone}`,
                  userId: `${userId}`,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E7E7E7',
                  marginLeft: scale(5),
                  height: verticalScale(53.1),
                }}>
                <Image
                  source={icon1}
                  style={{
                    height: verticalScale(35),
                    width: scale(35),
                    marginTop: verticalScale(5),
                    marginRight: scale(4),
                  }}
                />
                <Text style={styles.options}>My Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Address Screen', {
                  userId: `${userId}`,
                  email: `${email}`,
                  phone: `${phone}`,
                  landMark: `${landmark}`,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E7E7E7',
                  height: verticalScale(53.1),
                }}>
                <Image
                  source={icon2}
                  style={{
                    height: verticalScale(35),
                    width: scale(45),
                    marginTop: verticalScale(5),
                  }}
                />
                <Text style={styles.options}>My Addresses</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                var tempEmail = await AsyncStorage.getItem('email');
                navigation.navigate('Pickup History Screen', {
                  email: `${tempEmail}`,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E7E7E7',
                  height: verticalScale(53.1),
                }}>
                <Image
                  source={icon3}
                  style={{
                    height: verticalScale(35),
                    width: scale(40),
                    marginTop: verticalScale(5),
                  }}
                />
                <Text style={styles.options}>Pickup History</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Phone - (+91)88-2626-7661\nEmail - info@bartermate.in',
                );
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E7E7E7',
                  height: verticalScale(53.1),
                }}>
                <Image
                  source={icon4}
                  style={{
                    height: verticalScale(35),
                    width: scale(40),
                    marginTop: verticalScale(5),
                  }}
                />
                <Text style={styles.options}>Support</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              height: verticalScale(40),
              width: scale(300),
              marginLeft: scale(30),
              marginRight: scale(30),
              alignSelf: 'center',
              marginTop: verticalScale(290),
              borderRadius: moderateScale(100),
              borderWidth: 2,
              borderColor: '#A363A9',
              // marginLeft: scale(15),
              // marginRight: scale(15),
              // padding: moderateScale(6),
              // marginBottom: verticalScale(30),
            }}
            onPress={() => {
              setUser();
              navigation.navigate('Category Screen');
              Alert.alert('You are logged out!');
            }}>
            <View>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  marginTop: verticalScale(3),
                  color: '#A363A9',
                  textAlign: 'center',
                  // paddingTop: verticalScale(10),
                  // paddingBottom: verticalScale(10),
                }}>
                LogOut
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  options: {
    height: verticalScale(20),
    fontSize: moderateScale(16),
    marginLeft: scale(16.17),
    marginBottom: verticalScale(30),
    marginTop: verticalScale(16),
  },
});
