import React, { useState } from "react";
import {Picker} from '@react-native-picker/picker';
import axios from "axios";

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";




const RegisterScreen = ()=>{
    
    const [pincode,setSelectedPincode] = useState('827013');
    const [fullName,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] = useState('');
    const [address,setAddress] = useState('');
    const [landmark,setLankmark] = useState('');

        const handleSubmit = ()=>{
            var data = JSON.stringify({"name":`${fullName}`,"email":`${email}`,"phone":`${phone}`,"address":`${address}`,"landMark":`${landmark}`,"pinCode":`${pincode}`,"password":`${password}`});
            
            var config = {
                method: 'post',
                url: 'https://enigmatic-bayou-48428.herokuapp.com/admin/registration-api/registration',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
                
            };
        
                axios(config)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                Alert.alert("Successfully Registered");
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    

    

    return (
        <>
            <ScrollView>
            <View  style={
                {
                    marginTop : 10,
                }
            }>
            <TextInput
                   style = {styles.textinput}
                   placeholder = "Full Name"
                   placeholderTextColor = "#758283"
                   onChangeText = {(text)=>{
                    setFullName(text);
               }}

                >

                </TextInput> 
                
                <TextInput
                   onChangeText = {(text)=>{
                        setEmail(text);
                   }}
                   style = {styles.textinput}
                   placeholder = "Email"
                   placeholderTextColor = "#758283"
                   keyboardType="email-address"
                >   

                </TextInput>

               
                     

                <TextInput
                   onChangeText = {(text)=>{
                        setPhone(text);
                   }}
                   style = {styles.textinput}
                   placeholder = "Phone"
                   placeholderTextColor = "#758283"
                   keyboardType="phone-pad"
                   
                >

                </TextInput> 

                <TextInput
                   onChangeText = {(text)=>{
                    setPassword(text);
                   }}
                   style = {styles.textinput}
                   placeholder = "Password"
                   secureTextEntry = {true}
                   placeholderTextColor = "#758283"
                >

                </TextInput> 
                <TextInput
                   onChangeText = {(text)=>{
                    setConfirmPass(text);
                  }}
                   style = {styles.textinput}
                   placeholder = "Confirm Password"
                   secureTextEntry = {true}
                   placeholderTextColor = "#758283"
                >

                </TextInput> 
                <TextInput
                   onChangeText = {(text)=>{
                    setAddress(text);
                   }}
                   style = {styles.textinput}
                   placeholder = "Address"
                   placeholderTextColor = "#758283"
                >

                </TextInput> 

                <TextInput
                   onChangeText = {(text)=>{
                        setLankmark(text);
                   }}
                   style = {styles.textinput}
                   placeholder = "Lankmark"
                   placeholderTextColor = "#758283"
                >   
                </TextInput>

                <View style = {styles.pickerStyle}>
                    <Text
                       style={
                           {
                               color : "#758283",
                               fontSize : 20,
                               textAlign : "center",

                           }
                       }
                    >Choose Pincode</Text>
                <Picker
                   style = {
                       {
                        color : "#1C8D73",
                       }
                   }
                   dropdownIconColor = "#1C8D73"
                   dropdownIconRippleColor = "#1C8D73"
                   onTouchCancel = {true}
                   mode = "dropdown"
                   selectedValue={pincode}
                   onValueChange={
                       (itemValue)=>{
                            setSelectedPincode(itemValue);
                       }
                    }>
                       
                 <Picker.Item label="827013" value="827013" />
                 <Picker.Item label="827004" value="827004" />       
                    
                </Picker>
                </View>

                <View style = {styles.registerBtn}>
                    <TouchableOpacity
                       onPress = {
                           ()=>{
                              if(fullName && email && phone && password && confirmPass && address && landmark)
                              {
                                    
                                    if(password!=confirmPass)
                                    {
                                        Alert.alert("Password and Comfirmed Password must be same");
                                    }
                                    else if(phone.length!=10)
                                    {
                                        Alert.alert("Enter Valid Phone Number");
                                    }
                                    else
                                    {
                                        handleSubmit();
                                    }
                              }
                              else
                              {
                                  Alert.alert("Enter Valid Details");
                              }
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
                    }>Register</Text>
                    </TouchableOpacity>


                </View>
            </View>
            </ScrollView>
        </>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    textinput : {
        fontSize : 20,
        borderColor : "#1C8D73",
        borderRadius : 10,
        borderWidth : 3,
        marginTop : 15,
        marginLeft : 20,
        marginRight : 20,
        color : "#000000"
        
    },

    registerBtn : {
        marginTop : 10,
        backgroundColor : "#1C8D73",
        marginLeft : 100,
        marginRight : 100,
        marginBottom : 50,
        
    },

    pickerStyle : {
        // borderColor : "#1C8D73",
        // borderWidth : 3,
        // borderRadius : 10,
        marginLeft : 70,
        marginTop : 15,
        marginRight : 70,
        //backgroundColor : "#242B2E"
    

        
    }


})