package com.jktapp.wxapi;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.theweflex.react.WeChatModule;

import cn.jiguang.share.wechat.WeChatHandleActivity;

/**
 * Created by roc on 2018/3/19.
 */

public class WXEntryActivity extends WeChatHandleActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());

        finish();
    }
}
