import React from 'react';
import { Appbar, Menu, PaperProvider} from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBack() {
  //menu
  const [visible, setVisible] = React.useState(false);
//   const openMenu = () => setVisible(true);
//   const closeMenu = () => setVisible(false);
//   //検索
  const _handleSearch = () => console.log('Searching');
  const [text, setText] = React.useState("");
  const navigation = useNavigation();
  

  return (
    <PaperProvider>
      <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('MainMapPage')} />
        <TextInput label='検索するスポットを入力' 
        mode='outlined' value={text} onChangeText={text => setText(text)}
        style={{width:"70%",marginLeft:"3%",marginBottom:"1.5%"}}/>
        <Appbar.Action icon="magnify" onPress={_handleSearch} /> 
      </Appbar.Header>
    </PaperProvider>
  );
};
