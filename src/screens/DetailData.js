import React, { Component } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Avatar, Card, Paragraph,Text} from 'react-native-paper';
import { format, setSeconds } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class DetailData extends Component {
  formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate();
    const formattedTime = format(setSeconds(dateObject, 0), 'yyyy/MM/dd HH:mm');
    return formattedTime;
  };

  handleNavigation = () => {
    const { marker } = this.props.route.params;

    // 地図アプリのURLスキームを生成して起動
    const url = `http://maps.apple.com/?ll=${marker.latlng.latlng.latitude},${marker.latlng.latlng.longitude}&q=${marker.latlng.location}`;
    Linking.openURL(url);
  };

  render() {
    const { marker } = this.props.route.params;  
    const formattedTime = this.formatTimestamp(marker.time);

    return (
      <View style={styles.container}>
        <Card style={{backgroundColor:'#EFFBF5'}}>
          <View style={styles.imageContainer}>
            <Card.Cover source={{ uri: marker.photo }} style={styles.image} />
          </View>
          <Card.Content>
            <View style={styles.row}>
              <Avatar.Icon size={48} icon="bug" style={{backgroundColor:'#2E8B57'}}/>
              <Paragraph style={styles.insect}>{marker.name}</Paragraph>
            </View>
            <Paragraph style={styles.address}>スポット名：{marker.address}</Paragraph>
            <Paragraph style={styles.time}>発見時刻：{formattedTime}</Paragraph>
            <Paragraph style={styles.time}>ピン住所：{marker.location}</Paragraph>
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
    backgroundColor: '#2E8B57',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
