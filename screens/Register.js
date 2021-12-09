import React, { useState } from "react";

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
    
    const [fullName,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] = useState('');
    const [address,setAddress] = useState('');
    const [landmark,setLankmark] = useState('');
    const [pincode,setPincode] = useState('');

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
                        setUsername(text);
                   }}
                   style = {styles.textinput}
                   placeholder = "Username"
                   placeholderTextColor = "#758283"
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
                
                <TextInput
                   onChangeText = {(text)=>{
                        setPincode(text);
                   }}
                   style = {styles.textinput}
                   placeholder = "Pincode"
                   placeholderTextColor = "#758283"
                   keyboardType="number-pad"
                >

                </TextInput> 

                <View style = {styles.registerBtn}>
                    <TouchableOpacity
                       onPress = {
                           ()=>{
                               if(fullName.length==0 || username.length==0 || password.length==0 || confirmPass.length==0 || address.length==0 || email.length==0 || phone.length==0 || pincode.length==0 || landmark.length==0)
                               {
                                    Alert.alert("Provide Valid User Data");
                               } 
                               else{
                                console.log("Register Button Clicked");

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
        borderColor : "#CAD5E2",
        borderWidth : 3,
        marginTop : 15,
        marginLeft : 20,
        marginRight : 20,
        color : "#000000"
        
    },

    registerBtn : {
        marginTop : 30,
        backgroundColor : "#F4BE2C",
        marginLeft : 100,
        marginRight : 100,
        
    },


})