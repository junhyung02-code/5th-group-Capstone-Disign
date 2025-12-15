package com.example.a

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ResultActivity : AppCompatActivity() {

    // 언어 설정을 유지하기 위한 코드 (기존 유지)
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
    private lateinit var tvRecommendTitle: TextView
    private lateinit var tvRecommendTitleBold: TextView
    private lateinit var tvRecommendWarning: TextView
    private lateinit var tvAdditionalQuestion: TextView
    private lateinit var btnAsk: LinearLayout
    private lateinit var btnFindHospital: LinearLayout
    private lateinit var tvFindHospitalText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)

        // 1. 이전 화면(LoadingActivity)에서 받은 증상 텍스트
        val symptom = intent.getStringExtra("symptom") ?: ""

        // 2. 증상을 분석하여 진료과(department) 결정
        val department = getDepartmentFromText(symptom)

        // 3. 뷰 연결 (findViewById)
        btnBack = findViewById(R.id.btnBack)
        tvTitle = findViewById(R.id.tvTitle)
        tvRecommendTitle = findViewById(R.id.tvRecommendTitle)
        tvRecommendTitleBold = findViewById(R.id.tvRecommendTitleBold)
        tvRecommendWarning = findViewById(R.id.tvRecommendWarning)
        tvAdditionalQuestion = findViewById(R.id.tvAdditionalQuestion)
        btnAsk = findViewById(R.id.btnAsk)
        btnFindHospital = findViewById(R.id.btnFindHospital)
        tvFindHospitalText = findViewById(R.id.tvFindHospitalText)

        // 4. 텍스트 세팅 (strings.xml 리소스 활용)
        tvTitle.text = getString(R.string.result_title)
        tvRecommendTitle.text = getString(R.string.result_recommend_prefix)

        // "내과" 등의 진료과 이름을 강조 텍스트에 넣음
        tvRecommendTitleBold.text = getString(R.string.result_recommend_suffix, department)

        tvRecommendWarning.text = getString(R.string.result_warning)
        tvAdditionalQuestion.text = getString(R.string.result_more_question)

        // "내과 주변 병원 찾기" 처럼 버튼 텍스트 설정
        tvFindHospitalText.text = getString(R.string.result_find_hospital, department)

        // 5. 뒤로가기 버튼
        btnBack.setOnClickListener {
            finish()
        }

        // 6. 질문하기 버튼 (나중에 구현)
        btnAsk.setOnClickListener {
            // TODO: 추가 질문 기능 구현
        }

        // 7. [수정됨] 주변 병원 찾기 버튼
        btnFindHospital.setOnClickListener {
            val intent = Intent(this, MapActivity::class.java)

            // ★ 중요: MapActivity가 받는 이름인 "searchKeyword"로 보내야 합니다.
            // 기존 "keyword" -> "searchKeyword" 로 수정했습니다.
            intent.putExtra("searchKeyword", department)

            startActivity(intent)
        }
    }

    // 증상 텍스트를 분석해서 진료과 이름을 반환하는 함수
    private fun getDepartmentFromText(text: String): String {
        return when {
            text.contains("이") || text.contains("치아") || text.contains("잇몸") ->
                getString(R.string.dept_dental) // 치과

            text.contains("뼈") || text.contains("허리") ||
                    text.contains("다리") || text.contains("팔") || text.contains("관절") ->
                getString(R.string.dept_orthopedic) // 정형외과

            text.contains("눈") ->
                getString(R.string.dept_eye) // 안과

            text.contains("귀") || text.contains("코") || text.contains("목") || text.contains("감기") ->
                getString(R.string.dept_ent) // 이비인후과

            text.contains("피부") ->
                getString(R.string.dept_dermatology) // 피부과

            else ->
                getString(R.string.dept_internal) // 내과 (기본값)
        }
    }
}