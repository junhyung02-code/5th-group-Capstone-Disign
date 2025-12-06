// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 입력값이 있는지 확인 (공백 제외)
  const isEnabled = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    if (!isEnabled) return;

    console.log("------------- 로그인 시도 (무조건 통과) -------------");
    console.log("입력한 이메일:", email);

    // 1. [수정됨] 아이디/비번 검사 없이 바로 '권한 설정' 화면으로 이동합니다.
    // (나중에 실제 로그인 API를 붙일 때는 여기에 검사 로직을 넣으면 됩니다)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Permission' }], 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            
            <View style={styles.header}>
              <View style={{ width: 30 }} />
              <Text style={styles.headerTitle}>로그인</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <Icon name="settings-outline" size={28} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>이메일</Text>
              <TextInput
                style={styles.input}
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.bottomContainer}>
              <TouchableOpacity 
                style={[
                  styles.loginButton, 
                  isEnabled && styles.loginButtonActive 
                ]} 
                onPress={handleLogin}
                disabled={!isEnabled}
              >
                <Text 
                  style={[
                    styles.loginButtonText,
                    isEnabled && styles.loginButtonTextActive 
                  ]}
                >
                  로그인
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.forgotPasswordButton}
                onPress={() => navigation.navigate('FindPassword')}
              >
                <Text style={styles.forgotPasswordText}>비밀번호를 잊으셨나요?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.signupButton}
                onPress={() => navigation.navigate('Signup')} 
              >
                <Text style={styles.signupText}>회원가입</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  innerContainer: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000000' },
  formContainer: { marginBottom: 20 },
  label: { fontSize: 20, fontWeight: '500', marginBottom: 10, marginTop: 10, color: '#000000' },
  input: { width: '100%', padding: 12, borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, fontSize: 16, backgroundColor: '#FAFAFA', marginBottom: 10 },
  bottomContainer: { flex: 1, justifyContent: 'flex-end', marginBottom: 20 },
  loginButton: { width: '100%', padding: 15, backgroundColor: '#F0F0F0', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  loginButtonText: { fontSize: 20, color: '#BDBDBD', fontWeight: 'bold' },
  loginButtonActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  loginButtonTextActive: { color: '#FFFFFF' },
  forgotPasswordButton: { marginTop: 15, alignItems: 'center' },
  forgotPasswordText: { color: '#1E88E5', fontSize: 14 },
  signupButton: { marginTop: 20, alignItems: 'center' },
  signupText: { color: '#888', fontSize: 16 },
});

export default LoginScreen;