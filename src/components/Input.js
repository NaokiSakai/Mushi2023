import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Text} from 'react-native';
import { TextInput, Button, Snackbar, Appbar } from 'react-native-paper';
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
  const [isMessageMaxLengthReached, setMessageMaxLengthReached] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isNameEmpty, setNameEmpty] = useState(false);
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [isMessageEmpty, setMessageEmpty] = useState(false);
  

  //firebaseの登録処理
  const handlepress = async () => {
    if (isEmailValid && !isMessageMaxLengthReached) {
      if (!name) {
        setNameEmpty(true);
      } else {
        setNameEmpty(false);
      }
      if (!email) {
        setEmailEmpty(true);
      } else {
        setEmailEmpty(false);
      }
      if (!message) {
        setMessageEmpty(true);
      } else {
        setMessageEmpty(false);
      }

      if (name && email && message) {
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

          // 入力フィールドをクリア
          setName('');
          setEmail('');
          setMessage('');

          // Show snackbar to indicate successful email submission
          setSnackbarVisible(true);
        } catch (error) {
        console.error('Error adding document: ', error);
        }  
      } else {
        if (!name) {
          setNameEmpty(true);
        }
        if (!email) {
          setEmailEmpty(true);
        }
        if (!message) {
          setMessageEmpty(true);
        }
      }
      }  
  };
  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };
  const handleMessageChange = (text) => {
    setMessage(text);
    if (text.length > 600) {
      setMessageMaxLengthReached(true);
    } else {
      setMessageMaxLengthReached(false);
    }
  };
  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailValid(validateEmail(text)); // Eメールの形式を確認
  };

  const validateEmail = (email) => {
    // 正規表現パターンでEメールの形式をチェックします
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const messageCharacterCount = message.length;
  const messageCharacterLimit = 600;

  return (
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TextInput
            label="名前"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            color="#2E8B57" // テキストの色を薄緑色に設定
            placeholder='山田太郎'
            placeholderTextColor={'#808080'}
          />
          <TextInput        
            label="Eメール"
            value={email}
            onChangeText={handleEmailChange}
            style={styles.input}
            keyboardType="email-address"
            color={isEmailValid ? '#2E8B57' : 'red'}
            placeholder='××××××＠××××.com'
            placeholderTextColor='##808080' // プレースホルダーのテキストの色を設定
          />
          {isEmailValid ? null : (
            <Text style={styles.errorText}>
            正しいEメールアドレスの形式ではありません
            </Text>
          )}
          <TextInput
            label={`メッセージ (${messageCharacterCount}/${messageCharacterLimit}文字)`}
            value={message}
            onChangeText={handleMessageChange}
            style={styles.input}
            multiline
            maxLength={600}
            minHeight={250}
            maxHeight={250}  
            color="#2E8B57" // テキストの色を薄緑色に設定
          />
          <Text style={styles.errorText}>
            {isNameEmpty && "名前が入力されていません"}
            {isEmailEmpty && "Eメールが入力されていません"}
            {isMessageEmpty && "メッセージが入力されていません"}
          </Text>
          {isMessageMaxLengthReached && (
            <Text style={styles.maxLengthMessage}>
              これ以上入力できません
            </Text>
          )}
          <Snackbar
            visible={isSnackbarVisible}
            onDismiss={handleSnackbarDismiss}
            duration={3000}
          >
            お問い合わせメールが送信されました
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
      <Appbar style={styles.Footer}>
          <Button 
          mode="contained" 
          onPress={handlepress} 
          style={styles.button}
          >
            送信
          </Button>
      </Appbar>
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
    backgroundColor: "#EFFBF5",
  },
  button: {
    alignSelf: 'center',
    height: '50%',
    width: '50%',
  }, 
  maxLengthMessage: {
    color: 'red',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  Footer:{
    height:'12%',
    justifyContent: 'center', // フッターの中央揃え
    alignItems: 'center', // フッターの中央揃え
  },
});