// src/screens/FindPasswordScreen.js
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

function FindPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail === '') {
      Alert.alert("알림", "이메일을 입력하세요.");
      return;
    }

    // 알림창의 '확인' 버튼을 누르면 다음 화면으로 이동!
    Alert.alert("알림", "인증번호를 전송했습니다.", [
      {
        text: "확인",
        onPress: () => navigation.navigate('EmailVerification', { email: trimmedEmail })
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="chevron-back-outline" size={30} color="#000" />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <Text style={styles.headerTitle}>비밀번호 찾기</Text>
              <View style={{ flex: 1.6 }} />
            </View>

            <Text style={styles.description}>가입하신 이메일을 입력해주세요.</Text>

            <TextInput
              style={styles.input}
              placeholder="ex) email@email.com"
              placeholderTextColor="#BDBDBD"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
                <Text style={styles.sendButtonText}>인증번호 전송</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000000', textAlign: 'center' },
  description: { fontSize: 20, marginBottom: 8, color: '#000000' },
  input: { width: '100%', padding: 12, borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 4, fontSize: 16, backgroundColor: '#FAFAFA', marginBottom: 10 },
  bottomContainer: { flex: 1, justifyContent: 'flex-end', marginBottom: 20 },
  sendButton: { width: '100%', padding: 10, backgroundColor: '#F0F0F0', borderRadius: 4, alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  sendButtonText: { fontSize: 20, color: '#BDBDBD', fontWeight: 'bold' },
});

export default FindPasswordScreen;