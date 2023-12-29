import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
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
                <Text style={styles.boldText}>Item: {item.orders["0"].name}</Text>
                <Text style={styles.boldText}>Price: {item.orders["0"].price}</Text>
                <Text style={styles.boldText}>Quantity: {item.orders["0"].quantity}</Text>
                <Text style={styles.boldText}>No. of Days: {item.pickUpDetails.no_Of_days}</Text>
                <Text style={styles.boldText}>Selected Time: {item.pickUpDetails.selectedTime}</Text>
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
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});