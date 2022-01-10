import React from 'react';
import {
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import logo from './assets/logo.png';

const Stack = createNativeStackNavigator();

import CategoryScreen from './screens/Category';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import PickupScreen from './screens/Pickup';
import GuestScreen from './screens/Guest';
import GuestPickupScreen from './screens/GuestPickup';
import SubCategoryScreen from './screens/SubCategory';

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Category Screen"
          component={CategoryScreen}
          options={
            {
            title: 'Choose A Category',
             header : ()=>{
               return(
                 <Image
                   source = {logo}
                   
                   style = {
                     {  
                        marginTop : 10,
                        marginBottom : 10,
                        height : 55,
                        width : 55,
                        alignSelf : 'center',
                      
                        
                     }
                   }
                 />
               )
             }
           }
        }
        />
        <Stack.Screen
          name="Guest Screen"
          component={GuestScreen}
          options={{
            title: 'Category Description',
            header : ()=>{
              return(
                <Image
                  source = {logo}
                  style = {
                    {  
                      marginTop : 10,
                      marginBottom : 10,
                      height : 55,
                      width : 55,
                      alignSelf : 'center',
                    }
                  }
                />
              )
            }
          }
           
        }
        />
        <Stack.Screen
          name="Login Screen"
          component={LoginScreen}
          options={{
            title: 'Login',
            header : ()=>{
              return(
                <Image
                  source = {logo}
                  style = {
                    {  
                      marginTop : 10,
                      marginBottom : 10,
                      height : 55,
                      width : 55,
                      alignSelf : 'center',
                    }
                  }
                />
              )
            }
          
          }}
        />
        <Stack.Screen
          name="Register Screen"
          component={RegisterScreen}
          options={{
            title: 'Register',
            header : ()=>{
              return(
                <Image
                  source = {logo}
                  style = {
                    {  
                      marginTop : 10,
                      marginBottom : 10,
                      height : 55,
                      width : 55,
                      alignSelf : 'center',
                    }
                  }
                />
              )
            }
          
          }}
        />
        <Stack.Screen
          name="SubCategory Screen"
          component={SubCategoryScreen}
          options={{
            title: 'Select Sub-Category',
            header : ()=>{
              return(
                <Image
                  source = {logo}
                  style = {
                    {  
                      marginTop : 10,
                      marginBottom : 10,
                      height : 55,
                      width : 55,
                      alignSelf : 'center',
                    }
                  }
                />
              )
            }
          
          }}
        />
        <Stack.Screen
          name="Pickup Screen"
          component={PickupScreen}
          options={{
            title: 'Provide Pickup Location',
            headerBackVisible : false,
            header : ()=>{
              return(
                <Image
                  source = {logo}
                  style = {
                    {  
                      marginTop : 10,
                      marginBottom : 10,
                      height : 55,
                      width : 55,
                      alignSelf : 'center',
                    }
                  }
                />
              )
            }
          
          }}
        />
        <Stack.Screen
          name="Guest Pickup Screen"
          component={GuestPickupScreen}
          options={{
            title: 'Provide Pickup Location',
            header : ()=>{
              return(
                <Image
                  source = {logo}
                  style = {
                    {  
                      marginTop : 10,
                        marginBottom : 10,
                        height : 55,
                        width : 55,
                        alignSelf : 'center',
                       
                       
                    }
                  }
                />
              )
            }
          
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
