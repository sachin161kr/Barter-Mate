import React from "react";

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import logo from "../assets/logo.png"

const GuestScreen = ({navigation})=>{
    return (
        <>
            <View>
               <Image
                  source={logo}
                  style = {styles.image}
               />
               <Text style={
                   {
                       color : "#000000",
                       textAlign : "center",
                       
                   }
               }>
                   Random description Random description Random description Random description Random description Random description 
                   Random description Random description Random description Random description Random description Random description Random description Random description 

               </Text>
                
               <View style = {styles.loginBtn}>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate('Login Screen')
                        }}
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


                <View style = {styles.guestRegister}>
                    <TouchableOpacity
                      
                        onPress={()=>{
                            navigation.navigate('Pickup Screen')
                        }}
                    
                    >
                    <Text style={
                        {
                            fontSize : 20,
                            alignSelf : "center",
                            color : "#FFFFFF",
                            margin : 5,
                            paddingBottom : 10,
                            
                        }
                    }>Continue As Guest</Text>
                    </TouchableOpacity>
                </View>     



            </View>   
        </>
    )
}

export default GuestScreen;

const styles = StyleSheet.create({
    image : {
        height : 150,
        width : 150,
        alignSelf : "center",
        margin : 30,
    },

    loginBtn : {
        marginTop : 25,
        backgroundColor : "#8D3DAF",
        marginLeft : 90,
        marginRight : 90,
        borderRadius : 15,
        
    },

    guestRegister : {
        marginTop : 25,
        backgroundColor : "#8D3DAF",
        marginLeft : 90,
        marginRight : 90,
        paddingTop : 7,
    }

    
})

