import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import CategoryScreen from "./screens/Category";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import PickupScreen from "./screens/Pickup";
import GuestScreen from "./screens/Guest";

const MyStack = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Category Screen"
          component={CategoryScreen}
          options={{ title: 'Choose A Category', 
          headerTitleStyle : {
            color : "#FFFFFF",
            fontWeight : "bold",

          },

          headerStyle : {
            backgroundColor : "#1C8D73",
          }

        
        }}

        />
        <Stack.Screen
          name="Guest Screen"
          component={GuestScreen}
          options={{ title: "Category Description",
        
          headerTitleStyle : {
            color : "#FFFFFF",
            fontWeight : "bold",

          },

          headerStyle : {
            backgroundColor : "#1C8D73",
          }
        }}
        />
        <Stack.Screen
          name="Login Screen"
          component={LoginScreen}
          options={{ title: 'Login' ,
          headerTitleStyle : {
            color : "#FFFFFF",
            fontWeight : "bold",

          },

          headerStyle : {
            backgroundColor : "#1C8D73",
          }
        
        
        }}
        />
        <Stack.Screen
          name="Register Screen"
          component={RegisterScreen}
          options={{ title: 'Register',
        
          headerTitleStyle : {
            color : "#FFFFFF",
            fontWeight : "bold",

          },

          headerStyle : {
            backgroundColor : "#1C8D73",
          }
        }}
        />
        <Stack.Screen
          name="Pickup Screen"
          component={PickupScreen}
          options={{ title: 'Provide Pickup Location',
          
          headerTitleStyle : {
            color : "#FFFFFF",
            fontWeight : "bold",

          },

          headerStyle : {
            backgroundColor : "#1C8D73",
          }
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;