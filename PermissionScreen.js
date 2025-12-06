// src/screens/PermissionScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function PermissionScreen({ navigation }) {

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // 필수 권한들을 한 번에 요청합니다.
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          // 안드로이드 13 이상 알림 권한
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS 
        ]);

        console.log('Permissions result:', granted);
        // 권한 허용 여부와 상관없이 다음 화면으로 이동
        moveToNextScreen();

      } catch (err) {
        console.warn(err);
        moveToNextScreen();
      }
    } else {
      // iOS의 경우
      moveToNextScreen();
    }
  };

  const moveToNextScreen = () => {
    // [중요] 권한 설정 후 '언어 설정(Language)' 화면으로 이동합니다.
    navigation.reset({
      index: 0,
      routes: [{ name: 'Language' }],
    });
  };

  // 권한 항목 아이템 컴포넌트
  const PermissionItem = ({ icon, title, desc }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={30} color="#000" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{desc}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        <Text style={styles.title}>앱 사용을 위해{'\n'}권한 허용이 필요합니다.</Text>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          
          {/* 위치 권한 */}
          <PermissionItem 
            icon="location-outline"
            title="위치 (필수)"
            desc="내 주변 병원/약국 찾기 기능을 위해 사용합니다."
          />

          {/* 알림 권한 */}
          <PermissionItem 
            icon="notifications-outline"
            title="알림 (선택)"
            desc="푸시 알림 수신을 위해 사용합니다."
          />

          {/* 음성 권한 */}
          <PermissionItem 
            icon="mic-outline"
            title="마이크 (필수)"
            desc="음성으로 증상을 입력하기 위해 사용합니다."
          />

          {/* 카메라 권한 */}
          <PermissionItem 
            icon="camera-outline"
            title="카메라/사진 (필수)"
            desc="환부 사진을 첨부하기 위해 사용합니다."
          />

        </ScrollView>

        <TouchableOpacity style={styles.confirmButton} onPress={requestPermissions}>
          <Text style={styles.confirmButtonText}>확인</Text>
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
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    marginTop: 20,
    lineHeight: 34,
  },
  scrollView: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 16,
    color: '#999999',
    lineHeight: 22,
  },
  confirmButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PermissionScreen;