import React from 'react';
import {Image, View, Text, TouchableOpacity, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import logo from './assets/logo2.png';
import profileIcon from './assets/profileIcon.png';

const Stack = createNativeStackNavigator();

import CategoryScreen from './screens/Category';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import PickupScreen from './screens/Pickup';
import GuestPickupScreen from './screens/GuestPickup';
import ForgotPassScreen from './screens/ForgotPass';
import ResetPassScreen from './screens/ResetPass';
import ProfileScreen from './screens/Profile';
import PriceScreen from './screens/Price';
import PickupHistoryScreen from './screens/PickupHistory';
import AddressScreen from './screens/Address';
import MyProfileScreen from './screens/MyProfile';
import OrderDetailsScreen from './screens/OrderDetails';

const MyStack = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Category Screen"
          component={CategoryScreen}
          options={{
            title: '',
            header: () => {
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={logo}
                      style={{
                        height: verticalScale(75),
                        width: scale(80),
                        //marginLeft: scale(10),
                      }}
                    />
                    <Text
                      style={{
                        fontSize: moderateScale(25),
                        marginTop: verticalScale(19),
                        marginLeft: scale(20),
                        fontWeight: '700',
                      }}>
                      BarterMate
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Profile Screen');
                      }}>
                      <Image
                        source={profileIcon}
                        style={{
                          height: verticalScale(35),
                          width: scale(35),
                          marginTop: verticalScale(17),
                          marginLeft: scale(40),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              );
            },
          }}
        />
        <Stack.Screen
          name="Reset Screen"
          component={ResetPassScreen}
          options={{
            title: 'Change Password',
          }}
        />
        <Stack.Screen
          name="Price Screen"
          component={PriceScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Forgot Screen"
          component={ForgotPassScreen}
          options={{
            title: 'Recover Your Password',
          }}
        />
        <Stack.Screen
          name="Order Details Screen"
          component={OrderDetailsScreen}
          options={{
            title: '',
          }}
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
          name="Pickup Screen"
          component={PickupScreen}
          options={{
            title: 'Provide Pickup Location',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Profile Screen"
          component={ProfileScreen}
          options={{
            title: '',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Guest Pickup Screen"
          component={GuestPickupScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Pickup History Screen"
          component={PickupHistoryScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Address Screen"
          component={AddressScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="My Profile Screen"
          component={MyProfileScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
