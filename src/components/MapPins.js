import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import HeaderBack from './HeaderBack';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const MapPin = () => {
  const navigation = useNavigation();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [message, setMessage] = useState('位置情報取得中');
  const [markers, setMarkers] = useState([
    {
      latlng: {
        latitude: undefined,
        longitude: undefined,
      },
      location: '',
    },
  ]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  //現在値の経度と緯度を取得しsetする処理
  const getLocationAsync = async () => {
    console.log('現在位置取得中');
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setMessage('位置情報のパーミッションの取得に失敗しました。');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  //タップした位置の経度緯度を取得
  const handlePress = async (event) => {
    try {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      const location = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (location.length > 0) {
        const address = location[0];
        // 住所情報の取得
        const formattedAddress = `${address.postalCode} ${address.country} ${address.region} ${address.city} ${address.street}`;
        const newMarkers =
        // ...markers,
        {
          latlng: {
            latitude: latitude,
            longitude: longitude,
          },
          location: formattedAddress
        };
        setMarkers(newMarkers);
        //ページ遷移先にタップした経度緯度のデータを渡す
        navigation.navigate('昆虫登録', { markers: newMarkers });
      } else {
        console.log('住所情報が見つかりませんでした。');
      }
    } catch (error) {
      console.log('逆ジオコーディングエラー:', error);
    }
  };

  if (latitude && longitude) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBack setLatitude={setLatitude} setLongitude={setLongitude} />
        </View>
        <View style={styles.warningTextContainer}>
          <Text style={styles.warningText}>タップして情報を追加してください</Text>
        </View>
        <MapView
          style={{ flex: 0.99 }}
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
          onPress={handlePress}
        >
        </MapView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} color={MD2Colors.green800} size={'large'} />
      <Text>{message}</Text>
    </View>
  );
};

export default MapPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  warningTextContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#2E8B57',
    padding: 10,
    marginTop: 13,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  warningText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  now: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  header: {
    height: 100
  }
});


