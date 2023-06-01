import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SubmitPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);

  const handleSubmit = () => {
    // 送信処理などの実装

    // 送信完了メッセージを表示
    setSnackbarVisible(true);

    // 入力値をリセット
    setName('');
    setEmail('');
    setAddress('');
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <Text>名前</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
          }}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Eメール</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
          }}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>お問い合わせ</Text>
        <TextInput
          value={address}
          onChangeText={text => setAddress(text)}
          style={{
            height: 100,
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
          }}
          multiline
        />
      </View>
      <Button mode="contained" onPress={handleSubmit}>
        送信
      </Button>

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
        style={{ backgroundColor: '#43A047' }}
      >
        送信が完了しました！
      </Snackbar>
    </View>
  );
};

export default SubmitPage;
