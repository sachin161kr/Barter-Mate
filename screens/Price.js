import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

const PriceScreen = () => {
  const [pincode, setPincode] = useState('Choose Pincode');
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const [prices, setPrices] = useState([]);

  const handlePriceDetails = () => {
    setLoading(true);
    var data = JSON.stringify({
      pincode: `${pincode}`,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/listAllRatebyPincode',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setFetch(true);
        console.log(JSON.stringify(response.data.data));
        var temp = JSON.stringify(response.data.data);
        setPrices(JSON.parse(temp));
      })
      .catch(function (error) {
        setLoading(false);
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
        <View
          style={{
            marginLeft: scale(20),
            marginRight: scale(20),
            borderColor: '#A363A9',
            borderWidth: 1,
            borderRadius: moderateScale(100),
            marginHorizontal: moderateScale(10),
            marginTop: verticalScale(30),
          }}>
          <Picker
            style={{
              color: '#A363A9',
            }}
            dropdownIconColor="#A363A9"
            dropdownIconRippleColor="#A363A9"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={pincode}
            onValueChange={itemValue => {
              setPincode(itemValue);
            }}>
            <Picker.Item label="Choose Pincode" value="Choose Pincode" />
            <Picker.Item label="201301" value="201301" />
            <Picker.Item label="201304" value="201304" />
          </Picker>
        </View>
        {loading == false ? (
          <TouchableOpacity
            onPress={() => {
              if (pincode != 'Choose Pincode') {
                handlePriceDetails();
              }
            }}>
            <LinearGradient
              colors={['#A363A9', '#FAB06D']}
              style={{
                borderRadius: moderateScale(100),
                marginTop: verticalScale(15),
                marginLeft: scale(15),
                height: verticalScale(45),
                marginRight: scale(15),
                marginBottom: verticalScale(30),
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: moderateScale(5),
                  paddingTop: verticalScale(3),
                  //paddingBottom: verticalScale(15),
                }}>
                Get Price Details
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            size={'large'}
            color="#A363A9"
            style={{
              alignSelf: 'center',
              marginTop: verticalScale(10),
            }}
          />
        )}
        {fetch == true ? (
          <View
            style={{
              alignSelf: 'center',
              borderRadius: moderateScale(6),
              backgroundColor: '#FFF',
              elevation: 5,
              width: scale(300),
              borderRadius: moderateScale(20),
              padding: moderateScale(10),
              marginTop: verticalScale(20),
            }}>
            <View>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: 'bold',
                  marginBottom: verticalScale(10),
                  color: '#E03B8B',
                }}>
                Current Prices at Selected Pincode
              </Text>
              {prices.map(key => (
                <Text style={styles.text}>
                  {key.category} : Rs. {key.value}
                </Text>
              ))}
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default PriceScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
    fontWeight: 'bold',
    color: '#8D3DAF',
  },
});
