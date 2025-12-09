package com.example.a

import android.media.MediaPlayer
import android.media.MediaRecorder
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.io.File
import java.util.concurrent.TimeUnit

class VoiceInputActivity : AppCompatActivity() {

    override fun attachBaseContext(newBase: android.content.Context?) {
        if (newBase != null) {
            val contextWithLanguage = LanguageUtil.applySavedLanguage(newBase)
            super.attachBaseContext(contextWithLanguage)
        } else {
            super.attachBaseContext(newBase)
        }
    }

    private lateinit var btnBack: ImageButton
    private lateinit var btnMic: ImageButton
    private lateinit var tvRecordingTime: TextView
    private lateinit var btnStop: Button
    private lateinit var btnPlay: Button
    private lateinit var btnDelete: Button
    private lateinit var btnNext: Button

    private var mediaRecorder: MediaRecorder? = null
    private var mediaPlayer: MediaPlayer? = null
    private var recordingFile: File? = null
    private var isRecording = false
    private var isPlaying = false
    private var recordingStartTime = 0L
    private val handler = Handler(Looper.getMainLooper())
    private var updateTimeRunnable: Runnable? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_voiceinput)

        // UI 요소 연결
        btnBack = findViewById(R.id.btnBack)
        btnMic = findViewById(R.id.btnMic)
        tvRecordingTime = findViewById(R.id.tvRecordingTime)
        btnStop = findViewById(R.id.btnStop)
        btnPlay = findViewById(R.id.btnPlay)
        btnDelete = findViewById(R.id.btnDelete)
        btnNext = findViewById(R.id.btnNext)

        // 초기 상태 설정
        updateControlButtons(false)
        tvRecordingTime.text = "00:00"

        // 뒤로가기 버튼
        btnBack.setOnClickListener {
            stopRecording()
            releaseMediaPlayer()
            finish()
        }

        // 마이크 버튼 (녹음 시작/저장)
        btnMic.setOnClickListener {
            if (!isRecording) {
                // 녹음 시작
                startRecording()
            } else {
                // 녹음 중지 (저장)
                stopRecording()
            }
        }

        // 중지 버튼 재생 중일 때만 작동
        btnStop.setOnClickListener {
            if (isPlaying) {
                stopPlayback()
            }
        }

        // 재생 버튼
        btnPlay.setOnClickListener {
            if (recordingFile != null && recordingFile!!.exists()) {
                if (!isPlaying) {
                    startPlayback()
                }
            } else {
                Toast.makeText(this, "녹음 파일이 없습니다.", Toast.LENGTH_SHORT).show()
            }
        }

        // 삭제 버튼
        btnDelete.setOnClickListener {
            deleteRecording()
        }

        // 다음 버튼
        btnNext.setOnClickListener {
            if (recordingFile != null && recordingFile!!.exists()) {
                val intent = android.content.Intent(this, LoadingActivity::class.java)
                intent.putExtra("voiceFilePath", recordingFile!!.absolutePath)
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "먼저 음성을 녹음해주세요.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    // 녹음 시작
    private fun startRecording() {
        try {
            // 녹음 파일 생성
            recordingFile = File(getExternalFilesDir(null), "voice_input_${System.currentTimeMillis()}.m4a")

            mediaRecorder = MediaRecorder().apply {
                setAudioSource(MediaRecorder.AudioSource.MIC)
                setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
                setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
                setOutputFile(recordingFile!!.absolutePath)
                prepare()
                start()
            }

            isRecording = true
            recordingStartTime = System.currentTimeMillis()
            updateControlButtons(false)  // 녹음 중에는 다른 버튼 비활성화

            // 시간 업데이트 시작
            startTimeUpdate()

            Toast.makeText(this, "녹음이 시작되었습니다.", Toast.LENGTH_SHORT).show()
        } catch (e: Exception) {
            Toast.makeText(this, "녹음 시작 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    // 녹음 중지 (저장)
    private fun stopRecording() {
        try {
            if (isRecording && mediaRecorder != null) {
                mediaRecorder?.stop()
                mediaRecorder?.release()
                mediaRecorder = null

                isRecording = false
                stopTimeUpdate()
                updateControlButtons(true)  // 녹음 완료 후 다른 버튼 활성화

                Toast.makeText(this, "녹음이 저장되었습니다.", Toast.LENGTH_SHORT).show()
            }
        } catch (e: Exception) {
            Toast.makeText(this, "녹음 중지 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    // 재생 시작
    private fun startPlayback() {
        try {
            if (recordingFile == null || !recordingFile!!.exists()) {
                Toast.makeText(this, "녹음 파일이 없습니다.", Toast.LENGTH_SHORT).show()
                return
            }

            mediaPlayer = MediaPlayer().apply {
                setDataSource(recordingFile!!.absolutePath)
                prepare()
                start()
            }

            isPlaying = true
            btnMic.isEnabled = false
            btnStop.isEnabled = true  // 재생 중일 때 중지 버튼 활성화
            btnDelete.isEnabled = false  // 재생 중일 때 삭제 버튼 비활성화

            mediaPlayer?.setOnCompletionListener {
                isPlaying = false
                tvRecordingTime.text = "00:00"
                btnMic.isEnabled = true
                btnStop.isEnabled = false  // 재생 완료 후 중지 버튼 비활성화
                btnDelete.isEnabled = true  // 재생 완료 후 삭제 버튼 활성화
            }

            startPlaybackTimeUpdate()
            Toast.makeText(this, "재생 중...", Toast.LENGTH_SHORT).show()
        } catch (e: Exception) {
            Toast.makeText(this, "재생 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    // 재생 중지
    private fun stopPlayback() {
        try {
            if (mediaPlayer != null && isPlaying) {
                mediaPlayer?.stop()
                mediaPlayer?.release()
                mediaPlayer = null

                isPlaying = false
                tvRecordingTime.text = "00:00"
                stopTimeUpdate()
                btnMic.isEnabled = true
                btnStop.isEnabled = false  // 재생 중지 후 중지 버튼 비활성화
                btnDelete.isEnabled = true  // 재생 중지 후 삭제 버튼 활성화

                Toast.makeText(this, "재생이 중지되었습니다.", Toast.LENGTH_SHORT).show()
            }
        } catch (e: Exception) {
            Toast.makeText(this, "재생 중지 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    // 녹음 삭제
    private fun deleteRecording() {
        try {
            releaseMediaPlayer()
            if (recordingFile != null && recordingFile!!.exists()) {
                recordingFile!!.delete()
            }
            recordingFile = null
            isRecording = false
            isPlaying = false
            tvRecordingTime.text = "00:00"
            updateControlButtons(false)
            btnMic.isEnabled = true

            Toast.makeText(this, "녹음이 삭제되었습니다.", Toast.LENGTH_SHORT).show()
        } catch (e: Exception) {
            Toast.makeText(this, "삭제 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    // 녹음 시간 업데이트
    private fun startTimeUpdate() {
        updateTimeRunnable = object : Runnable {
            override fun run() {
                if (isRecording) {
                    val elapsedTime = System.currentTimeMillis() - recordingStartTime
                    val minutes = TimeUnit.MILLISECONDS.toMinutes(elapsedTime)
                    val seconds = TimeUnit.MILLISECONDS.toSeconds(elapsedTime) % 60
                    tvRecordingTime.text = String.format("%02d:%02d", minutes, seconds)
                    handler.postDelayed(this, 1000)
                }
            }
        }
        handler.post(updateTimeRunnable!!)
    }

    // 재생 시간 업데이트
    private fun startPlaybackTimeUpdate() {
        updateTimeRunnable = object : Runnable {
            override fun run() {
                if (isPlaying && mediaPlayer != null) {
                    val position = mediaPlayer!!.currentPosition.toLong()
                    val minutes = TimeUnit.MILLISECONDS.toMinutes(position)
                    val seconds = TimeUnit.MILLISECONDS.toSeconds(position) % 60
                    tvRecordingTime.text = String.format("%02d:%02d", minutes, seconds)
                    handler.postDelayed(this, 1000)
                }
            }
        }
        handler.post(updateTimeRunnable!!)
    }

    // 시간 업데이트 중지
    private fun stopTimeUpdate() {
        if (updateTimeRunnable != null) {
            handler.removeCallbacks(updateTimeRunnable!!)
        }
    }

    // 제어 버튼 활성화/비활성화
    private fun updateControlButtons(hasRecording: Boolean) {
        btnStop.isEnabled = false  // 기본값으로 항상 비활성화 (재생 중일 때만 활성화)
        btnPlay.isEnabled = hasRecording
        btnDelete.isEnabled = hasRecording
    }

    // MediaPlayer 해제
    private fun releaseMediaPlayer() {
        try {
            if (mediaPlayer != null) {
                mediaPlayer?.release()
                mediaPlayer = null
            }
            isPlaying = false
            stopTimeUpdate()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        stopRecording()
        releaseMediaPlayer()
    }
}