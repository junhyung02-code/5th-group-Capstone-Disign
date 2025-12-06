// src/screens/SignupScreen.js
import React, { useState, useEffect } from 'react';
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
  Keyboard,
  ScrollView, // 스크롤을 위해 추가
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function SignupScreen({ navigation }) {
  // 1. 상태 관리 (Kotlin 변수들)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 상태 메시지 및 색상 관리
  const [emailStatus, setEmailStatus] = useState('이메일 중복확인을 해주세요');
  const [emailStatusColor, setEmailStatusColor] = useState('#999999');

  const [passwordStatus, setPasswordStatus] = useState('');
  const [passwordStatusColor, setPasswordStatusColor] = useState('#FF0000'); // 기본 빨강

  const [isEmailChecked, setIsEmailChecked] = useState(false);

  // 가짜 등록된 이메일 목록 (Kotlin의 registeredEmails)
  const registeredEmails = ['test@example.com', 'admin@admin.com'];

  // 2. 이메일 중복 확인 (checkEmailDuplicate)
  const checkEmailDuplicate = () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail === '') {
      setEmailStatus('이메일을 입력해주세요');
      setEmailStatusColor('#FF0000'); // 빨강
      setIsEmailChecked(false);
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setEmailStatus('올바른 이메일 형식이 아닙니다');
      setEmailStatusColor('#FF0000');
      setIsEmailChecked(false);
      return;
    }

    if (registeredEmails.includes(trimmedEmail)) {
      setEmailStatus('이미 가입된 이메일입니다');
      setEmailStatusColor('#FF0000');
      setIsEmailChecked(false);
    } else {
      setEmailStatus('사용 가능한 이메일입니다 ✓');
      setEmailStatusColor('#009900'); // 초록
      setIsEmailChecked(true);
    }
  };

  // 3. 비밀번호 일치 확인 (checkPasswordMatch - useEffect로 실시간 감지)
  useEffect(() => {
    if (password === '' || passwordConfirm === '') {
      setPasswordStatus('');
      return;
    }

    if (password === passwordConfirm) {
      setPasswordStatus('비밀번호가 일치합니다 ✓');
      setPasswordStatusColor('#009900'); // 초록
    } else {
      setPasswordStatus('비밀번호가 일치하지 않습니다');
      setPasswordStatusColor('#FF0000'); // 빨강
    }
  }, [password, passwordConfirm]);

  // 4. 회원가입 처리 (signup)
  const handleSignup = () => {
    // 유효성 검사
    if (!isEmailChecked) {
      setEmailStatus('이메일 중복확인을 해주세요');
      setEmailStatusColor('#FF0000');
      return;
    }

    if (password === '') {
      setPasswordStatus('비밀번호를 입력해주세요');
      setPasswordStatusColor('#FF0000');
      return;
    }

    if (password.length < 6) {
      setPasswordStatus('비밀번호는 6자 이상이어야 합니다');
      setPasswordStatusColor('#FF0000');
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordStatus('비밀번호가 일치하지 않습니다');
      setPasswordStatusColor('#FF0000');
      return;
    }

    // 성공
    Alert.alert('환영합니다!', '회원가입이 완료되었습니다!', [
      {
        text: '확인',
        onPress: () => navigation.goBack(), // 이전 화면(로그인)으로 복귀
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* 헤더 */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Icon name="chevron-back-outline" size={30} color="#000" />
              </TouchableOpacity>
              <View style={{ flex: 1 }} /> {/* 왼쪽 공간 */}
              <Text style={styles.headerTitle}>회원가입</Text>
              <View style={{ flex: 1.6 }} /> {/* 오른쪽 공간 (비율 조절) */}
            </View>

            {/* 이메일 입력 */}
            <Text style={styles.label}>이메일</Text>
            <EditText
              placeholder="ex) email@email.com"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setIsEmailChecked(false); // 수정하면 다시 확인해야 함
                setEmailStatus('이메일 중복확인을 해주세요');
                setEmailStatusColor('#999999');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* 중복확인 버튼 */}
            <TouchableOpacity
              style={styles.checkButton}
              onPress={checkEmailDuplicate}
            >
              <Text style={styles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>

            <Text
              style={[
                styles.statusText,
                { color: emailStatusColor, marginBottom: 20 },
              ]}
            >
              {emailStatus}
            </Text>

            {/* 비밀번호 입력 */}
            <Text style={styles.label}>비밀번호</Text>
            <EditText
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            {/* 비밀번호 확인 */}
            <Text style={styles.label}>비밀번호 확인</Text>
            <EditText
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry={true}
            />

            <Text
              style={[
                styles.statusText,
                { color: passwordStatusColor, marginBottom: 30 },
              ]}
            >
              {passwordStatus}
            </Text>

            {/* 가입하기 버튼 */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.signupButtonText}>가입하기</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 커스텀 TextInput 컴포넌트 (반복되는 스타일 줄이기)
const EditText = props => (
  <TextInput
    style={styles.input}
    placeholderTextColor="#BDBDBD"
    autoCorrect={false}
    {...props}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 50, // 하단 여백 확보
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 0,
    marginTop: 10,
    color: '#000000',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC', // 기본 테두리
    borderRadius: 4, // 안드로이드 기본값 느낌
    fontSize: 16,
    backgroundColor: '#FAFAFA', // @android:drawable/edit_text 느낌
    marginBottom: 8,
  },
  checkButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#333333', // 검은색 계열 (@drawable/btn_border_black)
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
  },
  signupButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F0F0F0', // @drawable/btn_border (회색)
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 18,
    color: '#BDBDBD', // 비활성화 느낌 색상
    fontWeight: 'bold',
  },
});

export default SignupScreen;
