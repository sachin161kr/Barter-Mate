import React, {useState} from 'react';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

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
          BarterMate associates will attend you soon. Please go to my account to
          view order details.
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
              Alert.alert('You Have Redeemed this service for now');
            }
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              height: verticalScale(135),
              width: scale(135),
              elevation: 5,
              marginLeft: scale(15),
              marginTop: verticalScale(20),
              borderRadius: moderateScale(15),
            }}>
            <Text
              style={{
                color: '#000000',
                marginLeft: verticalScale(15),
                marginTop: verticalScale(15),
                fontSize: moderateScale(18),
              }}>
              AC Service
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#5E5E5E',
                  marginLeft: verticalScale(15),
                  marginTop: verticalScale(18),
                  fontSize: moderateScale(14),
                  textDecorationLine: 'line-through',
                }}>
                399
              </Text>
              <Text
                style={{
                  color: '#000000',
                  marginLeft: verticalScale(15),
                  marginTop: verticalScale(15),
                  fontSize: moderateScale(18),
                }}>
                299
              </Text>
            </View>
          </View>
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
