import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  BackHandler,
} from 'react-native';

import offer from '../assets/offers.png';
import awesome from '../assets/awesome.png';
import awesomeFont from '../assets/awesomeFont.png';
import track from '../assets/track.png';
import {ScrollView} from 'react-native-gesture-handler';

const RedeemScreen = ({route, navigation}) => {
  var userId = route.params.userId;

  var symbol = '<';

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

  const [isRedeemAc, setRedeemAC] = useState(false);
  const handleRedeem = () => {
    var data = JSON.stringify({
      userId: `${userId}`,
      serviceName: 'AC wala',
      isService: true,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/Service',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRedeemAC(true);
        //isRedeemAc = true;
        Alert.alert('You have successfully redeemed this service');
      })
      .catch(function (error) {
        Alert.alert('You have already redeemed this service');
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            paddingBottom: verticalScale(40),
          }}>
          <Image
            source={awesome}
            style={{
              height: verticalScale(130),
              width: scale(140),
              alignSelf: 'center',
            }}
          />
          <Image
            source={awesomeFont}
            style={{
              height: verticalScale(20),
              width: scale(180),
              alignSelf: 'center',
              marginTop: verticalScale(20),
            }}
          />
          <Text
            style={{
              fontWeight: '300',
              fontSize: moderateScale(18),
              color: '#000',
              alignSelf: 'center',
              textAlign: 'center',
              marginHorizontal: scale(30),
              marginTop: verticalScale(30),
            }}>
            Your pickup has been scheduled. Our associate will attend to you!!
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: moderateScale(17),
              color: '#000',
              marginTop: verticalScale(20),
              textAlign: 'center',
              marginHorizontal: scale(30),
              fontWeight: '300',
              fontSize: moderateScale(18),
            }}>
            You can check your booking in the order history under your profile
            section.
          </Text>
          <Image
            source={track}
            style={{
              height: verticalScale(40),
              width: scale(80),
              alignSelf: 'center',
              marginTop: verticalScale(30),
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: moderateScale(20),
              color: '#000000',
              fontWeight: 'bold',
              marginTop: verticalScale(12),
            }}>
            Available Offers
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (isRedeemAc == false) {
                handleRedeem();
              } else {
                Alert.alert('You Have Already Redeemed this service.');
              }
            }}>
            <LinearGradient
              colors={['#9b38d9', '#f2748e']}
              style={{
                height: verticalScale(135),
                width: scale(315),
                alignSelf: 'center',
                elevation: 5,
                marginTop: verticalScale(20),
                borderRadius: moderateScale(10),
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    marginLeft: verticalScale(15),
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(23),
                    fontWeight: 'bold',
                  }}>
                  AC Services
                </Text>
                <Text
                  style={{
                    color: '#FFF',
                    marginLeft: verticalScale(8),
                    marginTop: verticalScale(18),
                    fontSize: moderateScale(18),
                  }}>
                  starting at :
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    marginLeft: verticalScale(15),
                    marginTop: verticalScale(18),
                    fontSize: moderateScale(12),
                    textDecorationLine: 'line-through',
                  }}>
                  ₹499
                </Text>
                <Text
                  style={{
                    color: '#FFF',
                    marginLeft: verticalScale(15),
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(16),
                  }}>
                  ₹349 for Window AC
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    marginLeft: verticalScale(15),
                    marginTop: verticalScale(18),
                    fontSize: moderateScale(12),
                    textDecorationLine: 'line-through',
                  }}>
                  ₹599
                </Text>
                <Text
                  style={{
                    color: '#FFF',
                    marginLeft: verticalScale(15),
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(18),
                  }}>
                  ₹449 for Split AC
                </Text>
                <Image
                  source={offer}
                  style={{
                    height: verticalScale(45),
                    width: scale(45),
                    marginLeft: scale(50),
                  }}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Category Screen');
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              paddingBottom: verticalScale(30),
              width: '100%',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: moderateScale(18),
                color: '#A363A9',
              }}>
              {symbol} Back to Homescreen
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default RedeemScreen;
