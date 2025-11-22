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

function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} />

      <View style={styles.content}>
        <Text style={styles.title}>
          어떤 증상이 있으신가요?{'\n'}
          원하시는 입력 방식을 선택해주세요!
        </Text>

        {/* 텍스트 입력 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TextInput')}
        >
          <Icon name="document-text-outline" style={styles.icon} />
          <Text style={styles.buttonText}>텍스트로 입력하기</Text>
        </TouchableOpacity>

        {/* 음성 입력 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VoiceInput')} // 1. 여기를 수정!
        >
          <Icon name="volume-high-outline" style={styles.icon} />
          <Text style={styles.buttonText}>음성으로 입력하기</Text>
        </TouchableOpacity>

        {/* '다음' 버튼은 없는 것이 맞습니다. */}
      </View>
    </SafeAreaView>
  );
}

// ... (스타일 코드는 이전과 동일합니다)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    height: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 34,
  },
  button: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3.0,
    elevation: 3,
  },
  icon: {
    fontSize: 40,
    color: '#000000',
    marginRight: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});

export default MainScreen;
