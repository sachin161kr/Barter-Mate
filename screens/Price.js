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

  const arrow = '=>';

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
              height: verticalScale(280),
            }}>
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              {images.map(item => (
                <View
                  style={{
                    height: verticalScale(280),
                    width: scale(360),
                    borderRadius: moderateScale(10),
                    marginBottom: verticalScale(20),
                  }}>
                  <Image
                    source={{
                      uri: `${item.image}`,
                    }}
                    style={{
                      resizeMode: 'contain',
                      height: verticalScale(280),
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
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderRadius: moderateScale(20),
                borderWidth: 1,
                height: verticalScale(50),
                width: scale(260),
                marginTop: verticalScale(15),
                marginLeft: scale(15),
                borderColor: '#9b38d9',
              }}>
              <Picker
                style={{
                  color: '#A363A9',
                  width: scale(260),
                  height: verticalScale(50),
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
                <View
                  style={{
                    borderRadius: moderateScale(15),
                    marginTop: verticalScale(17),
                    marginLeft: scale(10),
                    height: verticalScale(45),
                    width: scale(50),
                    backgroundColor: '#EF6563',
                    marginBottom: verticalScale(10),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      alignSelf: 'center',
                      color: '#FFF',
                      margin: moderateScale(5),
                      paddingTop: verticalScale(8),
                      fontFamily: 'Ubuntu-Regular',
                      //paddingBottom: verticalScale(15),
                    }}>
                    GO
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator
                size={'large'}
                color="#A363A9"
                style={{
                  alignSelf: 'center',
                  marginTop: verticalScale(10),
                  marginLeft: scale(15),
                }}
              />
            )}
          </View>

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
                      fontFamily: 'Ubuntu-Bold',
                      marginBottom: verticalScale(10),
                      color: '#E03B8B',
                    }}>
                    Category Name
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      marginBottom: verticalScale(30),
                      color: '#E03B8B',
                      marginLeft: verticalScale(110),
                      fontFamily: 'Ubuntu-Bold',
                    }}>
                    Price
                  </Text>
                </View>
                {prices.map(key => (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#FFF',
                      }}>
                      <Text
                        style={{
                          color: '#8D3DAF',
                          width: scale(205),
                          marginBottom: verticalScale(10),
                          fontFamily: 'Ubuntu-Regular',
                        }}>
                        {key.category}
                      </Text>
                      <Text
                        style={{
                          color: '#8D3DAF',
                          fontFamily: 'Ubuntu-Regular',
                        }}>
                        ₹ {key.value}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: verticalScale(1),
                        width: scale(280),
                        backgroundColor: '#CAD5E280',
                        marginBottom: verticalScale(10),
                      }}
                    />
                    <View
                      style={{
                        height: verticalScale(1),
                        width: scale(280),
                        backgroundColor: '#CAD5E280',
                        marginBottom: verticalScale(15),
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <>
              <View
                style={{
                  height: verticalScale(60),
                  backgroundColor: '#FFF',
                }}
              />
            </>
          )}
          <View
            style={{
              marginLeft: scale(20),
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Ubuntu-Regular',
              }}>
              + Price is showing for selected Pincode*
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Ubuntu-Regular',
              }}>
              + All prices are according to 1kg weight.
            </Text>
          </View>
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
