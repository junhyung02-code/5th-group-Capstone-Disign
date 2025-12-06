// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. WelcomeScreen import 추가
import WelcomeScreen from './WelcomeScreen.js';

import LoginScreen from './LoginScreen.js';
import SignupScreen from './SignupScreen.js';
import FindPasswordScreen from './FindPasswordScreen.js';
import EmailVerificationScreen from './EmailVerificationScreen.js';
import ResetPasswordScreen from './ResetPasswordScreen.js';
import SettingScreen from './SettingScreen.js';
import LanguageScreen from './LanguageScreen.js';
import PermissionScreen from './PermissionScreen.js';

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
      <Stack.Navigator 
        initialRouteName="Welcome" // 2. 첫 화면을 'Welcome'으로 변경
        screenOptions={{ headerShown: false }} 
      >
        {/* 시작 화면 */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* 인증 관련 */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        
        {/* 설정 관련 */}
        <Stack.Screen name="Permission" component={PermissionScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        
        {/* 메인 기능 */}
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