package com.easyrongfund;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.Button;

import com.easyrongfund.wxapi.WXReactActivity;

public class MainActivity extends Activity {

    private Button bt_skip;
    private Button bt_share;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bt_skip = (Button) findViewById(R.id.button_skip);
        bt_share = (Button) findViewById(R.id.button_share);

        bt_skip.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, ReactNativeActivity.class);
                startActivity(intent);
            }
        });

        bt_share.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, WXReactActivity.class);
                startActivity(intent);
            }
        });
    }
}
