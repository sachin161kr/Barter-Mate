import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubCategoryScreen = ({route, navigation}) => {
  const image = route.params.imageSelected;

  const itemSelected = route.params.text;

  const description = route.params.description;

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

  return (
    <>
      <ScrollView>
        <Image source={image} style={styles.image} />
        <Text
          style={{
            color: '#000000',
            alignSelf: 'center',
            marginTop: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {itemSelected}
        </Text>
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            margin: 20,
            fontSize: 18,
            fontStyle: 'italic',
          }}>
          {description}
        </Text>

        <View style={styles.pickerStyle}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#758283',
              marginTop: 10,
            }}>
            Sub-Category Chosen
          </Text>

          {itemSelected == 'Glass' ? (
            <Picker
              style={{
                color: '#1FAA59',
              }}
              dropdownIconColor="#1FAA59"
              dropdownIconRippleColor="#1FAA59"
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
                color: '#1FAA59',
              }}
              dropdownIconColor="#1FAA59"
              dropdownIconRippleColor="#1FAA59"
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
                color: '#1FAA59',
              }}
              dropdownIconColor="#1FAA59"
              dropdownIconRippleColor="#1FAA59"
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
                color: '#1FAA59',
              }}
              dropdownIconColor="#1FAA59"
              dropdownIconRippleColor="#1FAA59"
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
                color: '#1FAA59',
              }}
              dropdownIconColor="#1FAA59"
              dropdownIconRippleColor="#1FAA59"
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

        <View style={styles.loginBtn}>
          <TouchableOpacity
            onPress={() => {
              if(subCategory!="Choose Sub-Category")
              {
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
                } else {
                  navigation.navigate('Login Screen', {
                    itemSelected: `${itemSelected}`,
                    subCategory : `${subCategory}`,
                  });
                }
              }
              else
              {
                Alert.alert("Choose A Sub-Category");
              }
              
            }}>
            {loginStatus == 'true' ? (
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: 5,
                  paddingBottom: 10,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Continue As {username}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  margin: 5,
                  paddingBottom: 10,
                }}>
                Login
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
                navigation.navigate('Guest Pickup Screen', {
                  itemSelected: `${itemSelected}`,
                  subCategory : `${subCategory}`,
                });
              }}>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'center',
                  color: '#000000',
                  margin: 5,
                  paddingBottom: 10,
                }}>
                Continue As Guest
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default SubCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 20,
  },

  pickerStyle: {
    marginLeft: 70,
    marginTop: 15,
    marginRight: 70,
  },

  loginBtn: {
    marginTop: 25,
    backgroundColor: '#1FAA59',
    marginLeft: 90,
    marginRight: 90,
    borderRadius: 15,
  },

  guestRegister: {
    marginTop: 25,
    borderColor: '#1FAA59',
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 90,
    marginRight: 90,
    paddingTop: 7,
  },
});
