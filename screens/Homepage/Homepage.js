import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location";

const Homepage = () => {

    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('We are loading your location');
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  
    useEffect(() => {
      checkLocationStatus();
    }, []);
  
    const checkLocationStatus = async () => {
      try {
        await checkIfLocationEnabled();
        await requestLocationPermission();
        await getCurrentLocation();
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    const checkIfLocationEnabled = async () => {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert(
          'Location Services Not Enabled',
          'Please enable location services in your device settings.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
        throw new Error('Location services not enabled');
      } else {
        setLocationServicesEnabled(true);
      }
    };
  
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Denied',
          'Please allow the app to use location services in your device settings.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
        throw new Error('Location permission denied');
      }
    };
  
    const getCurrentLocation = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync();
  
        if (coords) {
          const { latitude, longitude } = coords;
          const response = await Location.reverseGeocodeAsync({ latitude, longitude });

          for (let item of response) {
            let address = `${item.name} ${item.city} ${item.postalCode}`;
            setDisplayCurrentAddress(address);
          }
        }
      } catch (error) {
        console.error('Error getting current location:', error.message);
      }
    };

    return (
        <SafeAreaView>
            <View>
                <Text>{displayCurrentAddress}</Text>
                <Text>Homepage Location</Text>
            </View>
        </SafeAreaView>
    )
}

export default Homepage

const styles = StyleSheet.create({})