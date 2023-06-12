import * as React from 'react';
import { StyleSheet} from 'react-native';
import MapScreen from '../components/Map';



export default function Page1() {
    return (
      <MapScreen/>//Map.jaのMapscreenコンポーネントを呼び出す
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
