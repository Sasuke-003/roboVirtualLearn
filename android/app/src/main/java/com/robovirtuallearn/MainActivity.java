package com.robovirtuallearn;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; //added for splash screen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   @Override
protected void onCreate(Bundle savedInstanceState) {
  SplashScreen.show(this); //added for splash screen
  super.onCreate(null);
}
  @Override
  protected String getMainComponentName() {
    return "roboVirtualLearn";
  }
}
