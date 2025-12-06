// src/screens/ResetPasswordScreen.js
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

function ResetPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 비밀번호 변경 처리 함수
  const handleResetPassword = () => {
    // 1. 빈 값 체크
    if (password.trim() === '' || passwordConfirm.trim() === '') {
      Alert.alert("알림", "모든 칸을 입력하세요.");
      return;
    }

    // 2. 비밀번호 일치 체크
    if (password !== passwordConfirm) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    // 3. 비밀번호 길이 체크 (추가적인 안전장치)
    if (password.length < 6) {
      Alert.alert("오류", "비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    // 4. 성공 처리
    Alert.alert("성공", "비밀번호가 변경되었습니다.", [
      {
        text: "확인",
        onPress: () => {
          // 로그인 화면으로 돌아가면서 기존 화면 기록(스택)을 모두 지웁니다.
          // (뒤로가기 눌렀을 때 다시 이 화면으로 오지 않게 하기 위함)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }
    ]);
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
              <Text style={styles.headerTitle}>비밀번호 재설정</Text>
              <View style={{ flex: 1.6 }} />
            </View>

            {/* 새 비밀번호 입력 */}
            <Text style={styles.label}>새 비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="새 비밀번호를 입력하세요"
              placeholderTextColor="#BDBDBD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            {/* 비밀번호 확인 입력 */}
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 다시 입력하세요"
              placeholderTextColor="#BDBDBD"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry={true}
            />

            {/* 완료 버튼 */}
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.completeButton} onPress={handleResetPassword}>
                <Text style={styles.completeButtonText}>입력 완료</Text>
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
  label: { fontSize: 20, fontWeight: '500', marginBottom: 10, marginTop: 10, color: '#000000' },
  input: {
    width: '100%', padding: 12, borderWidth: 1, borderColor: '#CCCCCC',
    borderRadius: 4, fontSize: 16, backgroundColor: '#FAFAFA', marginBottom: 10
  },
  bottomContainer: { flex: 1, justifyContent: 'flex-end', marginBottom: 20 },
  completeButton: {
    width: '100%', padding: 10, backgroundColor: '#F0F0F0',
    borderRadius: 4, alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0'
  },
  completeButtonText: { fontSize: 20, color: '#BDBDBD', fontWeight: 'bold' },
});

export default ResetPasswordScreen;