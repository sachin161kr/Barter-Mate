import React, {useState} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';

import offer from '../assets/offers.png';

const RedeemScreen = ({route, navigation}) => {
  var userId = route.params.userId;

  var symbol = '<';

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
        <Text
          style={{
            fontWeight: 'bold',
            color: 'green',
            alignSelf: 'center',
            marginTop: verticalScale(30),
            fontSize: moderateScale(18),
          }}>
          Your Pickup has been scheduled
        </Text>
        <Text
          style={{
            margin: moderateScale(15),
            fontSize: moderateScale(16),
            marginTop: verticalScale(10),
            color: '#5E5E5E',
          }}>
          BarterMate associates will attend you soon. Please tap on the profile
          icon and see your pickup history. Thank you for your request.
        </Text>
        <Text
          style={{
            marginLeft: scale(15),
            fontSize: moderateScale(20),
            color: '#000000',
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
            colors={['#A363A9', '#FAB06D']}
            style={{
              height: verticalScale(135),
              width: scale(315),
              alignSelf: 'center',
              elevation: 5,
              marginTop: verticalScale(20),
              borderRadius: moderateScale(15),
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
                  fontSize: moderateScale(20),
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
                  fontSize: moderateScale(14),
                  textDecorationLine: 'line-through',
                }}>
                ₹499
              </Text>
              <Text
                style={{
                  color: '#FFF',
                  marginLeft: verticalScale(15),
                  marginTop: verticalScale(15),
                  fontSize: moderateScale(18),
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
                  fontSize: moderateScale(14),
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
    </>
  );
};

export default RedeemScreen;
