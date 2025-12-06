// src/screens/LanguageScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function LanguageScreen({ navigation }) {

  // 버튼을 누르면 바로 메인 화면으로 이동하는 함수
  const handleSelectLanguage = (lang) => {
    console.log(`선택된 언어: ${lang} -> 메인으로 이동합니다.`);
    
    // 알림창 없이 바로 이동!
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }], 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topContainer}>
        <Icon name="globe-outline" size={80} color="#000" style={styles.icon} />
        <Text style={styles.title}>
          언어를 선택해주세요{'\n'}
          (Select Language)
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* 한국어 버튼 */}
        <TouchableOpacity 
          style={styles.languageButton} 
          onPress={() => handleSelectLanguage('ko')}
        >
          <Text style={styles.buttonText}>한국어</Text>
        </TouchableOpacity>

        {/* 영어 버튼 */}
        <TouchableOpacity 
          style={styles.languageButton} 
          onPress={() => handleSelectLanguage('en')}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24 },
  topContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  icon: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', lineHeight: 34, color: '#000000' },
  buttonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50 },
  languageButton: { 
    width: '48%', height: 150, backgroundColor: '#333333', 
    borderRadius: 10, justifyContent: 'center', alignItems: 'center', 
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 
  },
  buttonText: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
});

export default LanguageScreen;