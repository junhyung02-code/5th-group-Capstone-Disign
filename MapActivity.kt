package com.example.a

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationManager
import android.os.Bundle
import android.util.Log
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import java.io.BufferedReader
import java.io.InputStreamReader

class MapActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private var searchKeyword: String = "병원"
    private var isMapLoaded = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)

        // 검색어 가져오기
        searchKeyword = intent.getStringExtra("searchKeyword") ?: "병원"

        val btnBack = findViewById<ImageButton>(R.id.btnBack)
        btnBack.setOnClickListener { finish() }

        webView = findViewById(R.id.mapWebView)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true

        // 로딩 완료 체크
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                isMapLoaded = true

                // 로딩 1초 후 검색 시작 (안정성)
                view?.postDelayed({
                    startSearchProcess()
                }, 1000)
            }
        }

        webView.webChromeClient = WebChromeClient()

        // ★ [핵심] file:// 대신 http://localhost 로 속여서 실행하기
        loadHtmlWithFakeDomain()
    }

    // 이 함수가 마커를 나오게 하는 '열쇠'입니다!
    private fun loadHtmlWithFakeDomain() {
        try {
            val assetManager = assets
            val inputStream = assetManager.open("kakaomap.html")
            val bufferedReader = BufferedReader(InputStreamReader(inputStream))
            val stringBuilder = StringBuilder()
            var line: String?

            // HTML 파일 읽어오기 (줄바꿈 포함)
            while (bufferedReader.readLine().also { line = it } != null) {
                stringBuilder.append(line).append("\n")
            }

            val htmlContent = stringBuilder.toString()

            // ★ 카카오에 등록한 'http://localhost' 주소로 위장해서 로드
            webView.loadDataWithBaseURL("http://localhost/", htmlContent, "text/html", "UTF-8", null)

        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(this, "파일 로드 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    // 위치 권한 확인 및 검색 시작
    private fun startSearchProcess() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            == PackageManager.PERMISSION_GRANTED) {
            getMyLocationAndSearch()
        } else {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                1001
            )
        }
    }

    // 위치 찾고 JS 명령 내리기
    @SuppressLint("MissingPermission")
    private fun getMyLocationAndSearch() {
        if (!isMapLoaded) return

        val locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
        val locGPS = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)
        val locNet = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER)
        val location: Location? = locGPS ?: locNet

        if (location != null) {
            // 실제 위치 발견
            val lat = location.latitude
            val lng = location.longitude
            webView.evaluateJavascript("javascript:moveAndSearch($lat, $lng, '$searchKeyword')", null)
        } else {
            // 위치 못 찾으면 계명대 좌표로 강제 이동
            Toast.makeText(this, "위치 정보 없음 -> 계명대로 이동 후 검색", Toast.LENGTH_SHORT).show()
            val daeguLat = 35.858485
            val daeguLng = 128.486586
            webView.evaluateJavascript("javascript:moveAndSearch($daeguLat, $daeguLng, '$searchKeyword')", null)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 1001 && grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            getMyLocationAndSearch()
        }
    }
}