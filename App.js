import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import CategoryScreen from "./screens/Category";

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Category Screen"
          component={CategoryScreen}
          options={{ title: 'Choose A Category' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;