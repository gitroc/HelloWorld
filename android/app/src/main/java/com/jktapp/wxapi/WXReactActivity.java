package com.jktapp.wxapi;

import com.facebook.react.ReactActivity;

import javax.annotation.Nullable;

/**
 * Created by roc on 2018/3/20.
 */

public class WXReactActivity extends ReactActivity {
    @Nullable
    @Override
    protected String getMainComponentName() {
        return "WxApp";
    }
}
