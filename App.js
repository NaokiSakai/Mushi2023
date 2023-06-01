import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/Headers'
import Footer from './src/components/Footer'
import MainMapPage from './src/screens/MainMapPage'
import PinMapPage from './src/screens/PinMapPage'
import Page2 from './src/screens/Page2'
import ContactForm from './src/screens/ContactForm'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './src/components/Map';




const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <SafeAreaProvider>
        <Stack.Navigator screenOptions={{header:Header}}>
          <Stack.Screen name="MainMapPage" component={MainMapPage} />
          <Stack.Screen name="PinMapPage" component={PinMapPage} />
          <Stack.Screen name="Page2" component={Page2} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
        {/* <Footer /> */}
        </SafeAreaProvider>
      </NavigationContainer>
  );
}