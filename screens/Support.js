import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import query from '../assets/query.png';
import Clipboard from '@react-native-clipboard/clipboard';

const SupportScreen = () => {
  //const [copiedText, setCopiedText] = useState('');
  var copiedText = '';

  const copyToClipboard = () => {
    Clipboard.setString(`${copiedText}`);
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  // };

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
              if (Platform.OS == 'android') {
                var SendIntentAndroid = require('react-native-send-intent');

                SendIntentAndroid.sendPhoneDial('+91 88 2626-7661', false);
              } else {
                Alert.alert('Mobile No. copied');
                //setCopiedText('+91 88 2626-7661');
                copiedText = '+91 88 2626-7661';
                copyToClipboard();
                //fetchCopiedText();
              }
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
                paddingTop:
                  Platform.OS == 'ios' ? verticalScale(8) : verticalScale(0),
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
              if (Platform.OS == 'android') {
                var SendIntentAndroid = require('react-native-send-intent');

                SendIntentAndroid.sendText({
                  title: 'BarterMate Email',
                  text: 'info@bartermate.in',
                  type: SendIntentAndroid.TEXT_PLAIN,
                });
              } else {
                Alert.alert('Email copied');
                copiedText = 'info@bartermate.in';
                copyToClipboard();
                //fetchCopiedText();
              }
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
                paddingTop:
                  Platform.OS == 'ios' ? verticalScale(8) : verticalScale(0),
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
