// src/screens/EmailVerificationScreen.js
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

function EmailVerificationScreen({ navigation, route }) {
  // 이전 화면(FindPassword)에서 넘겨준 이메일 받기
  // (만약 route.params가 없으면 빈 객체로 처리하여 오류 방지)
  const { email } = route.params || { email: "example@email.com" };
  
  const [code, setCode] = useState('');

  const handleVerify = () => {
    if (code.trim() === '') {
      Alert.alert("알림", "인증번호를 입력해주세요.");
      return;
    }

    // 인증번호 확인 로직 (테스트용: 123456이면 성공)
    if (code.trim() === "123456") {
      Alert.alert("인증 성공", "비밀번호 재설정 화면으로 이동합니다.", [
        {
          text: "확인",
          // [핵심] 여기서 'ResetPassword' 화면으로 이동합니다!
          onPress: () => navigation.navigate('ResetPassword') 
        }
      ]);
    } else {
      Alert.alert("오류", "인증번호가 올바르지 않습니다.\n(테스트 코드: 123456)");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            
            {/* 헤더 */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="chevron-back-outline" size={30} color="#000" />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <Text style={styles.headerTitle}>이메일 인증</Text>
              <View style={{ flex: 1.6 }} />
            </View>

            <Text style={styles.description}>
              아래 이메일로 발송된{'\n'}인증번호를 입력해주세요.
            </Text>
            
            {/* 받아온 이메일 표시 */}
            <Text style={styles.emailText}>{email}</Text>

            {/* 인증번호 입력 */}
            <TextInput
              style={styles.input}
              placeholder="인증번호 6자리"
              placeholderTextColor="#BDBDBD"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />

            {/* 확인 버튼 */}
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                <Text style={styles.verifyButtonText}>인증하기</Text>
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
  description: { fontSize: 20, marginBottom: 10, color: '#000000' },
  emailText: { fontSize: 18, color: '#1E88E5', marginBottom: 20, fontWeight: 'bold' },
  input: {
    width: '100%', padding: 12, borderWidth: 1, borderColor: '#CCCCCC',
    borderRadius: 4, fontSize: 16, backgroundColor: '#FAFAFA', marginBottom: 10
  },
  bottomContainer: { flex: 1, justifyContent: 'flex-end', marginBottom: 20 },
  verifyButton: {
    width: '100%', padding: 10, backgroundColor: '#F0F0F0',
    borderRadius: 4, alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0'
  },
  verifyButtonText: { fontSize: 20, color: '#BDBDBD', fontWeight: 'bold' },
});

export default EmailVerificationScreen;