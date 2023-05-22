import * as React from 'react';
import { StyleSheet,View, Text, Button } from 'react-native';
import MapViewScreen from '../components/Map';


export default function Page1({ navigation }) {
    return (
      <MapViewScreen/>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
