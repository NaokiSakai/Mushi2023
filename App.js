import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  handleButtonPress = () => {
    Alert.alert(
      'Button pressed!',
      'You did it!',
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <Button
          title="Press me"
          style={styles.button}
          onPress={this.handleButtonPress}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});