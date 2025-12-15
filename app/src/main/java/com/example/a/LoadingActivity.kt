package com.example.a

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.ImageButton
import android.widget.ProgressBar
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class LoadingActivity : AppCompatActivity() {

    override fun attachBaseContext(newBase: android.content.Context?) {
        if (newBase != null) {
            val contextWithLanguage = LanguageUtil.applySavedLanguage(newBase)
            super.attachBaseContext(contextWithLanguage)
        } else {
            super.attachBaseContext(newBase)
        }
    }

    private lateinit var btnBack: ImageButton
    private lateinit var tvTitle: TextView
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_loading)

        // 뷰 연결
        btnBack = findViewById(R.id.btnBack)
        tvTitle = findViewById(R.id.tvTitle)
        progressBar = findViewById(R.id.progressBar)

        tvTitle.text = getString(R.string.loading_titles)

        btnBack.setOnClickListener {
            finish()
        }
    }
}