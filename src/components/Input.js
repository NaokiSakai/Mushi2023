import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
    

const Input = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Name:', name);
    console.log('Email:', email);
   
    const Input = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [address, setAddress] = useState('');
    
      const handleSubmit = () => {
        // Handle form submission here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Address:', address);
      };
    
      return (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text>名前</Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10 }}
            />
          </View>
    
          <View style={{ marginBottom: 10 }}>
            <Text>Eメール</Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10 }}
            />
          </View>
    
          <View style={{ marginBottom: 10 }}>
            <Text>携帯番号</Text>
            <TextInput
              value={phone}
              onChangeText={text => setPhone(text)}
              style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10 }}
            />
          </View>
    
          <Button title="送信" onPress={handleSubmit} />
        </>
      );
    };
    
    
    console.log('Phone:', phone);
    console.log('Address:', address);
  };

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <Text>名前</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={{ width: '100%', borderWidth: 1, borderColor: 'gray', padding: 10 }}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>Eメール</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={{ width: '100%', borderWidth: 1, borderColor: 'gray', padding: 10 }}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>携帯番号</Text>
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          style={{ width: '100%', borderWidth: 1, borderColor: 'gray', padding: 10 }}
        />
      </View>

      <Button title="送信" onPress={handleSubmit} />
    </>
  );
};

export default Input;
