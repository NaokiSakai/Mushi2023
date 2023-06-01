import * as React from 'react';
import { StyleSheet,View, Text, Button } from 'react-native';
import { PaperProvider, TextInput} from 'react-native-paper';
import Input from '../components/Input';

export default function ContactForm({ navigation }) {
    return (
      <PaperProvider>
      <View style={styles.container}>
        <Text>お問い合わせ</Text>
        <Input></Input>
      </View>
      </PaperProvider>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});




