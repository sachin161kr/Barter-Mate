import React, { useRef, useState } from "react";
import axios from "axios";


import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

const LoginScreen = ({navigation})=>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    var name = "";
    var phone = "";
    var addressSaved = "";
    var landmark = "";
    var pincode = "";
   //var categorySaved = "";

    const getCredentials = ()=>{
    
        if(email && password)
        {
            var data = JSON.stringify({"email":`${email}`,"password":`${password}`});
            var config = {
                method: 'post',
                url: 'https://enigmatic-bayou-48428.herokuapp.com/admin/registration-api/login',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };

              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                const userData = response.data;
                name = userData.data.userDetails.name;
                phone = userData.data.userDetails.phone;
                addressSaved = userData.data.userDetails.address;
                landmark = userData.data.userDetails.landMark;
                pincode = userData.data.userDetails.pinCode;

                console.log(name);
                console.log(email);
                console.log(phone);
                console.log(landmark);
                console.log(pincode);
                console.log(addressSaved);



                navigation.navigate('Pickup Screen',{
                    name : `${name}`,
                    email : email,
                    phone : `${phone}`,
                    addressSaved : `${addressSaved}`,
                    landmark : `${landmark}`,
                    pincode : `${pincode}`
                })


              })
              .catch(function (error) {
                console.log(error);
                Alert.alert("Login Failed");
              });  
    
        }
        else
        {
            Alert.alert("Enter Valid Credentials");
        }
    }   
    

    return (
        <>
            <View style={
                {
                    marginTop : 70,
                }
            }>
                <TextInput
                   onChangeText = {(tempEmail)=>{
                        setEmail(tempEmail);
                   }}
                   style = {styles.textinput}
                   placeholder = "Email"
                   placeholderTextColor = "#758283"
                >

                </TextInput>

                <TextInput
                   style = {styles.textinput}
                   placeholder = "Password"
                   placeholderTextColor = "#758283"
                   secureTextEntry = {true}
                   onChangeText = {(tempPassword)=>{
                    setPassword(tempPassword);
               }}
                >

                </TextInput>

                <View style = {styles.loginBtn}>
                    <TouchableOpacity
                       onPress = {
                        ()=>{

                            getCredentials();

                        }
                    }
                    >
                    <Text style={
                        {
                            fontSize : 30,
                            alignSelf : "center",
                            color : "#FFFFFF",
                            margin : 5,
                            paddingBottom : 10,
                            
                        }
                    }>Login</Text>
                    </TouchableOpacity>


                </View>
                <Text
                     style = {
                         {
                             fontSize : 18,
                             alignSelf : "center",
                             marginTop : 100,
                             color : "#758283"
                            
                         }
                     }
                >Don't Have An Account?</Text>

<View style = {styles.registerBtn}>
                    <TouchableOpacity
                       onPress = {
                           ()=>{
                               console.log("Register Button Clicked");
                               navigation.navigate('Register Screen')
                           }
                       }
                    >
                    <Text style={
                        {
                            fontSize : 20,
                            alignSelf : "center",
                            color : "#000000",
                            margin : 5,
                            paddingBottom : 5,
                            
                        }
                    }>Register Now</Text>
                    </TouchableOpacity>


                </View>

            </View>
        </>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({
     
    textinput : {
        fontSize : 20,
        borderColor : "#1C8D73",
        borderWidth : 3,
        borderRadius : 10,
        marginTop : 15,
        marginLeft : 20,
        marginRight : 20,
        color : "#000000"
        
    },

    loginBtn : {
        marginTop : 25,
        backgroundColor : "#1C8D73",
        marginLeft : 90,
        marginRight : 90,
        borderRadius : 15,
        
    },

    registerBtn : {
        marginTop : 10,
        borderColor : "#1C8D73",
        borderWidth : 3,
        marginLeft : 100,
        marginRight : 100,
        
    },
})

