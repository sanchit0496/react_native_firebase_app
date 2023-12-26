import { StyleSheet, Text, View, Alert, Pressable, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const handleProfilePress = () => {
    console.log("clicked")
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MaterialIcons name="location-on" size={24} color="#fd5c63" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Office</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable onPress={handleProfilePress} style={{ marginLeft: 'auto' }}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg',
            }}
          />
        </Pressable>
      </View>

      <View style = {styles.searchBar}>
        <TextInput placeholder='Search Bar' />
        <FontAwesome name="search" size={24} color="black" />
      </View>

    </SafeAreaView>
  )
}

export default Homepage

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    borderColor: '#C0C0C0',
    borderRadius: 7
  }
})