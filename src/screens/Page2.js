import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, IconButton, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
// import { Camera } from 'expo-camera';
import { Modal, Portal,  PaperProvider } from 'react-native-paper';


export default function Page2({ navigation,route}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const markers = route.params.markers;
  console.log(markers);
  //const cameraRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      };

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
    console.log('Registration:', name, address, time, photo);
  };

  return (
    <PaperProvider>
    <View style={styles.container}>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Button mode="contained" onPress={handleTakePhoto} style={styles.button}>
            写真を撮影
          </Button>
          <Button mode="contained" onPress={handleChoosePhoto} style={styles.button}>
            写真を選択
          </Button>
        </Modal>
        </Portal>

      <TextInput
        label="採れる昆虫"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="住所"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
      />
      <TextInput
        label="採取時間"
        value={time}
        onChangeText={(text) => setTime(text)}
        style={styles.input}
      />
      <Card>
       {photo && <Image source={{ uri: photo }} style={styles.photo} />}
       </Card>
       {/* <TextInput
          label="写真"
          value={photo}
          onChangeText={(text) => setPhoto(text)}
          style={styles.input}
        /> */}
      <View style={styles.cameraContainer}>
        <IconButton
          icon="camera"
          size={30}
          onPress={showModal}
          style={styles.cameraButton}
          disabled={!cameraPermission}
        />
      <Button mode="contained" onPress={() => navigation.navigate('MapScreen', markers)} style={styles.button}>
        登録
      </Button>

      </View>
    </View>
    </PaperProvider>
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
    marginTop:15
  },
  camera: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 16,
    marginBottom:20
  },
  photo: {
    width: 100,
    height: 100,
    marginTop:16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  modal:{
   flex:0.4,
  }
});

