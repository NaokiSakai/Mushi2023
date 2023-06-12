import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// カスタムのテーマオブジェクトを作成
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E8B57', // 薄暗い緑色に設定
  },
};

const firebaseConfig = {
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

export default function Input() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);

  //firebaseの登録処理
  const handlepress = async () => {
    try {
      const emailContent = {
        name,
        email,
        message,
      };

      const docRef = await addDoc(collection(db, 'Email'), emailContent);
      console.log('Document written with ID: ', docRef.id);

      // Send email logic here
      console.log('Sending email:', emailContent);

      // Show snackbar to indicate successful email submission
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
      <TextInput
        label="名前"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
        underlineColor="#2E8B57" // テキスト入力範囲の下線の色を薄緑色に設定

      />
      <TextInput        
        label="Eメール"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="メッセージ"
        value={message}
        onChangeText={text => setMessage(text)}
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <Button mode="contained" onPress={handlepress} style={styles.button}>
        送信
      </Button>
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
        お問い合わせメールが送信されました
      </Snackbar>
    </View>
    </PaperProvider>
   
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
