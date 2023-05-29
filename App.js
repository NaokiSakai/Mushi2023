import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/Headers'
import Footer from './src/components/Fooder'
import Page0 from './src/screens/Page0'
import Page1 from './src/screens/Page1'
import Page2 from './src/screens/Page2'
import { SafeAreaProvider } from 'react-native-safe-area-context';




const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <SafeAreaProvider>
        <Stack.Navigator screenOptions={{header:Header}}>
          <Stack.Screen name="Page0" component={Page0} />
          <Stack.Screen name="Page1" component={Page1} />
          <Stack.Screen name="Page2" component={Page2} />
        </Stack.Navigator>
        {/* <Footer /> */}
        </SafeAreaProvider>
      </NavigationContainer>
  );
}