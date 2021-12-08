import React, { useState } from "react";

import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import logo from "../assets/logo.png"

const categoryList = [
    {   
        key : 0,
        image : logo,
        text : "GLass"
    },

    {   
        key : 1, 
        image : logo,
        text : "Metal-Others"
    },

    {   
        key : 2,
        image : logo,
        text : "Plastic"
    },

    {    
        key : 3,
        image : logo,
        text : "Paper"
    },

    {   
        key : 4,
        image : logo,
        text : "Electronic Items"
    },

    {   
        key : 5,
        image : logo,
        text : "Copper Items"
    },

    {   
        key : 6,
        image : logo,
        text : "Iron Items"
    },
]




const CategoryScreen = ({navigation})=>{

    

    return (
        <>
            <ScrollView style = {styles.container}>
            <View  style = {styles.gridContainer}>
              {categoryList.map((key)=>(
                      <TouchableOpacity key={key.key}
                          onPress = {
                              ()=>{
                                  console.log(`${key.text} Clicked`);
                                  navigation.navigate('Login Screen')
                              }
                          }
                      >
                          <View style = {styles.viewGroup}>
                          <Image source={key.image}
                          style = {styles.image}
                            
                          />

                          <Text style = {styles.text}>{key.text}</Text>

                          </View>
                              
                      </TouchableOpacity>
              ))}
            </View>
            </ScrollView>
        </>
    )
}



export default CategoryScreen;

const styles = StyleSheet.create({
    
    container : {
        flex : 1,
    },

    gridContainer : {
        flex : 1,
        margin : 5,
        flexDirection : "row",
        flexWrap : "wrap",
        alignItems : "flex-start",
        justifyContent : "space-around",
       

    },

    viewGroup : {
        borderWidth : 4,
        borderColor : "#CAD5E2",
        borderRadius : 15,
        margin : 10,
    },

    image : {
       
        height : 90,
        width : 90,
        margin : 10,
       

    },

    text : {
        textAlign : "center",
        marginBottom : 4,
    }
})