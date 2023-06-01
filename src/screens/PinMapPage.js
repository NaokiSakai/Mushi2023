import * as React from 'react';
import { StyleSheet,View, Text, Button } from 'react-native';
import MapPin from '../components/MapPins';



export default function Page1({ navigation }) {
    return (
      <MapPin/>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
