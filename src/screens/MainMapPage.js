import * as React from 'react';
import { StyleSheet,View, Text, Button } from 'react-native';
import MapScreen from '../components/Map';



export default function Page1({ navigation }) {
    return (
      <MapScreen/>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
