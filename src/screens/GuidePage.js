import * as React from 'react';
import { PaperProvider} from 'react-native-paper';
import Guide from '../components/Guide';

//使い方
export default function GuidePage() {
    return (
      <PaperProvider>
        <Guide></Guide> 
      </PaperProvider>
    );
}