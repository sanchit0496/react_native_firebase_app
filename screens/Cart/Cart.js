import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Cart;
