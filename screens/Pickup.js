import React, { useState } from "react";
import {Picker} from '@react-native-picker/picker';


import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

const PickupScreen = ({route})=>{

     const itemSelected = route.params.item;
     console.log(itemSelected);

     
     
     const [category,setCategory] = useState(itemSelected);
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
                  
                  <View style = {styles.pickerStyle}>
                    <Text
                       style={
                           {
                               fontSize : 20,
                               textAlign : "center",
                               color : "#758283",
                               marginTop : 10,

                           }
                       }
                    >Category Chosen</Text>
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
                   selectedValue={category}
                   onValueChange={
                       (itemValue)=>{
                            setCategory(itemValue);
                       }
                    }>
                       
                 <Picker.Item label="Glass" value="Glass" />
                 <Picker.Item label="Metal-Others" value="Metal-Others" /> 
                 <Picker.Item label="Plastic" value="Plastic" /> 
                 <Picker.Item label="Paper" value="Paper" />
                 <Picker.Item label="Electronics" value="Electronics" />
                 <Picker.Item label="Copper Items" value="Copper Items" />
                 <Picker.Item label="Iron Items" value="Iron Items" />          
                    
                </Picker>
                </View>

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
        borderColor : "#1C8D73",
        borderRadius : 10,
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

    pickerStyle : {
        //borderColor : "#1C8D73",
        //borderWidth : 3,
        marginLeft : 70,
        marginTop : 15,
        marginRight : 70,
        //backgroundColor : "#242B2E"
    

        
    }

})
