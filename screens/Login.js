import React, { useState } from "react";

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

const LoginScreen = ({navigation})=>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    return (
        <>
            <View style={
                {
                    marginTop : 70,
                }
            }>
                <TextInput
                   onChangeText = {(tempUsername)=>{
                        setUsername(tempUsername);
                   }}
                   style = {styles.textinput}
                   placeholder = "Username"
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
                            
                         if(username.length==0 || password.length==0)
                         {
                             Alert.alert("Please Provide Valid Login Credentials")
                         }
                         else{
                             console.log(`Username = ${username} & Password = ${password}`);
                            navigation.navigate('Pickup Screen')
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