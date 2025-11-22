// TextInputScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

function TextInputScreen({ navigation }) {
  // 1. 증상 텍스트를 저장할 변수
  const [symptomText, setSymptomText] = useState('');

  // 2. 텍스트가 1글자라도 있어야 '다음' 버튼 활성화
  const isEnabled = symptomText.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* 3. 피그마의 뒤로가기 버튼이 있는 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      {/* 4. 키보드가 화면을 가리지 않도록 설정 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <Text style={styles.title}>
          어떤 증상이 있으신지{'\n'}
          구체적으로 작성해주세요!
        </Text>

        {/* 5. 피그마의 큰 텍스트 입력창 */}
        <TextInput
          style={styles.textInput}
          placeholder="증상을 입력해주세요(500자 이내)"
          placeholderTextColor="#BDBDBD" // 플레이스홀더 색상
          multiline={true} // 여러 줄 입력 가능
          maxLength={500} // 500자 제한
          value={symptomText}
          onChangeText={setSymptomText}
          textAlignVertical="top" // 안드로이드에서 텍스트가 위에서부터 시작하도록
        />

        {/* '다음' 버튼을 화면 하단에 고정하기 위한 빈 공간 */}
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>

      {/* 6. '다음' 버튼 (하단 고정) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isEnabled && styles.nextButtonDisabled, // 비활성화 스타일
          ]}
          disabled={!isEnabled} // 비활성화
          onPress={() => navigation.navigate('Loading')} // 로딩 화면으로 이동
        >
          <Text
            style={[
              styles.nextButtonText,
              !isEnabled && styles.nextButtonTextDisabled, // 비활성화 텍스트 스타일
            ]}
          >
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 7. 피그마 디자인을 반영한 전체 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // 피그마의 밝은 배경색
  },
  header: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    lineHeight: 34,
  },
  textInput: {
    width: '100%',
    height: 250, // 입력창 높이
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 15, // 둥근 모서리
    padding: 20, // 내부 여백
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    // '다음' 버튼을 하단에 고정하기 위한 영역
    padding: 20,
  },
  nextButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#007AFF', // 활성화 (파란색)
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonDisabled: {
    // 비활성화 (회색)
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  nextButtonTextDisabled: {
    color: '#9E9E9E',
  },
});

export default TextInputScreen;
