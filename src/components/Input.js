import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';

export default function Input() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);

  const handleSendEmail = () => {
    // Send email logic here
    const emailContent = {
      name,
      email,
      message,
    };
    // Replace the following console.log with your email sending code
    console.log('Sending email:', emailContent);

    // Show snackbar to indicate successful email submission
    setSnackbarVisible(true);
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="名前"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
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
      <Button mode="contained" onPress={handleSendEmail} style={styles.button}>
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
