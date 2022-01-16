import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';


import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {BottomSheet} from 'react-native-btr';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import people from '../assets/people.jpg';
import glassBottle from '../assets/glassBottle.png';
import plasticIcon from '../assets/plasticIcon.png';
import metalIcon from '../assets/metalIcon.png';
import paperIcon from '../assets/paperIcon.png';
import electronicIcon from '../assets/electronicIcon.png';
import sweeper from '../assets/sweeper.png';
import banner from '../assets/banner.jpg';
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
      'Paper suitable for recycling is called scrap paper, often used to produce moulded pulp packaging.',
  },

  {
    key: 4,
    image: electronicIcon,
    text: 'Electronics',
    description:
      'E-waste is electronic products that are unwanted and nearing or at the end of their “useful life.” Computers, televisions, VCRs, stereos, etc',
  },

  // {
  //   key: 5,
  //   image: copper,
  //   text: 'Copper Items',
  //   description:
  //     'Copper scrap is smelted in primary (concentrate) and secondary (scrap) smelters. Primary smelters mainly smelt concentrate. ... The main smelting product is molten black copper (80% Cu), which is converted to rough copper (96% Cu) then fire refined and cast into anodes (98.5% Cu).',
  // },

  // {
  //   key: 6,
  //   image: iron,
  //   text: 'Iron Items',
  //   description:
  //     "Iron and steel scrap also known as 'ferrous metal scrap' is a recyclable material which is left- over during the production of iron and steel products and fabrication of ferrous materials or generated at end of life of the ferrous products. Ferrous scrap is normally recycled during steelmaking.",
  // },
];

const CategoryScreen = ({navigation}) => {
  //const sheetRef = React.useRef(null);

  const [visible, setVisible] = useState(false);
  function toggle() {
    setVisible(visible => !visible);  
  }

  const [description,setDescription] = useState("");
  const [itemSelected,setItem] = useState("");
  const [subCategory, setSubCategory] = useState('Choose Sub-Category');
  

  const [loginStatus, setLogin] = useState('');
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  const getUser = async () => {
    var tempLoginStatus = await AsyncStorage.getItem('loginStatus');
    var tempUsername = await AsyncStorage.getItem('User');
    var tempAddress = await AsyncStorage.getItem('address');
    var tempEmail = await AsyncStorage.getItem('email');
    var tempPhone = await AsyncStorage.getItem('phone');
    var tempLandmark = await AsyncStorage.getItem('landmark');
    var tempPincode = await AsyncStorage.getItem('pincode');

    setLogin(tempLoginStatus);
    setName(tempUsername);
    setAddress(tempAddress);
    setEmail(tempEmail);
    setPhone(tempPhone);
    setLandmark(tempLandmark);
    setPincode(tempPincode);
  };

  getUser();

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Image
              source={people}
              style={{
                height: 250,
                width: 300,
                marginTop: 10,
                marginRight: 20,
                marginLeft: 20,
                alignSelf: 'center',
                resizeMode: 'cover',
              }}
            />
            <Image
              source={banner}
              style={{
                height: 250,
                width: 300,
                marginTop: 10,
                marginRight: 20,
                alignSelf: 'center',
                resizeMode: 'cover',
              }}
            />
          </View>
        </ScrollView>
        <Text
          style={{
            fontSize: 30,
            marginTop: 20,
            marginLeft: 30,
            fontWeight: 'bold',
            color : '#758283'
          }}>
          Categories
        </Text>
        <View style={styles.gridContainer}>
          {categoryList.map(key => (
            <TouchableOpacity
              key={key.key}
              onPress={() => {
                setItem(key.text);
                setDescription(key.description);
                toggle();
                setSubCategory('Choose Sub-Category');
                // console.log(`${key.text} Clicked`);
                // navigation.navigate('SubCategory Screen', {
                //   text: `${key.text}`,
                //   imageSelected: key.image,
                //   description: key.description,
                // });
              }}>
              <View style={styles.viewGroup}>
                <Image source={key.image} style={styles.image} />

                <Text style={styles.text}>{key.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <BottomSheet
          visible={visible}
          onBackButtonPress={toggle}

          onBackdropPress={toggle}
          >
          <View style={styles.card}>
            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                marginTop : 40,
              }}>
              {itemSelected}
            </Text>
            <Text
              style={{
                color: '#000000',
                textAlign: 'center',
                margin: 23,
                fontSize: 18,
                fontStyle: 'italic',
                marginTop : 40,
              }}>
              {description}
            </Text>
            <View style={styles.pickerStyle}>
          {/* <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#758283',
              //marginTop: 10,
            }}>
            Sub-Category Chosen
          </Text> */}

          {itemSelected == 'Glass' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />  
              <Picker.Item label="Bottles" value="Bottles" />
              <Picker.Item label="Mirrors" value="Mirrors" />
            </Picker>
          ) : itemSelected == 'Metal' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />   
              <Picker.Item label="Steel" value="Steel" />
              <Picker.Item label="Brass" value="Brass" />
              <Picker.Item label="Motor" value="Motor" />
              <Picker.Item label="Aluminium" value="Aluminium" />
              <Picker.Item label="Copper" value="Copper" />
              <Picker.Item label="Iron" value="Iron" />
              <Picker.Item
                label="Beer/Beverage Cans"
                value="Beer/Beverage Cans"
              />
            </Picker>
          ) : itemSelected == 'Paper' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />   
              <Picker.Item label="Mil Board" value="Mil Board" />
              <Picker.Item label="Magazine" value="Magazine" />
              <Picker.Item
                label="Gatta/Corrugated Board"
                value="Gatta/Corrugated Board"
              />
              <Picker.Item label="Newspaper" value="Newspaper" />
              <Picker.Item label="Books" value="Books" />
            </Picker>
          ) : itemSelected == 'Plastic' ? (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />   
              <Picker.Item label="Milk Pouch" value="Milk Pouch" />
              <Picker.Item label="Plastic Bottles" value="Plastic Bottles" />
            </Picker>
          ) : (
            <Picker
              style={{
                color: '#A363A9',
              }}
              dropdownIconColor="#A363A9"
              dropdownIconRippleColor="#A363A9"
              onTouchCancel={true}
              mode="dropdown"
              selectedValue={subCategory}
              onValueChange={(itemValue) => {
                setSubCategory(itemValue);
              }}>
              <Picker.Item label="Choose Sub-Category" value="Choose Sub-Category" />   
              <Picker.Item label="Black Battery" value="Black Battery" />
              <Picker.Item label="White Battery" value="White Battery" />
              <Picker.Item
                label="Single-Door Fridge"
                value="Single-Door Fridge"
              />
              <Picker.Item
                label="Double-Door Fridge"
                value="Double-Door Fridge"
              />
              <Picker.Item label="Air Conditioner" value="Air Conditioner" />
              <Picker.Item label="Washing Machine" value="Washing Machine" />
            </Picker>
          )}
        </View>
        <View 
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent : 'space-evenly',
              marginTop : 15,
            }}
        >
        <View style={styles.loginBtn}>
          <TouchableOpacity
            onPress={() => {
              if(subCategory!="Choose Sub-Category")
              { 
                toggle();
                if (loginStatus == 'true') {

                  
                  navigation.navigate('Pickup Screen', {
                    name: `${username}`,
                    itemSelected: `${itemSelected}`,
                    subCategory : `${subCategory}`,
                    address: `${address}`,
                    email: `${email}`,
                    phone: `${phone}`,
                    landmark: `${landmark}`,
                    pincode: `${pincode}`,
                  });
                } 
                else {
                 
                  navigation.navigate('Login Screen', {
                    itemSelected: `${itemSelected}`,
                    subCategory : `${subCategory}`,
                  });
                }
              }
              else
              { 
                
                Alert.alert("Choose a Sub-Category");
              }
              
            }}
            >
            {loginStatus == 'true' ? (
                <LinearGradient colors={['#A363A9', '#FAB06D']}
                   style = {
                     {
                      borderRadius: 25,
                      marginTop : 10,
                     }
                   }
                   start={{x: 0, y: 0}} 
                   end={{x: 1, y: 0}}
                >
                  <Text
                style={{
                  fontSize: 27,
                  textAlignVertical : "center",
                  //padding : 10,
                  paddingBottom : 12,
                  paddingLeft : 15,
                  paddingRight : 15,
                  marginTop : 12,
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  justifyContent: 'center',
                  textAlign: 'center',
                  //backgroundColor: '#c4c4c4',
                 // borderRadius: 25,
                }}>
                Login As {username}
              </Text>
              </LinearGradient>
              
            ) : (
              <LinearGradient colors={['#A363A9', '#FAB06D']}
                   style = {
                     {
                      borderRadius: 25,
                      marginTop : 10,
                                        
                     }
                   }
                   start={{x: 0, y: 0}} 
                   end={{x: 1, y: 0}}
                >
                <Text
                style={{
                  fontSize: 30,
                  alignSelf: 'center',
                  color: '#FFFFFF',
  
                  textAlign : "center",
                  
                  // paddingTop : 7,
                  textAlignVertical : "center",
                  paddingTop : 5,
                  paddingBottom : 15,
                  // borderRadius : 30,
                  paddingRight : 40,
                  paddingLeft : 40,
                  
                }}>
                Login
              </Text>
                </LinearGradient>
              
            )}
          </TouchableOpacity>
        </View>

        {loginStatus == 'true' ? (
          <>
          </>
        ) : (
          <View style={styles.guestRegister}>
            <TouchableOpacity
              onPress={() => {

                if(subCategory!="Choose Sub-Category")
                {
                  toggle();
                  navigation.navigate('Guest Pickup Screen', {
                    itemSelected: `${itemSelected}`,
                    subCategory : `${subCategory}`,
                  });
                }
                else
                {
                  Alert.alert("Choose a Sub-Category");
                }
                
              }
            }
              >
              <Text
                style={{
                  fontSize: 22,
                  alignSelf: 'center',
                  color: '#A363A9',
                  borderWidth : 1,
                  margin : 10,
                  padding : 14,
                  borderColor : '#A363A9',
                  borderRadius : 25,
                  paddingLeft : 25,
                  paddingRight : 25,                
                }}>
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          )}

        </View>   
        {
           loginStatus=='true'?
           <TouchableOpacity
              onPress={()=>{
               
                setUser();
                toggle();
                Alert.alert('You are logged out!');

              }}
           >
              <Text
                 style={
                   {
                     fontSize : 20,
                     color : '#A363A9',
                     alignSelf : 'center',
                     marginTop : 5,
                     marginBottom : 24, 
                   }
                 }
              >Logout</Text>
              </TouchableOpacity> : 
              <></>
        }
          </View>
        </BottomSheet>
      </ScrollView>
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gridContainer: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  pickerStyle: {
    marginLeft: 70,
    marginTop: 15,
    marginRight: 70,
    borderWidth : 1,
    borderRadius : 25,
    borderColor : '#A363A9',
    marginLeft : 25,
    marginRight : 25,
  },

  card: {
    backgroundColor: '#fff',
    height: 450,
    borderTopRightRadius : 40,
    borderTopLeftRadius : 40,
  },

  viewGroup: {
    // borderWidth: 2,
    //borderColor: '#758283',
    //elevation : 4,
    borderRadius : 15,

    marginTop: 30,
    backgroundColor : "#F5F5F5",
    padding: 10,
    overflow: 'hidden',
    elevation : 3,


  },

  image: {
    height: 80,
    width: 100,
    margin: 10,
    overflow: 'hidden',
    //padding : 30,
  },

 

  
  text: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#000000',
    //padding: 5,
  },
});
