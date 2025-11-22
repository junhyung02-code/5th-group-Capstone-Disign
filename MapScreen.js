// MapScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';

// 사용자님의 JavaScript 키
const KAKAO_JAVASCRIPT_KEY = 'd0a8a89e743954aae048a07224b60d63'; 

// 지도 HTML 생성 함수 (위도, 경도를 받아서 지도를 그림)
const getMapHTML = (apiKey, lat, lng) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kakao Map</title>
    <style>
      html, body { width: 100%; height: 100%; margin: 0; padding: 0; }
      #map { width: 100%; height: 100%; }
    </style>
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var container = document.getElementById('map');
      
      // 전달받은 위도(lat), 경도(lng)로 지도 중심 설정
      var options = {
        center: new kakao.maps.LatLng(${lat}, ${lng}), 
        level: 3
      };
      var map = new kakao.maps.Map(container, options);

      // 내 위치에 마커 표시
      var markerPosition  = new kakao.maps.LatLng(${lat}, ${lng}); 
      var marker = new kakao.maps.Marker({
          position: markerPosition
      });
      marker.setMap(map);
    </script>
  </body>
  </html>
`;

function MapScreen({ navigation }) {
  // 내 위치 상태 관리 (기본값: 서울 시청, 로딩 전 임시 위치)
  const [location, setLocation] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
  });

  // 위치 권한 요청 및 좌표 가져오기
  useEffect(() => {
    async function requestPermission() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // 권한 허용되면 위치 가져오기
            Geolocation.getCurrentPosition(
              (position) => {
                console.log(position); // 터미널에 위치 정보 출력
                setLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              },
              (error) => {
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            console.log("위치 권한 거부됨");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
    requestPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 주변 병원 찾기</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* 웹뷰 */}
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        // location 상태가 바뀔 때마다(내 위치를 찾으면) 지도를 새로 그림
        source={{ 
          html: getMapHTML(KAKAO_JAVASCRIPT_KEY, location.latitude, location.longitude),
          baseUrl: 'http://localhost' 
        }}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  backButton: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  webview: { flex: 1 },
});

export default MapScreen;