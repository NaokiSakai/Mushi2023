import React from 'react';
import { Appbar, Provider, DefaultTheme } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import OpenCageGeocoder from 'opencage-api-client';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBack({setLatitude, setLongitude}) {
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
      <Appbar.BackAction onPress={() => navigation.navigate('MainMapPage')} />
        <TextInput
        label='検索するスポットを入力' 
        mode='outlined' 
        theme={theme}
        value={text} 
        onChangeText={text => setText(text)}
        style={{width:"70%",marginLeft:"3%",marginBottom:"1.5%"}}/>
        <Appbar.Action icon="magnify" onPress={_handleSearch} /> 
      </Appbar.Header>
    </Provider>
  );
}


