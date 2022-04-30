import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import query from '../assets/query.png';

const SupportScreen = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#EF6563',
        }}>
        <Text
          style={{
            color: '#FFF',
            fontFamily: 'Ubuntu-Bold',
            fontSize: moderateScale(35),
            textAlign: 'center',
            marginTop: verticalScale(120),
          }}>
          Query & Support
        </Text>
        <Text
          style={{
            color: '#FFF',
            fontFamily: 'Ubuntu-Regular',
            fontSize: moderateScale(20),
            textAlign: 'center',
            marginTop: verticalScale(20),
          }}>
          Feel Free To
        </Text>
        <View>
          <Text
            style={{
              fontFamily: 'Ubuntu-Bold',
              color: '#FFF',
              marginTop: verticalScale(60),
              marginLeft: scale(40),
            }}>
            React us @
          </Text>
          <TouchableOpacity
            onPress={() => {
              var SendIntentAndroid = require('react-native-send-intent');

              SendIntentAndroid.sendPhoneDial('+91 88 2626-7661', false);
            }}>
            <Text
              style={{
                backgroundColor: '#FFF',
                color: '#EF6563',
                borderRadius: moderateScale(8),
                width: scale(280),
                alignSelf: 'center',
                textAlignVertical: 'center',
                textAlign: 'center',
                marginTop: verticalScale(10),
                height: verticalScale(30),
              }}>
              +91-88 2626 7661
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Ubuntu-Bold',
              color: '#FFF',
              marginTop: verticalScale(20),
              marginLeft: scale(40),
            }}>
            Email us @
          </Text>
          <TouchableOpacity
            onPress={() => {
              var SendIntentAndroid = require('react-native-send-intent');

              SendIntentAndroid.sendText({
                title: 'BarterMate Email',
                text: 'info@bartermate.in',
                type: SendIntentAndroid.TEXT_PLAIN,
              });
            }}>
            <Text
              style={{
                backgroundColor: '#FFF',
                color: '#EF6563',
                borderRadius: moderateScale(8),
                width: scale(280),
                alignSelf: 'center',
                textAlignVertical: 'center',
                textAlign: 'center',
                marginTop: verticalScale(10),
                height: verticalScale(30),
              }}>
              info@bartermate.in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SupportScreen;
