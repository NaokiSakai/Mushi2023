import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Linking, ScrollView, Image, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Card, Paragraph, Text, Button, IconButton, DefaultTheme, Provider, TextInput, MD3Colors, Divider } from 'react-native-paper';
import Modal from "react-native-modal";
import { format, setSeconds } from 'date-fns';
import { getFirestore, collection, getDocs, where, query, limit, QuerySnapshot, addDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import * as ImagePicker from 'expo-image-picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const firebaseConfig = require('../../config/default.json').firebaseConfig;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function DetailData({ route }) {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [visibleComment, setVisibleComment] = useState([]);
  const [openedPostData, setOpenedPostData] = useState(null);
  const [photo, setPhoto] = useState([]);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [photoSelected, setPhotoSelected] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const maxSelections = 3 - photo.length;
  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    maxHeight: '60%', // 最大の高さ
    minHeight: '38%', // 最小の高さ
    marginLeft: '0%'
  };

  const containerStyle2 = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '38%',
    marginLeft: '5%'
  };

  const { marker } = route.params;

  const getAllData = async () => {
    const registerCollection = collection(db, 'Register');
    const querySnapshot = await getDocs(
      query(
        registerCollection,
        where('markers.location', '==', marker.latlng.location),
        where('name', '==', marker.name),
      ),
    );

    if (querySnapshot.empty) {
      console.log("条件に一致するデータはありません。");
    } else {
      querySnapshot.forEach((doc) => {
        const allData = doc.data()
        const formattedTime = formatTimestamp(allData.time);
        const markerData = {
          name: allData.name,
          location: allData.location,
          time: formattedTime,
          address: allData.address,
          memo: allData.memo,
          photo: allData.photo,
        };
        setData(markerData);
        setDataLoaded(true);
        setOpenedPostData({
          docId: doc.id, // ドキュメントのIDを保存
        });
        console.log(data);
      })
    }
  }

  const formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate();
    const formattedTime = format(setSeconds(dateObject, 0), 'yyyy/MM/dd HH:mm');
    return formattedTime;
  };

  const handleNavigation = () => {
    const { marker } = route.params;
    const url = `http://maps.apple.com/?ll=${marker.latlng.latlng.latitude},${marker.latlng.latlng.longitude}&q=${marker.latlng.location}`;
    Linking.openURL(url);
  };

  const getComment = async () => {
    try {
      const registerCollection = collection(db, 'Register');
      const querySnapshot = await getDocs(
        query(
          registerCollection,
          where('markers.location', '==', marker.latlng.location),
          where('name', '==', marker.name),
        ),
      );

      if (!querySnapshot.empty) {
        // 既存のドキュメントがある場合は、最初のドキュメントを取得してコメントを追加
        const docData = querySnapshot.docs[0].data();
        // commentsフィールドが既に存在する場合は、既存の配列にコメントを追加
        const updatedComments = [...docData.comments];
        setVisibleComment(updatedComments);
        console.log('コメントが取得されました。');
      } else {
        console.log('条件に一致するデータはありません。');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendComment = async () => {
    try {
      const registerCollection = collection(db, 'Register');
      const querySnapshot = await getDocs(
        query(
          registerCollection,
          where('markers.location', '==', marker.latlng.location),
          where('name', '==', marker.name),
        ),
      );

      if (!querySnapshot.empty) {
        // 既存のドキュメントがある場合は、最初のドキュメントを取得してコメントを追加
        const docRef = querySnapshot.docs[0].ref;
        const docData = querySnapshot.docs[0].data();

        // commentsフィールドが既に存在する場合は、既存の配列にコメントを追加
        const timestamp = new Date().toLocaleString();
        console.log(timestamp);
        const updatedComments = docData.comments ? [...docData.comments, { name, comment, timestamp, photo }] : [{ name, comment, timestamp, photo }];

        // ドキュメントの更新
        await updateDoc(docRef, { comments: updatedComments });
        setVisibleComment(updatedComments);
        setVisible(false);
      } else {
        console.log('条件に一致するデータはありません。');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButtonPress = () => {
    setShowDeleteModal(true);
  };

  const sendRequest = async () => {
    try {
      // DeleteRequestsという新しいコレクションに送信する
      const deleteRequestsCollection = collection(db, 'DeleteRequests');

      // ドキュメントIDと関連データを送信する
      const docRef = await addDoc(deleteRequestsCollection, {
        documentId: openedPostData.docId
      });

      setShowDeleteModal(false);

      console.log('削除依頼が送信されました。', docRef.id);
    } catch (error) {
      console.error('削除依頼の送信中にエラーが発生しました。', error);
    }
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
    console.log(imageUrl)
  };

  //写真を選択する
  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,//falseにしました
      allowsMultipleSelection: true,
      selectionLimit: maxSelections,
    });
    console.log(result);
    if (!result.canceled) {
      const selectedPhoto = result.assets.map(asset => asset.uri); // 選択した写真のURIを配列に変換
      setPhoto([...photo, ...selectedPhoto]); // 選択した写真を配列に一括追加
      setVisible(true);
    }
  };

  const handleRemovePhoto = (index) => {
    const updatedPhoto = [...photo];
    updatedPhoto.splice(index, 1);
    setPhoto(updatedPhoto);
  };

  const _renderCarouselItem = ({ item }) => (
    <Card.Cover
      source={{ uri: item }}
      style={styles.image}
      resizeMode="contain"
      onPress={() => handleImagePress(item)} // Add an onPress handler for image modal
    />
  );

  useEffect(() => {
    getAllData();
    getComment();
    // fetchMarkers();
  }, []);

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Modal isVisible={visible} onBackdropPress={hideModal} style={styles.modal} >
            <View style={containerStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'left', marginBottom: 10, width: '100%' }}>
                <TextInput
                  style={{
                    width: '65%', height: 38,
                    borderWidth: 1,
                    borderColor: '#4c9753',
                    backgroundColor: "#EFFBF5",
                    marginRight: '5%'
                  }}
                  color="#4c9753" // テキストの色を薄緑色に設定
                  placeholder='名前'
                  placeholderTextColor={'#808080'}
                  value={name}
                  onChangeText={text => setName(text)}
                />

                <Button mode="contained" style={{ height: 42, borderRadius: 5, alignItems: 'center', backgroundColor: '#4c9753' }} onPress={sendComment}>
                  送信
                </Button>
              </View>

              <TextInput
                style={styles.input}
                color="#4c9753"
                label={`コメント (${comment.length}/80文字)`}
                placeholderTextColor='#808080'
                editable
                multiline
                maxLength={80}
                minHeight={180}
                maxHeight={180}
                value={comment}
                onChangeText={text => setComment(text)}
              />

              <Card style={styles.Card}>
                <View style={styles.horizontalImageContainer}>
                  {photo.map((photoUri, index) => (
                    <View style={styles.photoContainer}>
                      <Image source={{ uri: photoUri }} style={styles.photo} />
                      <IconButton
                        icon="close"
                        size={10}
                        style={styles.closeButton}
                        onPress={() => handleRemovePhoto(index)}
                      />
                    </View>
                  ))}
                  {photo.length < 3 && (
                    <View style={styles.cameraContainer}>
                      <IconButton
                        icon="camera-plus"
                        size={30}
                        onPress={handleChoosePhoto}
                        style={styles.cameraButton}
                        disabled={!cameraPermission}
                      />
                    </View>
                  )}
                </View>
              </Card>
            </View>
          </Modal>
        </TouchableWithoutFeedback>

        <Modal isVisible={showDeleteModal} onBackdropPress={() => setShowDeleteModal(false)} style={styles.deleteModal}>
          <View style={containerStyle2}>
            <Text style={{ marginBottom: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>削除依頼</Text>
            <Text style={{ marginBottom: 15, color: 'gray', fontSize: 15 }}>投稿された内容が間違っているの場合、
              不適切なコンテンツが含まれている場合に投稿の削除を運営に依頼することができます。</Text>
            <Text style={{ marginBottom: 15, color: 'gray', fontSize: 15 }}>このスポットの削除を依頼しますか？</Text>
            <Button onPress={sendRequest}>はい</Button>
            <Button onPress={() => setShowDeleteModal(false)}>いいえ</Button>
          </View>
        </Modal>

        <Modal isVisible={showImageModal} onBackdropPress={() => setShowImageModal(false)} style={styles.imageModal}>
          <View style={styles.imageModalContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        </Modal>



        {dataLoaded ? ( // データが読み込まれた後にUIを表示
          <ScrollView keyboardShouldPersistTaps="handled">
            <Card style={{ backgroundColor: '#EFFBF5' }}>
              <View style={styles.imageContainer}>
                <Carousel
                  data={data.photo}
                  renderItem={_renderCarouselItem}
                  sliderWidth={Dimensions.get("window").width}
                  itemWidth={Dimensions.get("window").width}
                  onSnapToItem={(index) => setActiveSlide(index)}
                />

                <Pagination
                  dotsLength={data.photo.length}
                  activeDotIndex={activeSlide}
                  containerStyle={{ paddingVertical: 15 }}
                />
              </View>
              <Card.Content>
                <View style={styles.row}>
                  <Avatar.Icon size={48} icon="bug" style={{ backgroundColor: '#4c9753' }} />
                  <Paragraph style={styles.insect}>{data.name}</Paragraph>
                </View>
                <Paragraph style={styles.address}>スポット名：{data.address}</Paragraph>
                <Paragraph style={styles.time}>発見時刻：{data.time}</Paragraph>
                <Paragraph style={styles.time}>ピン住所：{data.location}</Paragraph>
                <Paragraph style={styles.time}>メモ：{data.memo}</Paragraph>
                <View style={styles.buttonContainer}>
                  <Button style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>経路案内</Text>
                  </Button>
                  <IconButton
                    icon="comment"
                    size={22}
                    color={DefaultTheme.colors.text}
                    iconColor={MD3Colors.neutral100}
                    style={styles.commentButton}
                    onPress={showModal}
                  />
                  <IconButton
                    icon="trash-can"
                    size={22}
                    color={DefaultTheme.colors.text}
                    iconColor={MD3Colors.neutral100}
                    style={styles.commentDelete}
                    onPress={handleDeleteButtonPress}
                  />
                </View>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Text style={styles.commentText}>コメント数 {visibleComment.length}</Text>
              <Divider />
              {visibleComment.map((comment) => (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 7, marginTop: 7, fontWeight: 'bold' }}>{comment.name}</Text>
                    <Text style={{ marginLeft: 7, marginTop: 7, color: 'gray' }}>{comment.timestamp}</Text>
                  </View>
                  <Text style={{ marginLeft: 7, marginTop: 3, marginBottom: 7, fontSize: 17 }}>{comment.comment}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {comment.photo.map((photoUri, index) => ( // 写真が存在する場合のみ表示
                      <View>
                        <TouchableOpacity onPress={() => handleImagePress(photoUri)}>
                          <Image source={{ uri: photoUri }} style={styles.image2} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <Divider />
                </View>
              ))}
            </Card>
          </ScrollView>
        ) : (
          // データが読み込まれるまでローディング画面を表示
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },

  image: {
    height: 300,
    margin: 10,
    marginLeft: 35,
    marginRight: 35
  },

  image2: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginTop: 0,
    margin: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  insect: {
    marginLeft: 8,
    fontSize: 21,
    fontWeight: 'bold',
    padding: 6,
  },
  address: {
    marginVertical: 16,
    fontSize: 16,
  },
  time: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#4c9753',
    alignItems: 'center',
    borderRadius: 5,
    width: '71%',
    marginRight: 0
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentButton: {
    borderRadius: 5,
    backgroundColor: '#4c9753',
    marginLeft: 8
  },
  commentDelete: {
    borderRadius: 5,
    backgroundColor: '#4c9753',
    marginLeft: 2.5
  },
  input: {
    width: '100%',
    // marginBottom: 20,
    padding: 0,
    // backgroundColor: '4c9753',
    borderWidth: 1,
    borderColor: '#4c9753',
    // borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#EFFBF5",
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#EFFBF5',
    marginTop: 10,
    marginBottom: 10
  },
  commentText: {
    fontWeight: 'bold',
    margin: 7,
    fontSize: 16
  },
  photo: {
    width: 70,
    height: 70,
    margin: 10,
    alignSelf: 'center',
  },
  Card: {
    marginTop: 10,
    marginBottom: 50,
    maxHeight: 130,
    maxWidth: 280,
    minHeight: 30
  },
  imageModal: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  imageModalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
  },
  horizontalImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    zIndex: 1,
  },
  cameraContainer: {
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4c9753',
  },
};
