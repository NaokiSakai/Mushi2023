import * as React from 'react';
import { StyleSheet,View, Text,Button } from 'react-native';

export default function Page2({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>このページはPage２です</Text>
      <Button title="Page1へ" onPress={() => navigation.navigate('Page1')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
