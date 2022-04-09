import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
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
  const [images, setImages] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('https://bartermateapi.herokuapp.com/admin/registration-api/image')
        .then(res => {
          setLoading(false);
          setImages(res.data.data.image);
        });
    } catch (err) {
      setLoading(false);
    }
  }, []);

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
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingBottom: verticalScale(80),
          }}>
          <ScrollView
            horizontal={true}
            style={{
              height: verticalScale(240),
            }}>
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              {images.map(item => (
                <View
                  style={{
                    height: verticalScale(240),
                    width: scale(360),
                    borderRadius: moderateScale(10),
                    marginBottom: verticalScale(20),
                  }}>
                  <Image
                    source={{
                      uri: `${item.image}`,
                    }}
                    style={{
                      resizeMode: 'stretch',
                      height: verticalScale(240),
                      width: scale(320),
                      borderRadius: moderateScale(10),
                      marginLeft: verticalScale(15),
                    }}
                  />
                </View>
              ))}
            </View>
          </ScrollView>

          <View
            style={{
              marginLeft: scale(20),
              marginRight: scale(20),
              borderColor: '#A363A9',
              borderWidth: 1,
              marginTop: verticalScale(20),
              borderRadius: moderateScale(100),
              marginHorizontal: moderateScale(10),
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
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  borderRadius: moderateScale(100),
                  marginTop: verticalScale(15),
                  marginLeft: scale(15),
                  height: verticalScale(45),
                  marginRight: scale(15),
                  marginBottom: verticalScale(30),
                }}>
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
                marginLeft: verticalScale(25),
                padding: moderateScale(10),
                marginTop: verticalScale(20),
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: 'bold',
                      marginBottom: verticalScale(10),
                      color: '#E03B8B',
                    }}>
                    Category Name
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: 'bold',
                      marginBottom: verticalScale(10),
                      color: '#E03B8B',
                      marginLeft: verticalScale(96),
                    }}>
                    Price
                  </Text>
                </View>
                {prices.map(key => (
                  <Text style={styles.text}>
                    {key.category} : ₹{key.value}
                  </Text>
                ))}
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default PriceScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(16),
    backgroundColor: '#FFF',
    elevation: 5,
    marginBottom: verticalScale(10),
    height: verticalScale(30),
    paddingLeft: verticalScale(5),
    paddingTop: verticalScale(5),
    width: scale(270),
    marginTop: verticalScale(5),
    fontWeight: 'bold',
    color: '#8D3DAF',
  },
});
