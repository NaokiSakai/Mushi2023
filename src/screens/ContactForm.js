import * as React from 'react';
import { PaperProvider} from 'react-native-paper';
import Input from '../components/Input';

//お問合せページ
export default function ContactForm() {
    return (
      <PaperProvider>
        <Input></Input> 
      </PaperProvider>
    );
}

