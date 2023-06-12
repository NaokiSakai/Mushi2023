import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapPin from '../components/MapPins';



export default function Page1() {
    return (
      <MapPin/>//MapPinコンポーネントを呼び出す。
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
