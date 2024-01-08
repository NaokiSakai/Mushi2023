import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//以下画面要素
import MapScreen from './src/components/Map';
import お問合せ from './src/screens/ContactForm';
import メインマップ from './src/screens/MainMapPage'
import ピン配置マップ from './src/screens/PinMapPage'
import 昆虫登録 from './src/screens/DateRegister'
import スポット情報 from './src/screens/DetailData';
import 利用規約 from './src/screens/TermsPage'
import 使い方ガイド from './src/screens/GuidePage';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="メインマップ"
            component={メインマップ}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="ピン配置マップ"
            component={ピン配置マップ}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="昆虫登録"
            component={昆虫登録}
            options={{ headerTitle: '昆虫登録ページ' }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }} 
          />
           <Stack.Screen
            name="お問合せ"
            component={お問合せ}
            options={{  headerTitle: 'お問合せ' }}
          />
           <Stack.Screen
            name="スポット情報"
            component={スポット情報}
            options={{  headerTitle: 'スポット情報' }}
          />
           <Stack.Screen
            name="利用規約"
            component={利用規約}
            options={{  headerTitle: '利用規約' }}
          />
           <Stack.Screen
            name="使い方ガイド"
            component={使い方ガイド}
            options={{  headerTitle: '使い方ガイド' }}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
