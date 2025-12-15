package com.example.a
import android.webkit.WebSettings
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class MapActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)

        // 1. 뒤로가기 버튼 설정 (기존 코드 유지)
        val btnBack = findViewById<ImageButton>(R.id.btnBack)
        btnBack.setOnClickListener {
            finish()
        }

        // 2. WebView 설정 (새로 추가)
        val webView = findViewById<WebView>(R.id.mapWebView)

        // 웹뷰 설정: 자바스크립트 허용
        webView.settings.apply {
            // 기본 설정
            javaScriptEnabled = true
            domStorageEnabled = true

            // 로컬 HTML → 외부 JS(Kakao Map) 허용
            allowFileAccess = true
            allowContentAccess = true
            allowFileAccessFromFileURLs = true
            allowUniversalAccessFromFileURLs = true

            // 혼합 콘텐츠 허용 (https JS 로드)
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        // 웹뷰 클라이언트 설정 (새 창 안 뜨게 하기 위함)
        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()

        // 3. assets 폴더에 있는 HTML 파일 로드
        // 이 코드가 'kakaomap.html' 파일을 실행시킵니다.
        webView.loadUrl("file:///android_asset/kakaomap.html")
    }
}