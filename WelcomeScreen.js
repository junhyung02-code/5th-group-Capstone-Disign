// src/screens/WelcomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* 헤더 (뒤로가기) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        {/* 상단 제목 영역 */}
        <View style={styles.titleContainer}>
          {/* XML의 @string/onboarding_title */}
          <Text style={styles.title}>
            닥터 링크에{'\n'}오신 것을 환영합니다!
          </Text>
        </View>

        {/* 버튼 영역 (화면 하단 배치) */}
        <View style={styles.buttonContainer}>
          
          {/* 1. 회원가입 버튼 */}
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>회원가입</Text>
          </TouchableOpacity>

          {/* 2. 로그인 없이 사용하기 (게스트) */}
          <TouchableOpacity 
            style={styles.guestButton}
            onPress={() => {
              // 게스트는 로그인 없이 바로 권한 설정 -> 언어 설정 -> 메인으로 이어지게 합니다.
              navigation.reset({
                index: 0,
                routes: [{ name: 'Permission' }], 
              });
            }}
          >
            <Text style={styles.guestButtonText}>로그인 없이 사용하기</Text>
          </TouchableOpacity>

          {/* 구분선과 텍스트 */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>이미 계정이 있으신가요?</Text>
            <View style={styles.line} />
          </View>

          {/* 3. 로그인 버튼 */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  innerContainer: { flex: 1, padding: 24 },
  
  header: { marginBottom: 0 },
  backButton: { padding: 5, alignSelf: 'flex-start', marginLeft: -10 },
  
  titleContainer: { marginTop: 10, marginBottom: 60, justifyContent: 'center', height: 100 },
  title: { fontSize: 25, fontWeight: 'bold', color: '#000000', lineHeight: 35 },

  buttonContainer: { flex: 1, justifyContent: 'flex-end', paddingBottom: 20 },
  
  // 회원가입 버튼 (흰색 배경, 테두리)
  signupButton: {
    width: '100%', padding: 15, backgroundColor: '#FFFFFF',
    borderRadius: 4, alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0',
    marginBottom: 16
  },
  signupButtonText: { fontSize: 18, color: '#000000', fontWeight: 'bold' },

  // 게스트 버튼 (검은색 배경)
  guestButton: {
    width: '100%', padding: 15, backgroundColor: '#333333',
    borderRadius: 4, alignItems: 'center', marginBottom: 40
  },
  guestButtonText: { fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' },

  // 구분선 영역
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  line: { flex: 1, height: 1, backgroundColor: '#DDDDDD' },
  dividerText: { marginHorizontal: 16, color: '#999999', fontSize: 14 },

  // 로그인 버튼 (검은색 배경)
  loginButton: {
    width: '100%', padding: 15, backgroundColor: '#333333',
    borderRadius: 4, alignItems: 'center'
  },
  loginButtonText: { fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' },
});

export default WelcomeScreen;