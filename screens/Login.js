import React from "react";

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

const LoginScreen = ({navigation})=>{
    return (
        <>
            <View style={
                {
                    marginTop : 70,
                }
            }>
                <TextInput
                   style = {styles.textinput}
                   placeholder = "Username"
                >

                </TextInput>

                <TextInput
                   style = {styles.textinput}
                   placeholder = "Password"
                   secureTextEntry = {true}
                >

                </TextInput>

                <View style = {styles.loginBtn}>
                    <TouchableOpacity
                       onPress = {
                           ()=>{
                               console.log("Login Button Clicked");
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
                            color : "#FFFFFF",
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
        borderColor : "#CAD5E2",
        borderWidth : 3,
        marginTop : 15,
        marginLeft : 20,
        marginRight : 20,
        
    },

    loginBtn : {
        marginTop : 25,
        backgroundColor : "#8D3DAF",
        marginLeft : 90,
        marginRight : 90,
        borderRadius : 15,
        
    },

    registerBtn : {
        marginTop : 10,
        backgroundColor : "#F4BE2C",
        marginLeft : 100,
        marginRight : 100,
        
    },


})