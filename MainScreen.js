// MainScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

// const TextInputIcon = require('./assets/text_icon.png'); 
// const VoiceInputIcon = require('./assets/voice_icon.png'); 

function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <View style={{ width: 30 }} />
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Icon name="settings-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* 다시 한글로 원상복구 */}
        <Text style={styles.title}>
          어떤 증상이 있으신가요?{'\n'}
          원하시는 입력 방식을 선택해주세요!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TextInput')} 
        >
          <Icon name="document-text-outline" style={styles.icon} /> 
          <Text style={styles.buttonText}>텍스트로 입력하기</Text> 
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('VoiceInput')}
        >
          <Icon name="volume-high-outline" style={styles.icon} /> 
          <Text style={styles.buttonText}>음성으로 입력하기</Text> 
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 50, lineHeight: 34 },
  button: { width: '100%', height: 100, backgroundColor: '#FFFFFF', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#EFEFEF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3.00, elevation: 3 },
  icon: { fontSize: 40, color: '#000000', marginRight: 25 },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#000000' },
});

export default MainScreen;