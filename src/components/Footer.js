// Footer.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BOTTOM_APPBAR_HEIGHT = 65;

export default function Footer() {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleReload = () => {
    navigation.replace('MapScreen'); // MapScreenにリロードするためにreplaceを使用
  };

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: 'white',
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <Appbar.Action style={[styles.icon]} icon="autorenew" onPress={() => navigation.navigate('Page2')}/>
      <Appbar.Action style={[styles.icon]} icon="map-marker-radius" onPress={handleReload} />
      <Appbar.Action style={[styles.icon]} icon="plus-circle-outline" onPress={() => navigation.navigate('PinMapPage')} />
      <Appbar.Action style={[styles.icon]} icon="email-outline" onPress={() => navigation.navigate('ContactForm')} />
    </Appbar>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    marginLeft: '10%',
    height: '80%',
    width: '11%',
  },
});
