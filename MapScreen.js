// MapScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';

const KAKAO_JAVASCRIPT_KEY = 'd0a8a89e743954aae048a07224b60d63'; 

// 1. getMapHTML 함수에 keyword 매개변수를 추가했습니다.
const getMapHTML = (apiKey, lat, lng, keyword) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kakao Map</title>
    <style>
      html, body { width: 100%; height: 100%; margin: 0; padding: 0; }
      #map { width: 100%; height: 100%; }
      .info-window { padding: 5px; font-size: 12px; width: 150px; }
      .info-title { font-weight: bold; display: block; margin-bottom: 2px; }
      .info-tel { color: #009900; font-size: 11px; }
    </style>
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var container = document.getElementById('map');
      var myLocation = new kakao.maps.LatLng(${lat}, ${lng});
      
      var options = {
        center: myLocation, 
        level: 4
      };
      var map = new kakao.maps.Map(container, options);

      var myMarker = new kakao.maps.Marker({
          position: myLocation,
          map: map
      });

      var iwContent = '<div style="padding:5px; font-size:11px; color:blue;">내 위치</div>'; 
      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent
      });
      infowindow.open(map, myMarker);

      var ps = new kakao.maps.services.Places(); 

      // 2. 전달받은 keyword(예: 내과)로 검색을 수행합니다.
      ps.keywordSearch('${keyword}', placesSearchCB, {
        location: myLocation,
        radius: 2000,
        sort: kakao.maps.services.SortBy.DISTANCE
      });

      function placesSearchCB (data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
              for (var i=0; i<data.length; i++) {
                  displayMarker(data[i]);    
              }       
          } 
      }

      function displayMarker(place) {
          var marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x)
          });

          var content = '<div class="info-window">' +
                        '  <span class="info-title">' + place.place_name + '</span>' +
                        '  <span class="info-addr">' + place.road_address_name + '</span>' +
                        '  <span class="info-tel">' + (place.phone ? place.phone : "") + '</span>' +
                        '</div>';

          var infowindow = new kakao.maps.InfoWindow({
              content: content
          });

          kakao.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
          });
      }
    </script>
  </body>
  </html>
`;

// 3. route를 추가하여 전달된 데이터를 받습니다.
function MapScreen({ route, navigation }) {
  // 전달된 keyword가 없으면 기본값 '병원'을 사용합니다.
  const keyword = route.params?.keyword || '병원';

  const [location, setLocation] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
  });

  useEffect(() => {
    async function requestPermission() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              (position) => {
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        {/* 헤더 제목에도 검색어를 표시해줍니다. */}
        <Text style={styles.headerTitle}>주변 {keyword} 찾기</Text>
        <View style={{ width: 50 }} />
      </View>

      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        // 4. HTML 생성 함수에 keyword를 전달합니다.
        source={{ 
          html: getMapHTML(KAKAO_JAVASCRIPT_KEY, location.latitude, location.longitude, keyword),
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