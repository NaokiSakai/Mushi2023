import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, IconButton, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Modal, Portal,  PaperProvider } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

//firebaseに必要な値
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



export default function DateRegister({ route}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const markers = route.params.markers;
  console.log(markers);
  const navigation = useNavigation();

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

  //写真を撮る
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
  //写真を選択する
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
  //firebaseへの登録処理
  const handleRegistration = async() => {
    // 登録処理を実行する
    try {
      const RegisterContent = {
        name,
        address,
        time,
        photo,
        markers,
      };

      const docRef = await addDoc(collection(db, 'Register'), RegisterContent)
      navigation.navigate('MapScreen');
      console.log('Document written with ID: ', docRef.id);

      // Send email logic here
      console.log('Sending email:', RegisterContent);

      
    } catch (error) {
      console.error('Error adding document: ', error);
    }
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
      {/* <Button mode="contained" onPress={() => navigation.navigate('MapScreen', markers)} style={styles.button}>
        登録
      </Button> */}
      <Button mode="contained" onPress={() => handleRegistration()} style={styles.button}>
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

