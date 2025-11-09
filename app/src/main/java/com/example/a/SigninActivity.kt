package com.example.a

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class SigninActivity : AppCompatActivity() {

    private lateinit var btnSignup: Button
    private lateinit var btnGuest: Button
    private lateinit var btnLogin: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signin)

        btnSignup = findViewById(R.id.btn_signup)
        btnGuest = findViewById(R.id.btn_guest)
        btnLogin = findViewById(R.id.btn_login)

        // 회원가입 버튼
        btnSignup.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }

        // 로그인 없이 사용하기
        btnGuest.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish() // SigninActivity 종료
        }

        // 로그인 버튼
        btnLogin.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }
    }
}
