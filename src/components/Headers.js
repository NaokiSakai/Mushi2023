import React from 'react';
import { Appbar, Menu, PaperProvider} from 'react-native-paper';
import { TextInput } from 'react-native-paper';

export default function CustomNavigationBar({
  navigation,
  back,
}) {
  //menu
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  //検索
  const _handleSearch = () => console.log('Searching');
  const [text, setText] = React.useState("");
  

  return (
    <PaperProvider>
      <Appbar.Header>
        <TextInput label='検索するスポットを入力' 
        mode='outlined' value={text} onChangeText={text => setText(text)}
        style={{width:"70%",marginLeft:"3%",marginBottom:"1.5%"}}/>
        <Appbar.Action icon="magnify" onPress={_handleSearch} /> 
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        {!back ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={openMenu}
              />
            }>
            <Menu.Item
              onPress={() => navigation.navigate('Page2')}
              title="利用規約"
            />
            <Menu.Item
              onPress={() => {
                console.log('Option 2 was pressed');
              }}
              title="アプリ使用方法"
            />
            <Menu.Item
              onPress={closeMenu}
              title="戻る"
            />
          </Menu>
        ) : null}
      </Appbar.Header>
    </PaperProvider>
  );
};
