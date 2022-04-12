import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FloatingAction} from 'react-native-floating-action';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {FAB} from 'react-native-elements';
import {startUpdateFlow} from '@gurukumparan/react-native-android-inapp-updates';

import {
  Text,
  StyleSheet,
  View,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {BottomSheet} from 'react-native-btr';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import glassBottle from '../assets/glassBottle.png';
import plasticIcon from '../assets/plasticIcon.png';
import metalIcon from '../assets/metalIcon.png';
import paperIcon from '../assets/paperIcon.png';
import electronicIcon from '../assets/electronicIcon.png';
import question from '../assets/question.png';
import ProfileScreen from './Profile';
import profileIcon from '../assets/profileIcon.png';
import logo from '../assets/logo2.png';

import box from '../assets/box.png';

const categoryList = [
  {
    key: 0,
    image: glassBottle,
    text: 'Glass',
    description:
      'Glass is found in municipal solid waste (MSW), primarily in the form of containers such as beer and soft drink bottles; wine and liquor bottles, etc.',
  },

  {
    key: 1,
    image: metalIcon,
    text: 'Metal',
    description:
      'Since the industrial revolution period has taken place, our consumption levels skyrocketed due to the mass production of goods and the resulting low unit price.',
  },

  {
    key: 2,
    image: plasticIcon,
    text: 'Plastic',
    description:
      'Plastic waste is the accumulation of plastic objects in the Earth’s environment that adversely affects wildlife, wildlife habitat, and humans.',
  },

  {
    key: 3,
    image: paperIcon,
    text: 'Paper',
    description:
      'Post-consumer waste is material discarded after consumer use, such as old magazines, and newspapers. Paper suitable for recycling is called "scrap paper".',
  },

  {
    key: 4,
    image: electronicIcon,
    text: 'Electronics',
    description:
      'E-waste is electronic products that are unwanted and nearing or at the end of their “useful life.” Computers, televisions, VCRs, stereos, etc',
  },

  {
    key: 5,
    image: box,
    text: 'Corrugated Box',
    description:
      'Corrugated box design is the process of matching design factors for corrugated fiberboard boxes with the functional physical, processing and end-use requirements.',
  },
];

const CategoryScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState([]);
  const updateModes = 'flexible';
  //var images = [];

  const update = async () => {
    try {
      const result = await startUpdateFlow(updateModes);
    } catch (e) {
      console.log('error:', e);
    }
  };

  //update();

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

  const [visible, setVisible] = useState(false);
  function toggle() {
    setVisible(visible => !visible);
  }

  const [description, setDescription] = useState('');
  const [itemSelected, setItem] = useState('');
  const [subCategory, setSubCategory] = useState('Choose Sub-Category');

  const [loginStatus, setLogin] = useState('');
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  var userId = '';

  const getUser = async () => {
    var tempLoginStatus = await AsyncStorage.getItem('loginStatus');
    var tempUsername = await AsyncStorage.getItem('User');
    var tempAddress = await AsyncStorage.getItem('address');
    var tempEmail = await AsyncStorage.getItem('email');
    var tempPhone = await AsyncStorage.getItem('phone');
    var tempLandmark = await AsyncStorage.getItem('landmark');
    var tempPincode = await AsyncStorage.getItem('pincode');

    userId = await AsyncStorage.getItem('userId');

    setLogin(tempLoginStatus);
    setName(tempUsername);
    setAddress(tempAddress);
    setEmail(tempEmail);
    setPhone(tempPhone);
    setLandmark(tempLandmark);
    setPincode(tempPincode);
  };

  getUser();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image
                source={logo}
                style={{
                  height: verticalScale(75),
                  width: scale(80),
                  //marginLeft: scale(10),
                }}
              />
              <Text
                style={{
                  fontSize: moderateScale(25),
                  marginTop: verticalScale(19),
                  marginLeft: scale(20),
                  color: '#5A2D94',
                  fontWeight: '700',
                }}>
                BarterMate
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  var tempLoginStatus = await AsyncStorage.getItem(
                    'loginStatus',
                  );

                  var tempUsername = await AsyncStorage.getItem('User');

                  if (tempLoginStatus == 'true') {
                    navigation.navigate('Profile Screen', {
                      username: `${tempUsername}`,
                    });
                  } else {
                    navigation.navigate('Login Screen', {
                      itemSelected: `${itemSelected}`,
                      subCategory: `${subCategory}`,
                      // location: 'Profile',
                      profile: 'true',
                    });
                  }
                }}>
                <Image
                  source={profileIcon}
                  style={{
                    height: verticalScale(45),
                    width: scale(45),
                    marginTop: verticalScale(15),
                    marginLeft: scale(40),
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        );
      },
    });
  }, [navigation]);

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  const action = [
    {
      text: 'Price Details',
      position: 1,
      name: 'bt_price',
      color: '#FFFFFF',
    },
  ];

  return (
    <>
      <StatusBar backgroundColor="#A363A9" />
      <ScrollView>
        <View style={styles.container}>
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
              height: verticalScale(40),
              marginLeft: scale(25),
            }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                marginTop: verticalScale(10),
                //marginLeft: scale(30),
                //fontWeight: 'bold',
                color: '#5A2D94',
              }}>
              Choose Your Category
            </Text>
          </View>
          <View style={styles.gridContainer}>
            {categoryList.map(key => (
              <TouchableOpacity
                key={key.key}
                onPress={async () => {
                  var tempLoginStatus = await AsyncStorage.getItem(
                    'loginStatus',
                  );
                  if (tempLoginStatus == 'false') {
                    setItem(key.text);
                    setDescription(key.description);
                    toggle();
                    setSubCategory('Choose Sub-Category');
                  } else if (tempLoginStatus == 'true') {
                    navigation.navigate('Pickup Screen', {
                      name: `${username}`,
                      itemSelected: `${itemSelected}`,
                      subCategory: `${subCategory}`,
                      address: `${address}`,
                      email: `${email}`,
                      phone: `${phone}`,
                      landmark: `${landmark}`,
                      pincode: `${pincode}`,
                      userId: `${userId}`,
                      loadAgain: `${false}`,
                    });
                  }
                }}>
                <LinearGradient
                  colors={['#9b38d9', '#f2748e']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{
                    borderRadius: moderateScale(15),
                    flexDirection: 'row',
                    height: verticalScale(80),
                    backgroundColor: '#F5F5F5',
                    paddingVertical: moderateScale(10),
                    overflow: 'hidden',
                    elevation: 3,
                    marginBottom: verticalScale(20),
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      height: verticalScale(10),
                      width: scale(30),
                      marginRight: scale(10),
                      marginTop: verticalScale(14),
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: moderateScale(16),
                        marginBottom: verticalScale(4),
                        marginTop: verticalScale(8),
                        color: '#FFFFFF',
                        //fontWeight: '900',
                        width: scale(120),
                      }}>
                      {key.text}
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                      }}>
                      By BarterMate
                    </Text>
                  </View>
                  <Image
                    source={key.image}
                    style={{
                      height: verticalScale(55),
                      width: scale(75),
                      marginTop: verticalScale(5),
                      marginLeft: scale(60),
                      marginRight: scale(20),
                      margin: moderateScale(10),
                      overflow: 'hidden',
                    }}
                  />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <BottomSheet
            visible={visible}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}>
            <View style={styles.card}>
              <Text
                style={{
                  color: '#FFF',
                  alignSelf: 'center',
                  fontSize: moderateScale(25),
                  fontWeight: 'bold',
                  marginTop: verticalScale(40),
                }}>
                {itemSelected}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(25),
                  height: verticalScale(120),
                  color: '#FFF',
                  textAlign: 'center',
                  fontWeight: '400',
                  marginTop: verticalScale(10),
                  paddingHorizontal: moderateScale(15),
                  fontSize: moderateScale(16),
                  //fontStyle: 'italic',
                }}>
                {description}
              </Text>

              <View
                style={{
                  flex: 1,
                  marginTop: verticalScale(8),
                }}>
                <View style={styles.loginBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      toggle();
                      navigation.navigate('Register Screen', {
                        itemSelected: `${itemSelected}`,
                        subCategory: `${subCategory}`,
                        profile: `false`,
                      });
                    }}>
                    {loginStatus == 'true' ? (
                      <></>
                    ) : (
                      <Text
                        style={{
                          color: '#EB4D4B',
                          backgroundColor: '#FFF',
                          fontSize: moderateScale(20),
                          height: verticalScale(35),
                          marginBottom: verticalScale(10),
                          width: scale(200),
                          fontWeight: '800',
                          textAlign: 'center',
                          alignSelf: 'center',
                          paddingTop: verticalScale(3),
                        }}>
                        Sign Up
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>

                {loginStatus == 'true' ? (
                  <></>
                ) : (
                  <View style={styles.guestRegister}>
                    <TouchableOpacity
                      onPress={() => {
                        toggle();
                        navigation.navigate('Guest Pickup Screen', {
                          itemSelected: `${itemSelected}`,
                          subCategory: `${subCategory}`,
                          userId: `${userId}`,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: moderateScale(20),
                          alignSelf: 'center',
                          color: '#EB4D4B',
                          backgroundColor: '#FFF',
                          height: verticalScale(35),
                          width: scale(200),
                          fontWeight: '800',
                          textAlign: 'center',
                          paddingTop: verticalScale(3),
                          marginTop: verticalScale(15),
                        }}>
                        Guest
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {loginStatus == 'true' ? (
                <TouchableOpacity
                  onPress={() => {
                    toggle();
                    if (loginStatus == 'true') {
                      navigation.navigate('Pickup Screen', {
                        name: `${username}`,
                        itemSelected: `${itemSelected}`,
                        subCategory: `${subCategory}`,
                        address: `${address}`,
                        email: `${email}`,
                        phone: `${phone}`,
                        landmark: `${landmark}`,
                        pincode: `${pincode}`,
                        userId: `${userId}`,
                        loadAgain: `${false}`,
                      });
                    } else {
                      navigation.navigate('Login Screen', {
                        itemSelected: `${itemSelected}`,
                        subCategory: `${subCategory}`,
                        // location: 'Category',
                        // profile: 'false',
                        profile: 'false',
                        userId: `${userId}`,
                      });
                    }
                  }}>
                  <View
                    style={{
                      height: verticalScale(45),
                      width: scale(280),
                      marginBottom: verticalScale(10),
                      backgroundColor: '#000',
                      borderRadius: moderateScale(10),
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: moderateScale(16),
                        height: verticalScale(45),
                        paddingTop: verticalScale(12),
                        width: scale(280),
                        textAlign: 'center',
                      }}>
                      Login As {username.substring(0, 10)} ...
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    toggle();
                    if (loginStatus == 'true') {
                      navigation.navigate('Pickup Screen', {
                        name: `${username}`,
                        itemSelected: `${itemSelected}`,
                        subCategory: `${subCategory}`,
                        address: `${address}`,
                        email: `${email}`,
                        phone: `${phone}`,
                        landmark: `${landmark}`,
                        pincode: `${pincode}`,
                        userId: `${userId}`,
                        loadAgain: `${false}`,
                      });
                    } else {
                      navigation.navigate('Login Screen', {
                        itemSelected: `${itemSelected}`,
                        subCategory: `${subCategory}`,
                        location: 'Category',
                        userId: `${userId}`,
                      });
                    }
                  }}>
                  <View
                    style={{
                      backgroundColor: '#000',
                      height: verticalScale(50),
                      width: scale(280),
                      marginBottom: verticalScale(25),
                      alignSelf: 'center',
                      borderRadius: moderateScale(10),
                      marginHorizontal: scale(10),
                    }}>
                    <Text
                      style={{
                        color: '#FFF',

                        fontSize: moderateScale(20),
                        paddingTop: verticalScale(10),
                        textAlignVertical: 'center',
                        textAlign: 'center',
                      }}>
                      Login
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {loginStatus == 'true' ? (
                <TouchableOpacity
                  onPress={() => {
                    setUser();
                    toggle();
                    Alert.alert('You are logged out!');
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: '#FFF',
                      alignSelf: 'center',
                      //marginTop: verticalScale(5),
                      marginBottom: verticalScale(44),
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </BottomSheet>
        </View>
      </ScrollView>
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: verticalScale(50),
  },

  gridContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    justifyContent: 'space-around',
    marginTop: verticalScale(10),
    paddingBottom: verticalScale(50),
  },

  pickerStyle: {
    marginLeft: 70,
    marginRight: 70,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#A363A9',
    marginLeft: 25,
    marginRight: 25,
  },

  card: {
    backgroundColor: '#EF6563',
    height: verticalScale(400),
    marginHorizontal: scale(20),
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
  },
});

//<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="105" height="90" viewBox="0 0 105 90">
