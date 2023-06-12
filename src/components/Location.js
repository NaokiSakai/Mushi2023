import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export async function getLocationAsync() {
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
}
  