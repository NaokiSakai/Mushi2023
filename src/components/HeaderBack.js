import React from 'react';
import { Appbar, Provider, DefaultTheme } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import OpenCageGeocoder from 'opencage-api-client';
import { useNavigation } from '@react-navigation/native';

const geoKey = require('../../config/default.json').geoKey;

export default function HeaderBack({ setLatitude, setLongitude }) {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2E8B57', // 薄暗い緑色に設定
    },
  };
  const navigation = useNavigation();
  // 検索
  const _handleSearch = async () => {
    try {
      const response = await OpenCageGeocoder.geocode({
        q: text, // 検索する地名
        key: geoKey, // 自分のOpenCage Geocoding APIキーに置き換えてください
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
        <Appbar.BackAction
          onPress={() => navigation.navigate('メインマップ')}
          style={{ width: 20, height: 25, marginLeft: 10 }}
        />
        <TextInput
          label="検索するスポットを入力"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
          style={{ width: 270, marginLeft: '3%', }}
          theme={theme}
        />

        <Appbar.Action
          icon="magnify"
          onPress={_handleSearch}
          style={{ width: 40, height: 40, marginLeft: 10, marginTop: 10, backgroundColor: '#b5d4bf' }}
        />
      </Appbar.Header>
    </Provider>
  );
}


