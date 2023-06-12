import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';

//Makerをタップしたときに表示する情報

//routeはMap.jsのmarkerがDetailDataに遷移する際に渡される引数
export default function DetailData({ route }) {
  const marker = route.params.marker;

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
          <Paragraph style={styles.address}>住所：{marker.address}</Paragraph>
          <Paragraph style={styles.time}>発見時刻：{marker.time}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
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
    width: 300, // 画像の幅を指定
    height: 300, // 画像の高さを指定
    resizeMode: 'cover', // 画像のリサイズモード
    margin:10
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
});
