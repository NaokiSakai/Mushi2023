import * as React from 'react';
import { StyleSheet,View, Text, Button } from 'react-native';

export default function Page1({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>このページはPage１です</Text>
        <Button title="Page2へ" onPress={() => navigation.navigate('Page2')}></Button>
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
