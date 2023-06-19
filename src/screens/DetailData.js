import React, { Component } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Avatar, Card, Paragraph,Text} from 'react-native-paper';
import { format, setSeconds } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class DetailData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  formatAddress = (address) => {
    const { postcode, country, state, city, town, village, amenity, house_number,province,neighbourhood,shop,quarter,highway,leisure,building,county} = address;
    // 1. 郵便番号
    let formattedAddress = postcode ? postcode + ' ' : '';
    // 2. 国名
    formattedAddress += country ? country + ' ' : '';
    // 3. 都道府県
    formattedAddress += state ? state + ' ' : '';
    formattedAddress += province ? province + ' ' : '';
    // 4. 市町村
    formattedAddress += city ? city + ' ' : '';
    formattedAddress += county ? county + ' ' : '';
    formattedAddress += town ? town + ' ' : '';
    formattedAddress += quarter ? quarter + ' ' : '';
    formattedAddress += village ? village + ' ' : '';
    formattedAddress += neighbourhood ? neighbourhood + ' ' : '';
    // 5. 町庁、小字、字
    // formattedAddress += road ? road + ' ' : '';
    formattedAddress += highway ? highway + ' ' : '';
    // 6. 番地
    formattedAddress += house_number ? house_number + ' ' : '';
    // 7. 店名や施設名
    // formattedAddress += address.hasOwnProperty('amenity') ? address.amenity + ' ' : '';
    formattedAddress += shop ? shop + ' ' : '';
    formattedAddress += amenity ? amenity + ' ' : '';
    formattedAddress += leisure ? leisure + ' ' : '';
    formattedAddress += building ? building + ' ' : '';
    return formattedAddress.trim();
  };
  

  formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate();
    const formattedTime = format(setSeconds(dateObject, 0), 'yyyy/MM/dd HH:mm');
    return formattedTime;
  };

  fetchData = async () => {
    const { marker } = this.props.route.params;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${marker.latlng.latlng.latitude}&lon=${marker.latlng.latlng.longitude}&format=json`
    );
    const data = await response.json();
    // const formattedAddress = this.formatAddress(data.address);
    const formattedAddress = this.formatAddress(data.address);
    this.setState({ location: formattedAddress });
  };

  handleNavigation = () => {
    const { marker } = this.props.route.params;

    // 地図アプリのURLスキームを生成して起動
    const url = `http://maps.apple.com/?ll=${marker.latlng.latlng.latitude},${marker.latlng.latlng.longitude}&q=${this.state.location}`;
    Linking.openURL(url);
  };

  render() {
    const { marker } = this.props.route.params;
    const { location } = this.state;
    const formattedTime = this.formatTimestamp(marker.time);

    return (
      <View style={styles.container}>
        <Card>
          <View style={styles.imageContainer}>
            <Card.Cover source={{ uri: marker.photo }} style={styles.image} />
          </View>
          <Card.Content>
            <View style={styles.row}>
              <Avatar.Icon size={48} icon="bug" />
              <Paragraph style={styles.insect}>{marker.name}</Paragraph>
            </View>
            <Paragraph style={styles.address}>スポット名：{marker.address}</Paragraph>
            <Paragraph style={styles.time}>発見時刻：{formattedTime}</Paragraph>
            <Paragraph style={styles.time}>ピン住所：{location}</Paragraph>
            <Paragraph style={styles.time}>メモ：{marker.memo}</Paragraph>
            <TouchableOpacity style={styles.button} onPress={this.handleNavigation}>
              <Text style={styles.buttonText}>経路案内</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  insect: {
    marginLeft: 8,
    fontSize: 21,
    fontWeight: 'bold',
    padding: 6,
  },
  address: {
    marginVertical: 16,
    fontSize: 16,
  },
  time: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#2196F3',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
