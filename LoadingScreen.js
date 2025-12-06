// LoadingScreen.js
import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

function LoadingScreen({ navigation, route }) {
  // 1. 이전 화면에서 받은 데이터 꺼내기
  const { inputData } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      // 2. 3초 뒤, 데이터를 그대로 가지고 결과 화면으로 이동
      navigation.navigate('Result', { inputData: inputData });
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation, inputData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>AI가 분석중입니다...{'\n'}잠시만 기다려주세요!</Text>
        <ActivityIndicator size="large" color="#808080" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { height: 60, justifyContent: 'center', paddingLeft: 15 },
  backButton: { fontSize: 24, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 50, lineHeight: 34 },
});

export default LoadingScreen;