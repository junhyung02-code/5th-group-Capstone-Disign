// ResultScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function ResultScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 (뒤로가기 버튼) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>분석 결과</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* 메인 콘텐츠 */}
      <View style={styles.content}>
        <Text style={styles.title}>분석 결과</Text>
        <Text style={styles.subtitle}>(증상명)이 예상됩니다.</Text>

        {/* 추천 진료과 박스 */}
        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>사용자님의 증상에</Text>
          <Text style={styles.recommendTitleBold}>
            (진료과 이름)를 추천합니다.
          </Text>
          <Text style={styles.recommendWarning}>
            해당 추천은 일반적인 정보를 바탕으로 하며, 정확한 진단은 꼭 전문의와
            상담하세요.
          </Text>
        </View>

        {/* 추가 질문 영역 */}
        <View style={styles.additionalQuestionBox}>
          <Text style={styles.additionalQuestionText}>
            더 궁금하신 내용이 있나요?
          </Text>
          <TouchableOpacity style={styles.askButton}>
            <Text style={styles.askButtonText}>질문하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        {/* '주변 병원/약국 찾기' 버튼에 onPress 기능 추가 */}
        <TouchableOpacity
          style={styles.findHospitalButton}
          onPress={() => navigation.navigate('Map')} // 'Map' 화면으로 이동
        >
          <Text style={styles.findHospitalButtonText}>주변 병원/약국 찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    flexDirection: 'row', // 가로 배치
    alignItems: 'center',
    justifyContent: 'space-between', // 양쪽 정렬
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20, // 클릭 영역 확보
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    marginBottom: 30,
  },
  recommendBox: {
    width: '100%',
    backgroundColor: '#E6F7FF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  recommendTitle: {
    fontSize: 18,
  },
  recommendTitleBold: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
  },
  recommendWarning: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  additionalQuestionBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  additionalQuestionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  askButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  askButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  findHospitalButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#4CD964',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findHospitalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
