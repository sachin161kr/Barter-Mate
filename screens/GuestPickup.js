import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

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
  Platform,
} from 'react-native';

import calender from '../assets/calender.png';
import pickup from '../assets/pickup.png';

const GuestPickupScreen = ({route, navigation}) => {
  var tempCategory = route.params.itemSelected;

  var userId = route.params.userId;

  const [category, setCategory] = useState(`${route.params.itemSelected}`);
  const [subCategory, setSubCategory] = useState(`${route.params.subCategory}`);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [landMark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('Choose Pincode');
  const [name, setName] = useState('');

  const [address, setAddress] = useState(``);

  const [isLoading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  var glassSelected = false;
  var metalSelected = false;
  var plasticSelected = false;
  var paperSelected = false;
  var electronicsSelected = false;

  const [glassPicked, setGlassPicked] = useState(false);
  const [metalPicked, setMetalPicked] = useState(false);
  const [plasticPicked, setPlasticPicked] = useState(false);
  const [paperPicked, setPaperPicked] = useState(false);
  const [electronicsPicked, setElectronicsPicked] = useState(false);
  //const [multiSelect, setMultiselect] = useState([]);
  var multiSelect = [];

  const [dateLabel, setDateLabel] = useState('Pick A Date');

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

  const emailCheck = () => {
    if (
      email.includes('@gmail.com') ||
      email.includes('@yahoo.com') ||
      email.includes('@rediff.com') ||
      email.includes('@hotmail.com') ||
      email.includes('.co.in')
    ) {
      return true;
    }

    return false;
  };

  const phoneCheck = () => {
    var num = parseInt(phone, 10);
    var tempNum = num.toString(10);
    if (phone.length == 10 && phone.length === tempNum.length) {
      return true;
    } else {
      Alert.alert('Enter Valid Phone Number');
      return false;
    }
  };

  const handlePickeup = () => {
    addToList();
    setLoading(true);

    var data = JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
      address: `${address}`,
      landMark: `${landMark}`,
      pinCode: `${pincode}`,
      category: `${category}`,
      pickupDate: `${dateLabel}`,
      subcategory: multiSelect,
    });

    var config = {
      method: 'post',
      url: 'https://bartermateapi.herokuapp.com/admin/registration-api/guest',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        //Alert.alert('We will send our representatives soon. Thank You');
        navigation.navigate('Redeem Screen', {
          userId: `${userId}`,
        });
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Sorry, Something Went Wrong');
        setLoading(false);
      });
  };

  return (
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

        {/* <View style={styles.pickerStyle}>
          <Picker
            style={{
              color: '#A363A9',
            }}
            dropdownIconColor="#A363A9"
            dropdownIconRippleColor="#A363A9"
            onTouchCancel={true}
            mode="dropdown"
            selectedValue={category}
            onValueChange={itemValue => {
              setCategory(itemValue);
              setSubCategory('Choose Sub-Category');
            }}>
            <Picker.Item label="Glass" value="Glass" />
            <Picker.Item label="Metal" value="Metal" />
            <Picker.Item label="Plastic" value="Plastic" />
            <Picker.Item label="Paper" value="Paper" />
            <Picker.Item label="Electronics" value="Electronics" />
          </Picker>
        </View> */}

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
          <TouchableOpacity
            onPress={() => {
              if (glassSelected == false) {
                addToList('Glass');
                setGlassPicked(true);
              }
              // else {
              //   removeFromList('Glass');
              // }
              //multiSelect.push('Glass');
              //setGlass(!glassSelected);
              //glassSelected = !glassSelected;
              //setGlassPicked(!glassPicked);
              //console.log(multiSelect);
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (metalSelected == false) {
                addToList('Metal');
                setMetalPicked(true);
              }
              // else {
              //   removeFromList('Metal');
              // }
              //multiSelect.push('Metal');
              // setMetal(!metalSelected);
              // metalSelected = !metalSelected;
              // setMetalPicked(!metalPicked);
              //console.log(multiSelect);
            }}>
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (plasticSelected == false) {
                addToList('Plastic');
                setPlasticPicked(true);
              }
              //  else {
              //   removeFromList('Plastic');
              // }
              // plasticSelected = !plasticSelected;
              // setPlasticPicked(!plasticPicked);
              //console.log(multiSelect);
            }}>
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (paperSelected == false) {
                addToList('Paper');
                setPaperPicked(true);
              }
              // else {
              //   removeFromList('Paper');
              // }
              // paperSelected = !paperSelected;
              // setPaperPicked(!paperPicked);
              //console.log(multiSelect);
            }}>
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (electronicsSelected == false) {
                addToList('Electronics');
                setElectronicsPicked(true);
              }
              // else {
              //   removeFromList('Electronics');
              // }
              // electronicsSelected = !electronicsSelected;
              // setElectronicsPicked(!electronicsPicked);
              //console.log(multiSelect);
            }}>
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
          </TouchableOpacity>
        </View>

        <TextInput
          defaultValue={`${name}`}
          onChangeText={tempName => {
            setName(tempName);
          }}
          style={styles.textinput}
          placeholder="Enter Name"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          defaultValue={`${email}`}
          onChangeText={tempEmail => {
            setEmail(tempEmail);
          }}
          style={styles.textinput}
          placeholder="Enter Email"
          placeholderTextColor="#758283"></TextInput>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            borderColor: '#758283',
            borderRadius: moderateScale(100),
            borderWidth: 1,
            padding: moderateScale(5),

            width: scale(310),
            marginTop: verticalScale(10),
          }}>
          <Text
            style={{
              fontSize: moderateScale(20),
              marginTop: verticalScale(8),
              marginRight: scale(10),
              marginLeft: scale(3),
              color: '#758283',
            }}>
            +91
          </Text>
          <TextInput
            defaultValue={`${phone}`}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={tempPhone => {
              setPhone(tempPhone);
            }}
            style={{
              fontSize: moderateScale(20),

              color: '#000000',
            }}
            placeholder="Enter Phone Number"
            placeholderTextColor="#758283"></TextInput>
        </View>

        <TextInput
          defaultValue={`${address}`}
          onChangeText={tempAddress => {
            setAddress(tempAddress);
          }}
          style={styles.textinput}
          placeholder="Enter Pickup Address"
          placeholderTextColor="#758283"></TextInput>

        <TextInput
          defaultValue={`${landMark}`}
          onChangeText={tempLandmark => {
            setLandmark(tempLandmark);
          }}
          style={styles.textinput}
          placeholder="Enter Landmark"
          placeholderTextColor="#758283"></TextInput>

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

        {isLoading == false ? (
          <View style={styles.pickupBtn}>
            <TouchableOpacity
              onPress={() => {
                if (
                  name &&
                  email &&
                  phone &&
                  address &&
                  dateLabel != 'Pick A Date'
                ) {
                  if (phoneCheck()) {
                    if (pincode != 'Choose Pincode') {
                      handlePickeup();
                    } else {
                      Alert.alert('Choose Pincode');
                    }
                  }
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
                    paddingTop: verticalScale(3),

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
              marginTop: verticalScale(10),
            }}
          />
        )}
      </ScrollView>
    </>
  );
};

export default GuestPickupScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    borderColor: '#758283',
    borderRadius: moderateScale(100),
    padding: moderateScale(15),
    borderWidth: 1,
    height: verticalScale(45),
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginRight: scale(20),
    color: '#000000',
  },

  pickupBtn: {
    marginTop: verticalScale(5),
    marginLeft: scale(15),
    marginRight: scale(15),
    padding: moderateScale(6),
    marginBottom: verticalScale(30),
    borderRadius: moderateScale(100),
  },

  multiSelectText: {
    fontSize: moderateScale(16),
    paddingTop: verticalScale(3),
  },

  pickerStyle: {
    marginLeft: scale(20),
    marginRight: scale(20),
    borderColor: '#A363A9',
    borderWidth: 1,
    borderRadius: moderateScale(100),
    margin: moderateScale(10),
  },
});
