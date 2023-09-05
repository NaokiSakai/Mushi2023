import React, { useState } from 'react';
import { Appbar, TextInput, Menu, DefaultTheme } from 'react-native-paper';
import OpenCageGeocoder from 'opencage-api-client';
import { View } from 'react-native';

export default function Headers({ navigation, back, setLatitude, setLongitude,setInsectName}) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [additionalInputVisible, setAdditionalInputVisible] = useState(false);
  const [additionalInputText, setAdditionalInputText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2E8B57', // 薄暗い緑色に設定
    },
  };

  const handleSearch = async () => {
    try {
      console.log(additionalInputText);
      setInsectName(additionalInputText);
      const response = await OpenCageGeocoder.geocode({
        q: text,
        key: '2c4078063de045b8a9dae534fa87b241',
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

  const handleDropdownOpen = () => {
    setVisible(true);
  };

  const handleDropdownClose = () => {
    setVisible(false);
  };

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
    handleDropdownClose();
  };

  const handleAdditionalInputToggle = () => {
    setAdditionalInputVisible(!additionalInputVisible);
    setAdditionalInputText('');
  };

  const handleAdditionalInputChange = (text) => {
    setAdditionalInputText(text);
  };

  return (
    <Appbar.Header style={{ height: additionalInputVisible ? 125 : 70 }}>
      <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Appbar.Action
          icon="arrow-down-drop-circle-outline"
          onPress={handleAdditionalInputToggle}
          style={{ width: 20, height: 25, marginLeft: 10 }}
        />
        <TextInput
          label="検索するスポットを入力"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
          style={{ width: 260, marginLeft: '3%', }}
          theme={theme}
        />

        <Appbar.Action
          icon="magnify"
          onPress={handleSearch}
          style={{ width: 20, height: 20, marginLeft: 10 }}
        />
        <Menu
          visible={visible}
          onDismiss={handleDropdownClose}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={handleDropdownOpen}
              style={{ width: 20, height: 20 }}
            />
          }
        >
          <Menu.Item onPress={() => navigation.navigate('Page2')} title="利用規約" />
          <Menu.Item
            onPress={() => {
              console.log('オプション2が押されました');
            }}
            title="アプリ使用方法"
            />
            <Menu.Item onPress={handleDropdownClose} title="戻る" />
        </Menu>
        </View>

            <View>
              {additionalInputVisible && (
                  <View style={{flexDirection: 'row' ,alignItems:'center'}}>
                    <TextInput
                      label="検索する昆虫を入力"
                      mode="outlined"
                      value={additionalInputText}
                      onChangeText={handleAdditionalInputChange}
                      style={{ width: 260, marginLeft: '13%',}}
                      theme={theme}
                    />
                  </View>
                )}
            </View>
      </View>
    </Appbar.Header>
      );
    }
    