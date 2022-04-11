import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const PickupHistoryScreen = ({route, navigation}) => {
  var email = route.params.email;

  //var history = [];

  const [history, setHistory] = useState([]);
  //var history = [];

  const [loading, setLoading] = useState(true);

  const handleOrderHistory = () => {
    var data = JSON.stringify({
      email: `${email}`,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/pickedupHistoy',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response.data.data));
        var temp = JSON.stringify(response.data.data);
        setHistory(JSON.parse(temp));
        //history = JSON.parse(temp);
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert('Something went wrong!');
        console.log(error);
      });
  };

  //handleOrderHistory();

  useEffect(handleOrderHistory, []);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            paddingBottom: verticalScale(30),
          }}>
          {loading == true ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: verticalScale(100),
              }}>
              <ActivityIndicator size={'large'} color="#A363A9" />
            </View>
          ) : (
            history.map(key => (
              <View
                style={{
                  height: verticalScale(83),
                  width: scale(292),
                  backgroundColor: '#FFF',
                  alignSelf: 'center',
                  marginTop: verticalScale(20),
                  borderRadius: moderateScale(10),
                  padding: moderateScale(10),
                  elevation: 6,
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(25),
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  {key.category}
                  {key.subcategory}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginTop: verticalScale(10),
                      fontSize: moderateScale(16),
                    }}>
                    {key.createdDate.substring(0, 10)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Order Details Screen', {
                        orderStatus: `${key.isComplete}`,
                        pickupAddress: `${key.address}`,
                        pincode: `${key.pinCode}`,
                        pickupTime: `${key.createdDate.substring(11, 16)}`,
                      });
                    }}>
                    <View
                      style={{
                        backgroundColor: '#A363A9',
                        borderRadius: moderateScale(6),
                      }}>
                      <Text
                        style={{
                          fontSize: moderateScale(20),
                          color: '#FFF',
                          padding: moderateScale(4),
                        }}>
                        Details
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default PickupHistoryScreen;
