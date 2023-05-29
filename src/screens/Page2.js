import * as React from 'react';
import { StyleSheet,View, Text, Button } from 'react-native';
import { PaperProvider} from 'react-native-paper';
import Footer from '../components/Fooder';

export default function Page1({ navigation }) {
    return (
      <PaperProvider>
      <View style={styles.container}>
        <Text>このページはPage2です</Text>
        <Button title="ContactFormへ" onPress={() => navigation.navigate('ContactForm')}></Button>
      </View>
      <Footer/>
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
