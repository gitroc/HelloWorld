package com.jktapp;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by roc on 2018/3/12.
 */

public class RNBridgeModule extends ReactContextBaseJavaModule {
    private static final String TAG = "RNBridgeModule";

    public static final int REQUEST_CONTACTS_CODE = 100;

    private ReactApplicationContext mContext;

    public RNBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        setupLifecycleEventListener(reactContext);
        setupActivityResultListener(reactContext);
        this.mContext = reactContext;
    }

    private void setupActivityResultListener(ReactApplicationContext reactContext) {
        reactContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode,
                                         int resultCode, Intent data) {
                if (requestCode != REQUEST_CONTACTS_CODE || resultCode != Activity.RESULT_OK) {
                    return;
                }
                /*如果选取ok,开始读取联系人信息*/
                String msg = pareContactMsg(data.getData());
                /*发送给RN*/
                sendMsgToRN(msg);
            }
        });
    }

    private void setupLifecycleEventListener(ReactApplicationContext reactContext) {
        reactContext.addLifecycleEventListener(new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                Log.i(TAG, "onHostResume: ");
            }

            @Override
            public void onHostPause() {
                Log.i(TAG, "onHostPause: ");
            }

            @Override
            public void onHostDestroy() {
                Log.i(TAG, "onHostDestroy: ");
            }
        });
    }


    /**
     * 向RN发送消息
     *
     * @param msg
     */
    private void sendMsgToRN(String msg) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("kEventEmitter", msg);
    }

    /**
     * 从返回的uri中查询出联系人信息。
     *
     * @param uri
     * @return
     */
    private String pareContactMsg(Uri uri) {
        Cursor cursor = null;
        Cursor phoneNumberCursor = null;
        String msg = "没有找到联系人";
        try {
            cursor = mContext.getContentResolver().query(uri, null, null, null, null);
            if (null != cursor && cursor.moveToFirst()) {
                long id = cursor.getLong(cursor.getColumnIndex(ContactsContract.Contacts._ID));
                String name = cursor.
                        getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
                int hasPhoneNumber = cursor
                        .getInt(cursor.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER));
                String phoneNumber = "";
                if (hasPhoneNumber == 1) {
                    phoneNumberCursor = mContext.getContentResolver().query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, ContactsContract
                                    .CommonDataKinds.Phone.CONTACT_ID + " = ?",
                            new String[]{String.valueOf(id)}, null);
                    if (phoneNumberCursor != null && phoneNumberCursor.moveToFirst()) {
                        phoneNumber = phoneNumberCursor.getString(
                                phoneNumberCursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)
                        );
                    }
                }
                msg = "{姓名: " + name + ", 电话号码:" + phoneNumber + "}";
            }
        } finally {
            if (null != phoneNumberCursor) {
                phoneNumberCursor.close();
            }
            if (null != cursor) {
                cursor.close();
            }
            return msg;
        }
    }

    @Override
    public String getName() {
        return "RNBridgeModule";
    }

    @ReactMethod
    public void rnCallNative(String phone) {

        // 跳转到打电话界面
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_CALL);
        intent.setData(Uri.parse("tel:" + phone));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // 跳转需要添加flag, 否则报错
        mContext.startActivity(intent);
    }

    /**
     * 这里是原生代码处理消息的函数。
     * <p>
     * 回调参数的对应关系，java -> js
     * Boolean -> Bool
     * Integer -> Number
     * Double -> Number
     * Float -> Number
     * String -> String
     * Callback -> function
     * ReadableMap -> Object
     * ReadableArray -> Array
     *
     * @param msg RN传过来的参数
     * @return void 函数不能又返回值
     */
    @ReactMethod
    public void handleMessage(String msg) {
        Log.i("RNMessage", "receive message from RN:" + msg);
        /*调用联系人页面*/
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_PICK);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        this.mContext.startActivityForResult(intent, REQUEST_CONTACTS_CODE, new Bundle());
    }

    @ReactMethod
    public void handleCallback(String msg, Callback callback) {
        Log.i(TAG, "handleCallback: msg:" + msg);
        Log.i(TAG, "开始回调 js");
        callback.invoke(msg);
    }

    @ReactMethod
    public void handlePromise(String msg, Promise promise) {
        try {
            promise.resolve(msg);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    /**
     * 返回常量
     *
     * @return 常量字典
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("CONSTVALUE", "我是一个常量，我来自Native");
        return constants;
    }
}
