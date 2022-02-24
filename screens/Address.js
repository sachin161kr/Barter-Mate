import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const AddressScreen = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Noida');
  const [state, setState] = useState('Uttar Pradesh');

  const handleAddress = () => {
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

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <View>
          <TextInput
            defaultValue=""
            onChangeText={text => {
              setAddress(text);
            }}
            style={styles.textinput}
            placeholder="Enter Address"
            placeholderTextColor="#758283"></TextInput>
          <TextInput
            defaultValue="Noida"
            onChangeText={text => {
              setCity(text);
            }}
            style={styles.textinput}
            placeholder="Enter City"
            placeholderTextColor="#758283"></TextInput>
          <TextInput
            defaultValue="Uttar Pradesh"
            onChangeText={text => {
              setState(text);
            }}
            style={styles.textinput}
            placeholder="Enter State"
            placeholderTextColor="#758283"></TextInput>
        </View>
        <TouchableOpacity
          onPress={handleAddress}
          style={{
            height: verticalScale(40),
            width: scale(300),
            marginLeft: scale(30),
            marginRight: scale(30),
            alignSelf: 'center',
            marginTop: verticalScale(20),
            borderRadius: moderateScale(100),
            borderWidth: 2,
            borderColor: '#A363A9',
          }}>
          <View>
            <Text
              style={{
                fontSize: moderateScale(20),
                marginTop: verticalScale(3),
                color: '#A363A9',
                textAlign: 'center',
                // paddingTop: verticalScale(10),
                // paddingBottom: verticalScale(10),
              }}>
              Add To My Addresses
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#E7E7E7',
            width: scale(260),
            marginTop: verticalScale(20),
            alignSelf: 'center',
          }}
        />
      </View>
    </>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  textinput: {
    alignSelf: 'center',
    fontSize: moderateScale(18),
    borderColor: '#758283',
    borderWidth: 1,
    borderRadius: moderateScale(100),
    marginTop: verticalScale(15),
    marginLeft: scale(20),
    padding: moderateScale(15),
    marginRight: scale(20),
    color: '#000000',
    height: verticalScale(50),
    width: scale(300),
  },
});
