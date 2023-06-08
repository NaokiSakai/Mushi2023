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
import { useRoute } from '@react-navigation/native';
import { CustomMarker } from './CustomMarker';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCksrHuiQ4CafP7orUm8jmd1kmnhvIt8Gk",
  authDomain: "mushimapworld.firebaseapp.com",
  databaseURL: "https://mushimapworld-default-rtdb.firebaseio.com",
  projectId: "mushimapworld",
  storageBucket: "mushimapworld.appspot.com",
  messagingSenderId: "717364972455",
  appId: "1:717364972455:web:f8e0c51b6758c2432ec482",
  measurementId: "G-NGJBM2G1RB"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default function MapScreen() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [message, setMessage] = useState('位置情報取得中');
  const [markers, setMarkers] = useState([]);

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

  const fetchMarkers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Register'));
      const markersData = [];
      querySnapshot.forEach((doc) => {
      const data = doc.data().markers;
      markersData.push(data); // マーカーデータを追加する
      console.log(data);
      });
      setMarkers(markersData);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    getLocationAsync();
    fetchMarkers();
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
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              callout={<CustomMarker marker={marker} />}
            >
              <Image
                source={require('../../assets/beetle_1742.png')}
                style={{ height: 50, width: 50 }}
              />
            </Marker>
          ))}

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
  
      