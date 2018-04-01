package com.easyrongfund;

import com.facebook.react.ReactActivity;

/**
 * Created by roc on 2018/3/12.
 */

public class ReactNativeActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "App";
    }
}