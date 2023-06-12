import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

const Input = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Address:', address);
  };

  return (
    <View style={{ 
      height: 600,
      width: '100%',
      padding: 20, 
      borderWidth: 1, 
      borderColor: 'gray' 
      }}>
      <View style={{ marginBottom: 10 }}>
        <Text>名前</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={{ 
            width: '100%',
            borderWidth: 1,
            borderColor: 'gray', 
            padding: 10 
          }}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Eメール</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={{ 
            width: '100%',
            borderWidth: 1, 
            borderColor: 'gray', 
            padding: 10 
          }}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>お問い合わせ</Text>
        <TextInput
          value={address}
          onChangeText={text => setAddress(text)}
          style={{ 
            height:300,
            width: '100%',
            borderWidth: 1,
            borderColor: 'gray', 
            padding: 10 
          }}
          multiline
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button
          title="送信"
          onPress={handleSubmit}
          color="#007AFF"
          style={{ backroundColor:"B0C4DE"}}
        />
      </View>

    </View>
  );
};

export default Input;
