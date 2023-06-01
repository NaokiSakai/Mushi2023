import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import Footer from './Footer';

const STATUS_BAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;

// Map.js

export default function MapScreen() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [message, setMessage] = useState('位置情報取得中');

  const getLocationAsync = async () => {
    console.log('現在位置取得中');
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setMessage('位置情報のパーミッションの取得に失敗しました。');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    let longitude = '経度:' + JSON.stringify(location.coords.longitude);
    let latitude = '緯度:' + JSON.stringify(location.coords.latitude);
    console.log(longitude);
    console.log(latitude);
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  const handleReload = () => {
    getLocationAsync();
  };

  if (latitude && longitude) {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          showsUserLocation={true}
        >
        </MapView>
        <Footer handleReload={handleReload} />
      </View>
    );
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../assets/wood_kabutomushi_11494.png')} />
      <Text>{message}</Text>
    </View>
  );
}  
const styles = StyleSheet.create({
    container: {
      paddingTop: STATUS_BAR_HEIGHT,
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });
