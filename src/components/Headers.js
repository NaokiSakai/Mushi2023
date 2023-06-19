import React from 'react';
import { Appbar, Menu, Provider } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import OpenCageGeocoder from 'opencage-api-client';

export default function Headers({ navigation, back,setLatitude, setLongitude}) {
  // メニュー
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  // 検索
  const _handleSearch = async () => {
    try {
      const response = await OpenCageGeocoder.geocode({
        q: text, // 検索する地名
        key: '2c4078063de045b8a9dae534fa87b241', // 自分のOpenCage Geocoding APIキーに置き換えてください
      });

      if (response.status.code === 200) {
        const { lat, lng } = response.results[0].geometry;
        console.log('緯度:', lat);
        console.log('経度:', lng);
        setLatitude(lat); // MapScreen内の状態を更新
        setLongitude(lng); // MapScreen内の状態を更新
      } else {
        console.log('Geocoding API エラー:', response.status.message);
      }
    } catch (error) {
      console.log('エラー:', error.message);
    }
  };

  const [text, setText] = React.useState('');

  return (
    <Provider>
      <Appbar.Header>
        <TextInput
          label="検索するスポットを入力"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
          style={{ width: '70%', marginLeft: '3%', marginBottom: '1.5%' }}
        />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="dots-vertical" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => navigation.navigate('Page2')}
            title="利用規約"
          />
          <Menu.Item
            onPress={() => {
              console.log('オプション2が押されました');
            }}
            title="アプリ使用方法"
          />
          <Menu.Item onPress={closeMenu} title="戻る" />
        </Menu>
      </Appbar.Header>
    </Provider>
  );
}




