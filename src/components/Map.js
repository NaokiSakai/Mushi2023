import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Footer from './Fooder';

export default class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 初期表示位置を設定
      region: {
        latitude: 35.645736,
        longitude: 139.747575,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      urlTemplate: 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.jpg',
      markers: [
        {
          key: 'tamachiStation',
          latlng: {
            latitude: 35.645736,
            longitude: 139.747575,
          },
          title: '田町駅',
          description: '田町ニューデイズ',
        },
      ],
    };
  }

   onRegionChange(region) {
    console.log("onReasionChange");
    console.log(region);
    this.setState({ region });
  }

  componentDidMount() {
    console.log("画面起動")
    // 現在位置を読み込む
    this._getLocationAsync();
  }

  // 現在位置の取得
  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Status");
    console.log(status);
    if (status !== 'granted') {
      this.setState({
      submitMessage: '位置情報の取得が許可されませんでした。',
      });
    }else if(status === 'granted'){
      console.log("getCurrentPositionAsync");
      await Location.getCurrentPositionAsync({}).then((location) => {
        let longitude = '経度:' + JSON.stringify(location.coords.longitude);
        let latitude = '緯度:' + JSON.stringify(location.coords.latitude);
        console.log(longitude);
        console.log(latitude);
        // 現在位置をMap Viewの中心に更新
        this.setState({
          region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        })

      }).catch((e) => {
        console.log("現在位置取得失敗");
        console.log(e);
      });

    }
  };



  render() {
    return (
      <View style={styles2.container}>

        <MapView 
        style={styles2.map}
        onRegionChange={this.componentDidMount.bind(this)}
        region={this.state.region}
        >
        <UrlTile
            urlTemplate={this.state.urlTemplate}
            maximumZ={19}
            mapType={'none'}
          />

          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
