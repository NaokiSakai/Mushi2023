import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/Headers'
import HeaderBack from './src/components/HeaderBack';
import Footer from './src/components/Footer'
import MainMapPage from './src/screens/MainMapPage'
import PinMapPage from './src/screens/PinMapPage'
import Page2 from './src/screens/Page2'
// import ContactForm from './src/screens/ContactForm'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './src/components/Map';
import ContactForm from './src/screens/ContactForm';

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
            name="Page2"
            component={Page2}
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
        </Stack.Navigator>
        {/* <Footer /> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
