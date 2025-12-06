// ResultScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function ResultScreen({ navigation, route }) {
  // 1. 이전 화면에서 받은 데이터
  const { inputData } = route.params;
  
  // 분석 결과를 저장할 상태
  const [result, setResult] = useState({ symptom: '', department: '' });

  useEffect(() => {
    // 2. 간단한 키워드 분석 로직 (Mock AI)
    const text = inputData.painArea; // 사용자가 입력한 텍스트
    let dept = '내과'; // 기본값

    if (text.includes('이') || text.includes('치아') || text.includes('잇몸')) {
      dept = '치과';
    } else if (text.includes('뼈') || text.includes('허리') || text.includes('다리') || text.includes('팔')) {
      dept = '정형외과';
    } else if (text.includes('눈')) {
      dept = '안과';
    } else if (text.includes('귀') || text.includes('코') || text.includes('목')) {
      dept = '이비인후과';
    } else if (text.includes('피부')) {
      dept = '피부과';
    }

    setResult({
      symptom: text.length > 10 ? text.substring(0, 10) + '...' : text, // 너무 길면 줄임
      department: dept
    });
  }, [inputData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>분석 결과</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>분석 결과</Text>
        <Text style={styles.subtitle}>'{result.symptom}' 증상이 예상됩니다.</Text>

        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>사용자님의 증상에</Text>
          {/* 3. 분석된 진료과 표시 */}
          <Text style={styles.recommendTitleBold}>{result.department}를 추천합니다.</Text>
          <Text style={styles.recommendWarning}>
            해당 추천은 일반적인 정보를 바탕으로 하며, 정확한 진단은 꼭 전문의와 상담하세요.
          </Text>
        </View>

        <View style={styles.additionalQuestionBox}>
          <Text style={styles.additionalQuestionText}>더 궁금하신 내용이 있나요?</Text>
          <TouchableOpacity style={styles.askButton}>
            <Text style={styles.askButtonText}>질문하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.findHospitalButton}
          // 4. 지도 화면으로 추천 진료과 키워드 전달
          onPress={() => navigation.navigate('Map', { keyword: result.department })}
        >
          <Text style={styles.findHospitalButtonText}>주변 {result.department} 찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 스타일 코드는 이전과 동일
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  backButton: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 18, color: '#666', marginTop: 10, marginBottom: 30 },
  recommendBox: { width: '100%', backgroundColor: '#E6F7FF', borderRadius: 15, padding: 25, alignItems: 'center' },
  recommendTitle: { fontSize: 18 },
  recommendTitleBold: { fontSize: 20, fontWeight: 'bold', marginTop: 5, marginBottom: 15, color: '#007AFF' },
  recommendWarning: { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 20 },
  additionalQuestionBox: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 },
  additionalQuestionText: { fontSize: 16, fontWeight: '500' },
  askButton: { backgroundColor: '#000000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  askButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  findHospitalButton: { width: '100%', height: 55, backgroundColor: '#4CD964', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  findHospitalButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});

export default ResultScreen;