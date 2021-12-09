import React, { useState } from "react";

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

const PickupScreen = ()=>{

     const [address,setAddress] = useState('');
     return(
         <>
              <View>
                  <Text
                      style = {
                          {
                              fontSize : 25,
                              alignSelf : "center",
                              marginTop : 100,
                              color : "#000000"
                          }
                      }
                  >Welcome User</Text>
                  <Text
                      style = {
                          {
                              fontSize : 25,
                              alignSelf : "center",
                              marginTop : 20,
                              color : "#000000"
                          }
                      }
                  >Category Selected = Glass</Text>
                   <TextInput
                   onChangeText = {(tempAddress)=>{
                         setAddress(tempAddress);
                   }}
                   style = {styles.textinput}
                   placeholder = "Enter Pickup Address"
                   placeholderTextColor = "#758283"
                ></TextInput>
                 
                 <View style = {styles.pickupBtn}>
                    <TouchableOpacity
                       onPress = {
                           ()=>{
                               if(address.length==0)
                               {
                                   Alert.alert("Please provide a valid Address")
                               }
                               else{
                                console.log("Pickup Scheduled");
                                Alert.alert("Pickup Scheduled , Thank You")
                               }
                               //navigation.navigate('Register Screen')
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
                    }>Send Pickup Request</Text>
                    </TouchableOpacity>


                </View> 


              </View>
         </>
     );
};

export default PickupScreen;

const styles = StyleSheet.create({
    textinput : {
        fontSize : 20,
        borderColor : "#CAD5E2",
        borderWidth : 3,
        marginTop : 35,
        marginLeft : 20,
        marginRight : 20,
        color : "#000000"
        
    },

    pickupBtn : {
        marginTop : 25,
        backgroundColor : "red",
        marginLeft : 90,
        marginRight : 90,
        
        
    },

})
