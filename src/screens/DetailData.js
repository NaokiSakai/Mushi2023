import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';

export default function DetailData({ route }) {
  const { image, insect, address, time } = route.params;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: image }} />
        <Card.Content>
          <View style={styles.row}>
            <Avatar.Icon size={48} icon="bug" />
            <Paragraph style={styles.insect}>{insect}</Paragraph>
          </View>
          <Paragraph style={styles.address}>{address}</Paragraph>
          <Paragraph style={styles.time}>{time}</Paragraph>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insect: {
    marginLeft: 8,
    fontSize: 24,
    fontWeight: 'bold',
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
