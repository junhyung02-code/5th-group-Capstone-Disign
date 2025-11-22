package com.testapp

// 1. react-navigation을 위한 import를 추가합니다.
import android.os.Bundle; 
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "TestApp"

  /**
   * 2. react-native-screens (네비게이션) 라이브러리가 요구하는 필수 코드입니다.
   * 이것 하나만 추가하면 됩니다.
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null) 
  }

  /**
   * 3. 이 부분은 '새 아키텍처'를 사용하지 않는
   * 프로젝트의 '기본값' 코드입니다.
   * (오류가 났던 getFabricEnabled 함수가 없습니다.)
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(
      this,
      mainComponentName,
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      DefaultNewArchitectureEntryPoint.fabricEnabled,
      // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
      DefaultNewArchitectureEntryPoint.concurrentReactEnabled
    )
  }
}