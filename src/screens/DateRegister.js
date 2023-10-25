import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, IconButton, Card ,Text} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Modal, Portal,  PaperProvider,DefaultTheme } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Appbar } from 'react-native-paper';



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
  const [memo, setMemo] = useState('');
  const [time, setTime] = useState(new Date());
  const [photo, setPhoto] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [photoSelected, setPhotoSelected] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const markers = route.params.markers;
  const [location, setLocation] = useState(markers.location);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        marginLeft:'5%'
      };
  console.log(markers);
  const navigation = useNavigation();

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

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
      setPhotoSelected(true);
      setVisible(false)
    }
  };
  //写真を選択する
  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,//falseにしました
      allowsMultipleSelection: true,
      selectionLimit: 3, 
      // aspect: [1, 1],
      // quality: 1,
    });
    console.log(result)

    if (!result.cancelled) {
      setPhoto(result.uri);
      setPhotoSelected(true);
      setVisible(false)
    }
  };

  const handleCancelPhoto = () => {
    setPhoto(null);
    setPhotoSelected(false);
  };

  

  //firebaseへの登録処理
  const handleRegistration = async() => {
    // 登録処理を実行する
    try {
      const RegisterContent = {
        name,
        address,
        memo,
        time,
        photo,
        markers,
        location
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
    <PaperProvider theme={theme}>
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
        label="スポット名"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
      />
      <TextInput
        label="住所"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={styles.input}
      />
       <TextInput
        label="メモ"
        value={memo}
        onChangeText={(text) => setMemo(text)}
        style={styles.input}
        multiline
        numberOfLines={4}
        blurOnSubmit
      />
      <Text style={styles.label}>採取時間</Text>
      <DateTimePicker
        label="採取時間"
        value={time} // ここを修正
        mode="datetime"
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || time;
          setTime(currentDate);
        }}
        style={styles.Date}
      />
      <Card style={styles.Card}>
        {photo && (
          <Image source={{ uri: photo }} style={styles.photo} />
        )}
        {!photo && !photoSelected && (
          <View style={styles.cameraContainer}>
            <IconButton
              icon="camera"
              size={30}
              onPress={showModal}
              style={styles.cameraButton}
              disabled={!cameraPermission}
            />
          </View>
        )}
        {photoSelected && (
          <Button mode="outlined" onPress={handleCancelPhoto} style={styles.button}>
            選択を解除
          </Button>
        )}
      </Card>
    </View>
      <Appbar style={styles.Footer}>
        <Button mode="contained" onPress={() => handleRegistration()} style={styles.button2}>
          登録
        </Button>
      </Appbar>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
  cameraContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop:30
  },
  camera: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  cameraButton: {
    position: 'absolute',
    marginBottom:30
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
    backgroundColor: "#EFFBF5",
  },
  button: {
    marginTop: 8,
  },
  modal:{
   flex:0.4,
  },
  Date:{
    width:'60%'
  },
  Card:{
    marginTop:30,
    height:130,
  },
  button2:{
    // alignSelf: 'center',
    height: '50%',
    width: '50%',
    marginLeft:'25%'
  },
  Footer:{
    height:'12%'
  }

  // label: {
  //   marginRight: 8,
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E8B57', // 薄暗い緑色に設定
  },
};

