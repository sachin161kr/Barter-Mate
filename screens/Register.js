import React from "react";

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

const RegisterScreen = ()=>{
    return (
        <>
            <View  style={
                {
                    marginTop : 50,
                }
            }>
            <TextInput
                   style = {styles.textinput}
                   placeholder = "Full Name"
                >

                </TextInput> 
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
                <TextInput
                   style = {styles.textinput}
                   placeholder = "Confirm Password"
                   secureTextEntry = {true}
                >

                </TextInput> 
                <TextInput
                   style = {styles.textinput}
                   placeholder = "Address"
                >

                </TextInput> 
                <View style = {styles.registerBtn}>
                    <TouchableOpacity
                       onPress = {
                           ()=>{
                               console.log("Register Button Clicked");
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
        
    },

    registerBtn : {
        marginTop : 30,
        backgroundColor : "#F4BE2C",
        marginLeft : 100,
        marginRight : 100,
        
    },


})