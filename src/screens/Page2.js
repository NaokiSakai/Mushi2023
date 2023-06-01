import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function Page2({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const cameraRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleRegistration = () => {
    // 登録処理を実行する
    console.log('Registration:', name, email, phone, photo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <IconButton
          icon="camera"
          size={30}
          onPress={handleTakePhoto}
          style={styles.cameraButton}
          disabled={!cameraPermission}
        />
      </View>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <Button mode="contained" onPress={handleChoosePhoto} style={styles.button}>
        写真を選択
      </Button>
      <TextInput
        label="名前"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="メールアドレス"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="電話番号"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegistration} style={styles.button}>
        登録
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  cameraContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  camera: {
    width: 200,
    height: 200,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 16,
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

