import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker } from 'react-native-maps';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, where,query} from 'firebase/firestore';
import Headers from './Headers';
import { Provider } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import MapView  from "react-native-map-clustering";
import includes from 'includes';



const firebaseConfig = {
  // Firebaseの設定情報
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
  const [message, setMeMssage] = useState('位置情報取得中');
  const [markers, setMarkers] = useState([]);
  const [insectName, setInsectName] = useState('');
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);

  //現在値を取得移動
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

//マップの可視範囲が変更された時に実行される関数
const handleRegionChange = async (region) => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

  
  // 可視範囲内のピンのクエリを作成
  const registerCollection = collection(db, 'Register');
  const querySnapshot = await getDocs(
    query(
      registerCollection,
      where('markers.latlng.latitude', '>=', latitude - latitudeDelta / 2),
      where('markers.latlng.latitude', '<=', latitude + latitudeDelta / 2)
    )
  );


    // Firebaseから取得件数が10件以下の場合の処理
    const visibleMarkersData = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.markers.latlng.longitude >= longitude - longitudeDelta / 2 &&
        data.markers.latlng.longitude <= longitude + longitudeDelta / 2 &&
        insectName == ''
      ) {
        const markerData = {
          latlng: data.markers,
          location: data.location,
          time: data.time,
          address: data.address,
          memo: data.memo,
          name: data.name,
          photo: data.photo,
        };
        visibleMarkersData.push(markerData);
        if(visibleMarkersData.length>30){
            console.log("############################################################################")
            setShowMessage(true);
        }else{
          console.log(markerData);
          setShowMessage(false);
        }
      }else if(
      data.markers.latlng.longitude >= longitude - longitudeDelta / 2 &&
      data.markers.latlng.longitude <= longitude + longitudeDelta / 2 &&
      typeof data.name === 'string' && data.name.includes(insectName)){
        const markerData = {
          latlng: data.markers,
          location: data.location,
          time: data.time,
          address: data.address,
          memo: data.memo,
          name: data.name,
          photo: data.photo,
        };
        visibleMarkersData.push(markerData);
        if(visibleMarkersData.length>30){
          console.log("############################################################################")
          setShowMessage(true);
      }else{
        console.log(markerData);
        setShowMessage(false);
      }
      }
    });
    setVisibleMarkers(visibleMarkersData);
    // setShowMessage(false);
};

  useEffect(() => {
    getLocationAsync();
    // fetchMarkers();
  }, []);

  useEffect(() => {
      handleRegionChange({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      });
  }, [latitude, longitude, insectName]);

  const handleReload = () => {
    getLocationAsync();
  };

  const handleFetchMarkers = async () => {
    await handleRegionChange({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,});
  };

  if (latitude && longitude) {
    return (
      <View style={styles.container}>
        <Provider>
        <Headers setLatitude={setLatitude} setLongitude={setLongitude} setInsectName={setInsectName}/>
        <View style={{ flex: 1 }} >
        {showMessage && (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>ピンが多すぎます。マップを拡大してください</Text>
              </View>
         )}
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          showsUserLocation={true}
          clusterColor="#2E8B57"
          clusterStyle={{
            width: 100,
            height: 100,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2E8B57',
          }}
          animationEnabled={false}
          onRegionChangeComplete={handleRegionChange} // マップの可視範囲が変更された時に実行される関数を設定
        >

          {showMessage == false && visibleMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng.latlng}
              onPress={() => navigation.navigate('DetailData', { marker: marker })}
            >
              <Image
                source={require('../../assets/beetle_1742.png')}
                style={{ height: 50, width: 50 }}
              />
            </Marker>
          ))}
        </MapView>
        {/* <MapView
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
                coordinate={marker.latlng.latlng}
                onPress={() => navigation.navigate('DetailData', { marker: marker })}
              >
                <Image
                  source={require('../../assets/beetle_1742.png')}
                  style={{ height: 50, width: 50 }}
                />
              </Marker>
            ))}
          </MapView> */}
        </View>
        <Footer onGetLocation={handleReload} onFetchMarkers={handleFetchMarkers} />
        </Provider>
      </View>     
    );
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} color={MD2Colors.green800} size={'large'} />
      <Text>現在地取得中</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  Header:{
    height:110,
  },
  messageText:{
    fontSize:15,
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
  },
  messageContainer:{
    position: 'relative',
    width: '100%',
    backgroundColor: '#2E8B57',
    padding: 10,
    marginTop: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,

  }
});


