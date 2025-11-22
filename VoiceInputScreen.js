// VoiceInputScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// 아이콘 폰트를 사용합니다.
import Icon from 'react-native-vector-icons/Ionicons';

function VoiceInputScreen({ navigation }) {
  // 1. 녹음 상태를 관리할 변수 (지금은 UI만 구현)
  const [isRecording, setIsRecording] = useState(false);

  // 2. '다음' 버튼 활성화 로직 (지금은 항상 활성화, 추후 녹음 완료시 활성화로 변경)
  const isEnabled = true;

  return (
    <SafeAreaView style={styles.container}>
      {/* 3. 피그마의 뒤로가기 버튼이 있는 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          어떤 증상이 있으신지{'\n'}
          구체적으로 말씀해주세요!
        </Text>

        {/* 4. 마이크 버튼 */}
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => setIsRecording(!isRecording)} // (임시) 버튼 클릭시 녹음 상태 변경
        >
          <Icon name="mic-outline" style={styles.micIcon} />
        </TouchableOpacity>

        <Text style={styles.infoText}>
          위 버튼을 누르시면{'\n'}
          녹음이 시작 됩니다!
        </Text>

        {/* '다음' 버튼을 화면 하단에 고정하기 위한 빈 공간 */}
        <View style={{ flex: 1 }} />
      </View>

      {/* 5. '다음' 버튼 (하단 고정) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !isEnabled && styles.nextButtonDisabled]}
          disabled={!isEnabled}
          onPress={() => navigation.navigate('Loading')} // 로딩 화면으로 이동
        >
          <Text
            style={[
              styles.nextButtonText,
              !isEnabled && styles.nextButtonTextDisabled,
            ]}
          >
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 6. 피그마 디자인을 반영한 전체 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // 가로 중앙 정렬
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60, // 제목과 마이크 버튼 사이 간격
    lineHeight: 34,
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  micButton: {
    width: 120, // 마이크 버튼 크기
    height: 120,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 25, // 둥근 모서리
    justifyContent: 'center',
    alignItems: 'center',
    // 그림자 효과
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5.0,
    elevation: 5,
  },
  micIcon: {
    fontSize: 60, // 아이콘 크기
    color: '#000000',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 30, // 마이크 버튼과의 간격
  },
  footer: {
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

export default VoiceInputScreen;
