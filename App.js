import React from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import logo from './assets/logo2.png';

const Stack = createNativeStackNavigator();

import CategoryScreen from './screens/Category';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import PickupScreen from './screens/Pickup';
import GuestScreen from './screens/Guest';
import GuestPickupScreen from './screens/GuestPickup';
import SubCategoryScreen from './screens/SubCategory';
import ForgotPassScreen from './screens/ForgotPass';
import ResetPassScreen from './screens/ResetPass';

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Category Screen"
          component={CategoryScreen}
          options={
            {
             title: '',
             header : ()=>{
               return(
                 <>
                     <View
                         style={
                           {
                              
                              flexDirection : "row",
                              justifyContent : "center",
                           }
                         }
                     >
                       <Image
                          source={logo} 
                          style = {
                            {
                               height : verticalScale(75),
                               width : scale(80),
                               
                            }
                          }                      
                       />
                       <Text
                          style = {
                            {
                               fontSize : moderateScale(25),
                               marginTop : verticalScale(19),
                              
                            }
                          }
                       >BarterMate</Text>
                     </View>
                 </>
               )
             },
                      
             
            }
        }
        />
        <Stack.Screen
          name="Guest Screen"
          component={GuestScreen}
          options={{
            title: '',
          }
           
        }
        />
         <Stack.Screen
          name="Reset Screen"
          component={ResetPassScreen}
          options={{
            title: 'Change Password',
          }
           
        }
        />
         <Stack.Screen
          name="Forgot Screen"
          component={ForgotPassScreen}
          options={{
            title: 'Recover Your Password',
          }
           
        }
        />
        <Stack.Screen
          name="Login Screen"
          component={LoginScreen}
          options={{
            title: '',
          
          }}
        />
        <Stack.Screen
          name="Register Screen"
          component={RegisterScreen}
          options={{
            title: '',
          
          
          }}
        />
        <Stack.Screen
          name="SubCategory Screen"
          component={SubCategoryScreen}
          options={{
            title: '',
            
          
          }
        }
        />
        <Stack.Screen
          name="Pickup Screen"
          component={PickupScreen}
          options={{
            title: 'Provide Pickup Location',
            headerBackVisible : false,
           
          
          }}
        />
        <Stack.Screen
          name="Guest Pickup Screen"
          component={GuestPickupScreen}
          options={{
            title: '',
            
          
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
