package com.jktapp;

import android.app.Application;

import com.facebook.react.ReactApplication;

import cn.jiguang.share.android.api.JShareInterface;
import cn.jiguang.share.reactnative.JSharePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.theweflex.react.WeChatPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import cn.reactnative.modules.update.UpdateContext;
import cn.reactnative.modules.update.UpdatePackage;

public class MainApplication extends Application implements ReactApplication {
    // 设置为 true 将不弹出 toast
    private boolean SHUTDOWN_TOAST = true;
    // 设置为 true 将不打印 log
    private boolean SHUTDOWN_LOG = false;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Nullable
        @Override
        protected String getJSBundleFile() {
            return UpdateContext.getBundleUrl(MainApplication.this);
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new JSharePackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
                    new UpdatePackage(),
                    new WeChatPackage(),
                    new AnExampleReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        // 在 Init 之前调用，设置为 true，则会打印 debug 级别日志，否则只会打印 warning 级别以上的日志
        // JShareInterface.setDebugMode(true);
        JShareInterface.init(this);
    }
}





