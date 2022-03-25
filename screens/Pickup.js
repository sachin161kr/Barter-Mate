import React, {Component, useEffect, useMemo, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import calender from '../assets/calender.png';
import pickup from '../assets/pickup.png';

const PickupScreen = ({route, navigation}) => {
  var name = route.params.name;

  var userId = route.params.userId;

  var email = route.params.email;
  var phone = route.params.phone;
  var tempLandmark = route.params.landmark;
  var tempPincode = route.params.pincode;

  var loadAgain = route.params.loadAgain;

  var tempCategory = route.params.itemSelected;
  //var tempSubCategory = route.params.subCategory;
  //var tempAddress = route.params.address;

  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('Choose Pincode');
  //const [address, setAddress] = useState(`${tempAddress}`);
  const [category, setCategory] = useState(`${tempCategory}`);
  //const [subCategory, setSubCategory] = useState(`${tempSubCategory}`);

  const [isLoading, setLoading] = useState(false);

  const [addressLoading, setAddressLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [dateLabel, setDateLabel] = useState('Pick A Date');

  const [myAddresses, setMyaddresses] = useState([]);

  const [currentAddress, setCurrentAddress] = useState('Choose Pickup Address');

  const [glassPicked, setGlassPicked] = useState(false);
  const [metalPicked, setMetalPicked] = useState(false);
  const [plasticPicked, setPlasticPicked] = useState(false);
  const [paperPicked, setPaperPicked] = useState(false);
  const [electronicsPicked, setElectronicsPicked] = useState(false);

  //const [multiSelect, setMultiselect] = useState([]);

  var multiSelect = [];

  const addToList = () => {
    //let newArr = [...multiSelect];
    if (glassPicked) {
      //newArr.push('Glass');
      multiSelect.push('Glass');
    }
    if (metalPicked) {
      //newArr.push('Metal');
      multiSelect.push('Metal');
    }
    if (plasticPicked) {
      //newArr.push('Plastic');
      multiSelect.push('Plastic');
    }
    if (paperPicked) {
      //newArr.push('Paper');
      multiSelect.push('Paper');
    }
    if (electronicsPicked) {
      //newArr.push('Electronics');
      multiSelect.push('Electronics');
    }

    console.log(multiSelect);

    //setMultiselect(newArr);
  };

  //var multiSelect = [];

  // const removeFromList = element => {
  //   let newArr = [...multiSelect];
  //   var index = newArr.indexOf(element);
  //   newArr.splice(index, 1);
  //   console.log(newArr);
  //   setMultiselect(newArr);
  // };

  //console.log(loadAgain);

  const handleShowAddress = () => {
    setAddressLoading(true);
    var data = JSON.stringify({
      userId: `${userId}`,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/listAddAddress',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setAddressLoading(false);
        //console.log(JSON.stringify(response.data.data));
        var temp = JSON.stringify(response.data.data);
        setMyaddresses(JSON.parse(temp));
      })
      .catch(function (error) {
        console.log(error);
        setAddressLoading(false);
        Alert.alert('Something Went Wrong');
      });
  };

  console.log(loadAgain, 'Pickup');

  useEffect(() => {
    handleShowAddress();
  }, [loadAgain]);

  //handleShowAddress();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    //setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();

    console.log(fDate);
    setDateLabel(fDate);
  };

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

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  const handlePickeup = () => {
    addToList();
    setLoading(true);

    var data = JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
      address: `${currentAddress}`,
      landMark: `${landmark}`,
      pinCode: `${pincode}`,
      category: `${category}`,
      pickupDate: `${dateLabel}`,
      subcategory: multiSelect,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/addPickup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        setLoading(false);
        //Alert.alert('We will send our representatives soon. Thank You');
        navigation.navigate('Redeem Screen', {
          userId: userId,
        });
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Sorry, Something Went Wrong');
        setLoading(false);
      });
  };

  return addressLoading == true ? (
    <>
      <ActivityIndicator
        color={'#A363A9'}
        size={'large'}
        style={{
          marginTop: verticalScale(30),
        }}
      />
    </>
  ) : (
    <>
      <ScrollView
        style={{
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            height: verticalScale(200),
            width: scale(250),
            alignSelf: 'center',
            marginTop: verticalScale(12),
          }}>
          <Image
            style={{
              height: 200,
              width: 300,
              alignSelf: 'center',
            }}
            source={pickup}
          />
        </View>

        <Text
          style={{
            fontSize: moderateScale(25),
            alignSelf: 'center',
            color: '#000000',
            fontWeight: '600',
            marginBottom: verticalScale(20),
          }}>
          {tempCategory} Picked!
        </Text>

        <Text
          style={{
            fontSize: moderateScale(20),
            fontWeight: '300',
            color: '#A363A9',
            marginLeft: scale(25),
          }}>
          Add More Categories
        </Text>

        <View
          style={{
            alignSelf: 'center',
            marginTop: verticalScale(10),
            backgroundColor: '#FFF',
            flexDirection: 'row',
            elevation: 5,
            borderRadius: moderateScale(10),
            width: scale(300),
            flexWrap: 'wrap',
            height: verticalScale(60),
            paddingTop: verticalScale(5),
            paddingLeft: scale(45),
            marginBottom: verticalScale(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {tempCategory == 'Glass' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                }}>
                <CheckBox
                  disabled={false}
                  value={glassPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setGlassPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Glass</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            {tempCategory == 'Metal' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                }}>
                <CheckBox
                  disabled={false}
                  value={metalPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setMetalPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Metal</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            {tempCategory == 'Plastic' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                }}>
                <CheckBox
                  disabled={false}
                  value={plasticPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setPlasticPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Plastic</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            {tempCategory == 'Paper' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                }}>
                <CheckBox
                  disabled={false}
                  value={paperPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setPaperPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Paper</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            {tempCategory == 'Electronics' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                }}>
                <CheckBox
                  disabled={false}
                  value={electronicsPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setElectronicsPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Electronics</Text>
              </View>
            )}
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            minimumDate={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.pickerStyle}>
          <Picker
            style={{
              color: '#A363A9',
            }}
            dropdownIconColor="#A363A9"
            dropdownIconRippleColor="#A363A9"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={currentAddress}
            onValueChange={itemValue => {
              setCurrentAddress(itemValue);
            }}>
            <Picker.Item
              label="Choose Pickup Address"
              value="Choose Pickup Address"
            />
            {myAddresses.map(key => (
              <Picker.Item
                label={key.tags + ' , ' + key.address1}
                value={key.tags + ' , ' + key.address1}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Address Screen', {
              userId: `${userId}`,
              email: `${email}`,
              phone: `${phone}`,
              landMark: `${tempLandmark}`,
              loadAgain: `${loadAgain}`,
              itemSelected: `${tempCategory}`,
              name: `${name}`,
              pincode: `${pincode}`,
            });
          }}>
          <View
            style={{
              marginLeft: scale(20),
              height: verticalScale(45),
              marginRight: scale(20),
              borderColor: '#A363A9',
              borderWidth: 1,
              borderRadius: moderateScale(100),
              marginHorizontal: moderateScale(10),
              marginTop: verticalScale(10),
              paddingTop: verticalScale(5),
            }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                paddingTop: verticalScale(5),
                textAlign: 'center',
                color: '#A363A9',
              }}>
              Add New Address
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginLeft: scale(20),
            marginRight: scale(20),
            borderColor: '#A363A9',
            borderWidth: 1,
            borderRadius: moderateScale(100),
            marginHorizontal: moderateScale(10),
            marginTop: verticalScale(10),
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: scale(10),
          }}>
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: verticalScale(50),
                borderRadius: moderateScale(100),
                marginTop: verticalScale(10),
                alignSelf: 'center',
                //borderWidth: 1,
                borderColor: '#000',
                width: scale(180),
              }}>
              <Image
                source={calender}
                style={{
                  height: verticalScale(50),
                  width: scale(50),
                  resizeMode: 'contain',
                  marginLeft: scale(20),
                  //marginTop: verticalScale(15),
                }}
              />

              <View
                style={{
                  marginLeft: scale(15),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    textAlign: 'center',
                    color: '#000',
                  }}>
                  {`${dateLabel}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {isLoading == false ? (
          <View style={styles.pickupBtn}>
            <TouchableOpacity
              onPress={() => {
                //addToList();
                if (
                  currentAddress != 'Choose Pickup Address' &&
                  dateLabel != 'Pick A Date' &&
                  pincode != 'Choose Pincode'
                ) {
                  handlePickeup();
                } else {
                  Alert.alert('Enter Valid Details');
                }
              }}>
              <LinearGradient
                colors={['#A363A9', '#FAB06D']}
                style={{
                  borderRadius: moderateScale(100),
                  height: verticalScale(45),
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    fontSize: moderateScale(20),
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: moderateScale(5),
                    height: verticalScale(45),
                    paddingTop: verticalScale(4),
                    //paddingBottom: verticalScale(15),
                  }}>
                  Send Pickup Request
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator
            color="#A363A9"
            size={'large'}
            style={{
              marginTop: verticalScale(30),
            }}
          />
        )}

        <View>
          <TouchableOpacity
            onPress={() => {
              setUser();
              navigation.navigate('Category Screen');
              Alert.alert('You are logged out!');
            }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                textAlign: 'center',
                marginTop: verticalScale(10),
                color: '#A363A9',
                paddingBottom: verticalScale(20),
                alignSelf: 'center',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    height: verticalScale(45),
    borderColor: '#A363A9',
    borderRadius: moderateScale(100),
    paddingLeft: moderateScale(15),
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginRight: scale(20),
    color: '#000000',
  },

  pickupBtn: {
    marginTop: verticalScale(20),

    marginLeft: scale(15),
    marginRight: scale(15),
    borderRadius: moderateScale(100),
    padding: moderateScale(6),
  },

  pickerStyle: {
    marginLeft: scale(20),
    height: verticalScale(45),
    marginTop: verticalScale(10),
    borderColor: '#A363A9',
    marginRight: scale(20),
    borderRadius: moderateScale(100),
    borderWidth: 1,
  },
  multiSelectView: {
    height: verticalScale(15),
    width: scale(15),
    borderWidth: 1,
    borderRadius: moderateScale(3),
    borderColor: '#000',
    backgroundColor: '#FFF',
    marginTop: verticalScale(4),
    marginRight: scale(5),
  },
  multiSelectText: {
    fontSize: moderateScale(16),
    paddingTop: verticalScale(3),
  },
});
