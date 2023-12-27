import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import StackNavigator from "./StackNavigation";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}