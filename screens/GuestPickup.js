import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import {BottomSheet} from 'react-native-btr';
import DatePicker from 'react-native-date-picker';

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
  Button,
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

  var guestName = 'Guest';

  const [glassPicked, setGlassPicked] = useState(false);
  const [metalPicked, setMetalPicked] = useState(false);
  const [plasticPicked, setPlasticPicked] = useState(false);
  const [paperPicked, setPaperPicked] = useState(false);
  const [electronicsPicked, setElectronicsPicked] = useState(false);
  const [boxPicked, setBoxPicked] = useState(false);
  //const [multiSelect, setMultiselect] = useState([]);
  var multiSelect = [];

  const [open, setOpen] = useState(false);

  const [allPincodes, setAllPincodes] = useState([]);

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
    if (boxPicked) {
      multiSelect.push('Corrugated Box');
    }

    console.log(multiSelect);

    //setMultiselect(newArr);
  };

  const [visible, setVisible] = useState(false);
  function toggle() {
    setVisible(visible => !visible);
  }

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

  const getPincode = async () => {
    const {data} = await axios.get(
      'https://talented-lamb-pleat.cyclic.app/admin/registration-api/pincode',
    );
    setAllPincodes(data.data);
    console.log(allPincodes);
  };

  useEffect(() => {
    getPincode();
  }, []);

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
      pickupDate:
        Platform.OS == 'ios'
          ? `${
              date.getFullYear() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate()
            }`
          : `${dateLabel}`,
      subcategory: multiSelect,
    });

    var config = {
      method: 'post',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/guest',
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
          username: `${guestName}`,
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
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingBottom: verticalScale(80),
          }}>
          <View>
            <Text
              style={{
                backgroundColor: '#EF6563',
                width: scale(40),
                height: verticalScale(40),
                color: '#FFF',
                fontSize: moderateScale(30),
                marginLeft: scale(30),
                fontFamily: 'Ubuntu-Bold',
                textAlign: 'center',
                textAlignVertical: 'center',
                borderRadius: moderateScale(7),
                marginTop: verticalScale(30),
              }}>
              G
            </Text>
            <Text
              style={{
                color: '#5A2D94',
                marginLeft: scale(30),
                marginTop: verticalScale(10),
                fontFamily: 'Ubuntu-Regular',
              }}>
              Hello Guest !
            </Text>
            {/* <Text
              style={{
                marginLeft: scale(30),
                marginTop: verticalScale(10),
                color: '#00000090',
                fontFamily: 'Ubuntu-Regular',
                fontSize: moderateScale(18),
              }}>
              Comfortable Place
            </Text>
            <Text
              style={{
                marginLeft: scale(30),
                marginTop: verticalScale(5),
                color: '#00000080',
                fontFamily: 'Ubuntu-Regular',
                fontSize: moderateScale(18),
              }}>
              Let's Contribute towards recycle!
            </Text> */}
          </View>
          <Text
            style={{
              fontSize: moderateScale(25),
              alignSelf: 'center',
              color: '#5A2D94',
              fontFamily: 'Ubuntu-Bold',
              marginTop: verticalScale(30),
              marginBottom: verticalScale(20),
            }}>
            {tempCategory} Selected!
          </Text>

          <View>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: 'Ubuntu-Regular',
                color: '#5A2D94',
                //borderWidth: 1,
                width: scale(150),
                textAlign: 'center',
                //position: 'absolute',
                //borderColor: '#000',
                backgroundColor: '#FFF',
                alignSelf: 'center',
              }}>
              Add More Categories
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginTop: verticalScale(10),
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: moderateScale(10),
              width: scale(300),
              flexWrap: 'wrap',
              borderWidth: 2,
              borderColor: '#5A2D94',
              justifyContent: 'space-between',
              height:
                Platform.OS == 'ios' ? verticalScale(125) : verticalScale(110),
              paddingTop: verticalScale(12),
              paddingHorizontal: scale(25),
              marginBottom: verticalScale(20),
            }}>
            {tempCategory == 'Glass' ? (
              <></>
            ) : (
              <View
                style={{
                  height:
                    Platform.OS == 'ios'
                      ? verticalScale(35)
                      : verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                  //marginRight: scale(30),
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

            {tempCategory == 'Metal' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height:
                    Platform.OS == 'ios'
                      ? verticalScale(35)
                      : verticalScale(25),
                  width: scale(100),
                  //marginRight: scale(30),
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

            {tempCategory == 'Plastic' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height:
                    Platform.OS == 'ios'
                      ? verticalScale(35)
                      : verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                  //marginRight: scale(30),
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

            {tempCategory == 'Paper' ? (
              <></>
            ) : (
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: '#000',
                  //marginRight: scale(30),
                  height:
                    Platform.OS == 'ios'
                      ? verticalScale(35)
                      : verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                  //marginTop: verticalScale(20),
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

            {tempCategory == 'Electronics' ? (
              <></>
            ) : (
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: '#000',
                  height:
                    Platform.OS == 'ios'
                      ? verticalScale(35)
                      : verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                  //marginTop: verticalScale(20),
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

            {tempCategory == 'Corrugated Box' ? (
              <></>
            ) : (
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: '#000',
                  height:
                    Platform.OS == 'ios'
                      ? verticalScale(35)
                      : verticalScale(25),
                  width: scale(200),
                  flexDirection: 'row',
                  //marginTop: verticalScale(20),
                }}>
                <CheckBox
                  disabled={false}
                  value={boxPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setBoxPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Corrugated box</Text>
              </View>
            )}
          </View>

          <TextInput
            defaultValue={`${name}`}
            onChangeText={tempName => {
              setName(tempName);
            }}
            style={styles.textinput}
            placeholder="Enter Name *"
            placeholderTextColor="#758283"></TextInput>

          <TextInput
            defaultValue={`${email}`}
            onChangeText={tempEmail => {
              setEmail(tempEmail);
            }}
            style={styles.textinput}
            placeholder="Enter Email *"
            placeholderTextColor="#758283"></TextInput>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              //alignSelf: 'center',
              height: verticalScale(50),
              marginLeft: scale(25),
              paddingVertical: moderateScale(5),
              borderBottomColor: '#CAD5E2',
              borderBottomWidth: 1,
              width: scale(280),
              marginTop: verticalScale(10),
            }}>
            <Text
              style={{
                fontSize: moderateScale(12),
                marginTop: verticalScale(14),
                marginBottom: verticalScale(7),
                marginRight: scale(10),
                //smarginLeft: scale(3),
                fontFamily: 'Ubuntu-Regular',
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
                fontSize: moderateScale(12),
                width: scale(300),
                color: '#000000',
                fontFamily: 'Ubuntu-Regular',
              }}
              placeholder="Contact Number *"
              placeholderTextColor="#758283"></TextInput>
          </View>

          <TextInput
            defaultValue={`${address}`}
            onChangeText={tempAddress => {
              setAddress(tempAddress);
            }}
            style={styles.textinput}
            placeholder="Enter Pickup Address *"
            placeholderTextColor="#758283"></TextInput>

          <TextInput
            defaultValue={`${landMark}`}
            onChangeText={tempLandmark => {
              setLandmark(tempLandmark);
            }}
            style={styles.textinput}
            placeholder="Enter Landmark (Optional)"
            placeholderTextColor="#758283"></TextInput>

          {Platform.OS == 'ios' ? (
            <TouchableOpacity onPress={toggle}>
              <View
                style={{
                  borderRadius: moderateScale(10),
                  borderWidth: 1,
                  height: verticalScale(40),
                  width: scale(280),
                  marginTop: verticalScale(15),
                  //marginLeft: scale(15),
                  borderColor: '#5A2D94',
                  alignSelf: 'center',
                  marginBottom: verticalScale(20),
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: verticalScale(8),
                    fontSize: moderateScale(15),
                    fontFamily: 'Ubuntu-Regular',
                    color: '#5A2D94',
                    paddingTop: verticalScale(3),
                    textAlignVertical: 'center',
                  }}>
                  {pincode}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginLeft: scale(20),
                marginRight: scale(20),
                borderColor: '#A363A9',

                marginHorizontal: moderateScale(10),
                marginTop: verticalScale(10),
              }}>
              <Picker
                style={{
                  color: '#5A2D94',
                }}
                dropdownIconColor="#5A2D94"
                dropdownIconRippleColor="#5A2D94"
                onTouchCancel={true}
                mode="dropdown"
                selectedValue={pincode}
                onValueChange={itemValue => {
                  setPincode(itemValue);
                }}>
                <Picker.Item label="Choose Pincode" value="Choose Pincode" />
                {allPincodes.map(key => (
                  <Picker.Item label={key} value={key} />
                ))}
              </Picker>
            </View>
          )}

          <BottomSheet
            visible={visible}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}>
            <View
              style={{
                backgroundColor: '#FFF',
                paddingVertical: verticalScale(20),
                height: verticalScale(300),
                marginHorizontal: scale(20),
                borderRadius: moderateScale(10),
                //marginBottom: verticalScale(50),
              }}>
              <ScrollView>
                {allPincodes.map(key => (
                  <TouchableOpacity
                    onPress={() => {
                      setPincode(key);
                      toggle();
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: moderateScale(20),
                        fontFamily: 'Ubuntu-Regular',
                        marginTop: verticalScale(10),
                        borderWidth: 1,
                        width: scale(270),
                        textAlign: 'center',
                        color: '#5A2D94',
                        borderColor: '#5A2D94',
                        borderRadius: moderateScale(5),
                        //paddingHorizontal: scale(25),
                        paddingVertical: verticalScale(5),
                      }}>
                      {key}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </BottomSheet>

          {Platform.OS == 'ios' ? (
            <>
              <Button title={dateLabel} onPress={() => setOpen(true)} />
              <DatePicker
                modal
                open={open}
                date={date}
                minimumDate={date}
                onConfirm={date => {
                  setDateLabel(
                    date.getFullYear() +
                      '-' +
                      (date.getMonth() + 1) +
                      '-' +
                      date.getDate(),
                  );
                  setOpen(false);
                  setDate(date);
                  console.log(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          ) : (
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
                        color: '#5A2D94',
                        fontFamily: 'Ubuntu-Regular',
                      }}>
                      {`${dateLabel}`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

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
                  if (name.length == 0) {
                    Alert.alert('Enter Valid Name');
                  } else if (email.length == 0) {
                    Alert.alert('Enter Valid Email');
                  } else if (phoneCheck() == false) {
                    Alert.alert('Enter Valid Phone Number');
                  } else if (address.length == 0) {
                    Alert.alert('Enter Valid Address');
                  } else if (pincode == 'Choose Pincode') {
                    Alert.alert('Choose Pincode');
                  } else if (
                    dateLabel == 'Pick A Date' ||
                    dateLabel == 'NaN-NaN-NaN'
                  ) {
                    Alert.alert('Pick A Valid Date');
                  } else {
                    handlePickeup();
                  }
                }}>
                <View
                  style={{
                    borderRadius: moderateScale(10),
                    height: verticalScale(45),
                    backgroundColor: '#000',
                    alignSelf: 'center',
                    marginTop: verticalScale(10),
                    width: scale(220),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      alignSelf: 'center',
                      color: '#FFFFFF',
                      margin: moderateScale(5),
                      paddingTop: verticalScale(9),
                      fontFamily: 'Ubuntu-Regular',
                      //paddingBottom: verticalScale(15),
                    }}>
                    Send Pickup Request
                  </Text>
                </View>
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
        </View>
      </ScrollView>
    </>
  );
};

export default GuestPickupScreen;

const styles = StyleSheet.create({
  textinput: {
    alignSelf: 'center',
    fontSize: moderateScale(12),
    borderBottomColor: '#CAD5E2',
    borderBottomWidth: 1,
    marginTop: verticalScale(10),
    marginRight: scale(20),
    color: '#000000',
    fontFamily: 'Ubuntu-Regular',
    height: verticalScale(50),
    width: scale(280),
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
    fontSize: moderateScale(13),
    paddingTop: verticalScale(5),
    color: '#000000',
    fontFamily: 'Ubuntu-Regular',
    marginLeft: scale(10),
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
