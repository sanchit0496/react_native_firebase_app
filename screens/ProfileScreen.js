import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [orderList, setOrderList] = useState([])
  const [userOrders, setUserOrders] = useState([])

  console.log("user", user.email)

  const fetchOrders = async () => {
    var items = []
    const colRef = collection(db, "orders");
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      items.push(doc.data());
    });
    setOrderList(items)
  };

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const ordersOfUser = orderList.filter((item) => item.user === user.email)
    setUserOrders(ordersOfUser)
  }, [orderList])



  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      
        <Pressable style={{ marginVertical: 10 }}>
        <Text>welcome {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text>Sign Out</Text>
      </Pressable>

  
      <View>
        {userOrders.map((item, index) => {
          return (
            <View key={index} style={styles.container}>
              <Image
                style={styles.image}
                source={{ uri: item.orders["0"].image }}
              />
              <View>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Item:</Text>
                  <Text style={styles.regularText}>{item.orders["0"].name}</Text>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Price:</Text>
                  <Text style={styles.regularText}>{item.orders["0"].price}</Text>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Quantity:</Text>
                  <Text style={styles.regularText}>{item.orders["0"].quantity}</Text>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>No. of Days:</Text>
                  <Text style={styles.regularText}>{item.pickUpDetails.no_Of_days}</Text>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Selected Time:</Text>
                  <Text style={styles.regularText}>{item.pickUpDetails.selectedTime}</Text>
                </View>
              </View>
            </View>
          );
        })}

      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  regularText: {
    marginLeft: 'auto', // Align dynamic content to the right
    // You can define other styles for regular text here if needed
  },
});