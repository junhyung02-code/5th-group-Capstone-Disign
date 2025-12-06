// src/screens/SettingScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function SettingScreen({ navigation }) {
  // 간단한 내부 상태 관리 (화면 밖으로 나가면 리셋됨)
  const [language, setLanguage] = useState('ko');

  const handleLanguageChange = (lang) => {
    if (language === lang) return;

    setLanguage(lang);
    
    const message = lang === 'ko' ? "한국어로 변경되었습니다." : "English has been selected.";
    
    // 알림만 띄우고 메인으로 이동 (실제 언어 변경 X)
    Alert.alert("알림", message, [
      {
        text: "확인",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>언어 설정 (Language)</Text>

          <TouchableOpacity 
            style={styles.optionRow} 
            onPress={() => handleLanguageChange('ko')}
          >
            <Icon 
              name={language === 'ko' ? "radio-button-on" : "radio-button-off"} 
              size={24} 
              color={language === 'ko' ? "#007AFF" : "#000"} 
            />
            <Text style={styles.optionText}>한국어</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionRow} 
            onPress={() => handleLanguageChange('en')}
          >
            <Icon 
              name={language === 'en' ? "radio-button-on" : "radio-button-off"} 
              size={24} 
              color={language === 'en' ? "#007AFF" : "#000"} 
            />
            <Text style={styles.optionText}>English</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    padding: 24, paddingBottom: 10 
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000000' },
  content: { padding: 24 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#000000' },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  optionText: { fontSize: 16, marginLeft: 15, color: '#000000' },
});

export default SettingScreen;