import React, { useState } from 'react';
import { Appbar, TextInput, Menu, DefaultTheme } from 'react-native-paper';
import OpenCageGeocoder from 'opencage-api-client';
import { View } from 'react-native';

const geoKey = require('../../config/default.json').geoKey;

export default function Headers({setLatitude, setLongitude, setInsectName }) {
  const [text, setText] = useState('');
  const [additionalInputVisible, setAdditionalInputVisible] = useState(false);
  const [additionalInputText, setAdditionalInputText] = useState('');
  const [isArrowUpIcon, setIsArrowUpIcon] = useState(false);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#4c9753', // 薄暗い緑色に設定
    },
  };

  const handleSearch = async () => {
    try {
      console.log(additionalInputText);
      setInsectName(additionalInputText);
      const response = await OpenCageGeocoder.geocode({
        q: text,
        key: geoKey,
      });

      if (response.status.code === 200) {
        const { lat, lng } = response.results[0].geometry;
        console.log('緯度:', lat);
        console.log('経度:', lng);
        setLatitude(lat);
        setLongitude(lng);
      } else {
        console.log('Geocoding API エラー:', response.status.message);
      }
    } catch (error) {
      console.log('エラー:', error.message);
    }
  };


  const handleAdditionalInputToggle = () => {
    setAdditionalInputVisible(!additionalInputVisible);
    setAdditionalInputText('');
    setIsArrowUpIcon(!isArrowUpIcon);
  };

  const handleAdditionalInputChange = (text) => {
    setAdditionalInputText(text);
  };

  return (
    <Appbar.Header style={{ height: additionalInputVisible ? 125 : 70 ,backgroundColor:'#90a081' }}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Appbar.Action
            icon={isArrowUpIcon ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
            iconColor='#50511b'
            onPress={handleAdditionalInputToggle}
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
            iconColor='#50511b'
            onPress={handleSearch}
            style={{ width: 40, height: 40, marginLeft: 10, marginTop: 10, backgroundColor: '#d7e6b3' }}
          />

        </View>

        <View>
          {additionalInputVisible && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                label="検索する昆虫を入力"
                mode="outlined"
                value={additionalInputText}
                onChangeText={handleAdditionalInputChange}
                style={{ width: 270, marginLeft: '13%'}}
                theme={theme}
              />
            </View>
          )}
        </View>
      </View>
    </Appbar.Header>
  );
}
