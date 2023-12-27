import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './screens/Homepage/Homepage';
import Cart from './screens/Cart/Cart'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} options={{headerShown:false}}/>
        <Stack.Screen name="Cart" component={Cart} options={{headerShown:false}}/>
      </Stack.Navigator>
      </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})