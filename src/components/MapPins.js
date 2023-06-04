import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';


const STATUS_BAR_HEIGHT = Platform.OS == 'ios' ? 20 : statusbar.currentHeight;

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
    },
  ]);

  useEffect(() => {
    getLocationAsync();
  }, []);

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

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    alert(`緯度: ${latitude}, 経度: ${longitude}`);
    const newMarkers = [
      ...markers,
      {
        latlng: {
          latitude: latitude,
          longitude: longitude,
        },
      },
    ];

    setMarkers(newMarkers);

    navigation.navigate('Page2', { markers: newMarkers });

  };

  if (latitude && longitude) {
    return (
      <View style={styles.container}>
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
        {/* {this.state.markers.map((markers, index) => (
              <Marker
                key={index}
                coordinate={markers.latlng}
              >
                <Image source={require('../../assets/beetle_1742.png')} style={{height: 50, width:50 }} />
              </Marker>
             ))} */}

          </MapView>
          {/* <TouchableOpacity onPress={this.getLocationAsync}style={styles.now}>
            <Text>現在地取得</Text> 
            <Image 
              resizeMode='contain'
              source={require(`../../assets/favicon.png`)} 
              style={{width:20,height:20,transform: [{ rotate: '340deg' }], }}
              />
          </TouchableOpacity> */}

      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../assets/wood_kabutomushi_11494.png')} />
      <Text>{message}</Text>
    </View>
  );
};

export default MapPin;

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUS_BAR_HEIGHT,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  warningTextContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 75,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  now: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
});

