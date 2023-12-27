import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './screens/Homepage/Homepage';
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>

    <View>
      <Homepage />
    </View>
    </Provider>
  );
}
