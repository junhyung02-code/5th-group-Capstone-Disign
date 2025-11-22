// LoadingScreen.js
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity, // 1. TouchableOpacity (버튼) import 추가
} from 'react-native';

function LoadingScreen({ navigation }) {
  useEffect(() => {
    // 3초(3000ms) 후에 'Result' 화면으로 자동으로 이동
    const timer = setTimeout(() => {
      navigation.navigate('Result');
    }, 3000);

    // 화면을 벗어나면(예: 뒤로가기) 타이머를 취소
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 2. 피그마의 뒤로가기 버튼이 있는 헤더 추가 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      {/* 3. 메인 콘텐츠를 View로 감싸서 중앙 정렬 */}
      <View style={styles.content}>
        <Text style={styles.title}>
          AI가 분석중입니다...{'\n'}잠시만 기다려주세요!
        </Text>
        <ActivityIndicator size="large" color="#808080" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // 배경색을 피그마와 통일
  },
  // 4. 헤더 스타일 추가
  header: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // 5. 콘텐츠 영역 스타일 추가
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 60, // 헤더 높이만큼 바닥 여백을 줘서 완벽한 중앙 정렬
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 34,
  },
});

export default LoadingScreen;
