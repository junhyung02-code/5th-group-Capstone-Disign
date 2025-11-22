import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './MainScreen.js';
import TextInputScreen from './TextInputScreen.js';
import LoadingScreen from './LoadingScreen.js';
import ResultScreen from './ResultScreen.js';
import MapScreen from './MapScreen.js';
import VoiceInputScreen from './VoiceInputScreen.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* 모든 화면의 헤더(상단바)를 숨깁니다.
        주석은 이렇게 Navigator 바깥에 있어야 합니다.
      */}
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        {/* 이 안에는 오직 Stack.Screen 컴포넌트만 있어야 합니다.
         */}
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="TextInput" component={TextInputScreen} />
        <Stack.Screen name="VoiceInput" component={VoiceInputScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
