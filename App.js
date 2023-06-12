import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/Headers'
import HeaderBack from './src/components/HeaderBack';
import Footer from './src/components/Footer'
import MainMapPage from './src/screens/MainMapPage'
import PinMapPage from './src/screens/PinMapPage'
import DateRegister from './src/screens/DateRegister'
// import ContactForm from './src/screens/ContactForm'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './src/components/Map';
import ContactForm from './src/screens/ContactForm';
import { initializeApp } from 'firebase/app'; // Firebase v9から追加されたモジュール
import { getDatabase } from 'firebase/database'; // 必要に応じて他のFirebaseサービスを追加でインポート
import DetailData from './src/screens/DetailData';
require('firebase/firestore');


const firebaseConfig = {
  apiKey: 'AIzaSyCksrHuiQ4CafP7orUm8jmd1kmnhvIt8Gk',
  authDomain: 'mushimapworld.firebaseapp.com',
  databaseURL: 'https://mushimapworld-default-rtdb.firebaseio.com',
  projectId: 'mushimapworld',
  storageBucket: 'mushimapworld.appspot.com',
  messagingSenderId: '717364972455',
  appId: '1:717364972455:web:f8e0c51b6758c2432ec482',
  measurementId: 'G-NGJBM2G1RB'
};

const firebaseApp = initializeApp(firebaseConfig); // Firebaseアプリの初期化

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="MainMapPage"
            component={MainMapPage}
            options={{ header: () => <Header title="Main Map Page" /> }}
          />
          <Stack.Screen
            name="PinMapPage"
            component={PinMapPage}
            options={{ header: () => <HeaderBack title="Pin Map Page" /> }}
          />
          <Stack.Screen
            name="DateRegister"
            component={DateRegister}
            options={{ headerTitle: '昆虫登録ページ' }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ header: () => <Header title="Map Screen" /> }}
          />
           <Stack.Screen
            name="ContactForm"
            component={ContactForm}
            options={{  headerTitle: 'お問合せ' }}
          />
           <Stack.Screen
            name="DetailData"
            component={DetailData}
            options={{  headerTitle: 'スポット情報' }}
          />
        </Stack.Navigator>
        {/* <Footer /> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
