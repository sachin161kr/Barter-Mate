import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const ResetPassScreen = ({route,navigation}) => {
  var id = route.params.id;
  const [pass, setPass] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');

  const passCheck = () => {
   
    if (pass != confirmPass) {
      Alert.alert('Password must be same as Confirmed Password');
      return false;
    } else if (pass.length < 8) {
      Alert.alert('Password length must be greater than 7');
      return false;
    } else {
      return true;
    }
  };

  const resetPass = () => {
    var data = JSON.stringify({
      userId: `${id}`,
      password: `${pass}`,
    });

    var config = {
      method: 'put',
      url: 'https://bartermate01.herokuapp.com/admin/registration-api/updatePassword',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);  
        Alert.alert('Password Updated Successfully');
        navigation.navigate('Category Screen');
      })
      .catch(function (error) {
        setLoading(false);  
        Alert.alert('Something Went Wrong');
        navigation.navigate('Forgot Screen');
      });
  };

  return (
    <>
      <View
         style = {
           {
             flex : 1,
             backgroundColor : "#FFFFFF",
           }
         }
      >
      <View
        style={{
          marginTop: verticalScale(20),
        }}>
        <TextInput
          style={styles.textinput}
          placeholder="Enter New Password"
          secureTextEntry = {true}
          placeholderTextColor="#758283"
          onChangeText={tempPass => {
            setPass(tempPass);
          }}></TextInput>
      </View>
      <View>
        <TextInput
          style={styles.textinput}
          placeholder="Confirm New Password"
          secureTextEntry = {true}
          placeholderTextColor="#758283"
          onChangeText={tempPass => {
            setConfirmPass(tempPass);
          }}></TextInput>
      </View>
      {
          isLoading==true?
          <View
              style={
                  {
                    height : verticalScale(50),
                    width : scale(310),
                    marginTop: verticalScale(15),
                    alignSelf : "center",
                    
                  }
              }
          >
            <ActivityIndicator
               color="#A363A9"
               size={'large'}
               style={
                   {
                       alignSelf : "center",
                   }
               }
            />
          </View>:
          <TouchableOpacity
          onPress={
              ()=>{
                 if(passCheck())
                 {
                     setLoading(true);
                     resetPass();
                     
                 }
                 else
                 {
                     Alert.alert("Enter Valid Password");
                     setLoading(false);
                 }
              }
          }
       >
       <LinearGradient
         colors={['#A363A9', '#FAB06D']}
         style={{
           borderRadius: moderateScale(100),
           height : verticalScale(50),
           width : scale(310),
           marginTop : verticalScale(15),
           alignSelf : "center",
         }}
         start={{x: 0, y: 0}}
         end={{x: 1, y: 0}}>
         <Text
           style={{
             
             fontSize: moderateScale(25),
             alignSelf: 'center',
             color: '#FFFFFF',
             margin: moderateScale(5),
             paddingBottom: verticalScale(10),
           }}>
           Continue
         </Text>
       </LinearGradient>
       </TouchableOpacity>
      }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    borderColor: '#758283',
    borderWidth: 1,
    borderRadius: moderateScale(100),
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    padding: moderateScale(15),
    marginRight: scale(20),
    color: '#000000',
  },
});

export default ResetPassScreen;
