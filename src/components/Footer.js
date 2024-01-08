// Footer.js
import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import { Appbar,Menu} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BOTTOM_APPBAR_HEIGHT = 65;

export default function Footer({ onGetLocation, onFetchMarkers }) {
  const [visible, setVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleDropdownOpen = () => {
    setVisible(true);
  };

  const handleDropdownClose = () => {
    setVisible(false);
  };
  
  const handleGetLocation = () => {
    onGetLocation();
  };

  const handleFetchMarkers = () => {
    onFetchMarkers();
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
      <Appbar.Action style={[styles.icon]} icon="map-marker-radius" onPress={handleGetLocation} />
      <Appbar.Action style={[styles.icon]} icon="plus-circle-outline" onPress={() => navigation.navigate('ピン配置マップ')} />
      <Appbar.Action style={[styles.icon]} icon="email-outline" onPress={() => navigation.navigate('お問合せ')} />
      <Menu
        visible={visible}
        style={styles.menuContainer}
        onDismiss={handleDropdownClose}
        anchor={
          <Appbar.Action
            icon="question"
            onPress={handleDropdownOpen}
          />
        }
      >
        <Menu.Item  style={[styles.menu]} onPress={() => navigation.navigate('利用規約')} title="利用規約" />
        <Menu.Item  style={[styles.menu]} onPress={() => navigation.navigate('使い方ガイド')} title="使い方ガイド" />
        <Menu.Item  style={[styles.menu]} onPress={handleDropdownClose} title="戻る" />
      </Menu>
    </Appbar>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    marginLeft: '5%',
    backgroundColor: 'transparent',
  },
  menu: {
    backgroundColor: "#EFFBF5",
  },
  
});

