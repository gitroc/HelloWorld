package com.rocday;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.theweflex.react.WeChatPackage;
import cn.reactnative.modules.update.UpdatePackage;
import cn.reactnative.modules.update.UpdateContext;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

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
                    new VectorIconsPackage(),
                    new WeChatPackage(),
                    new VectorIconsPackage(),
                    new UpdatePackage(),
                    new VectorIconsPackage(),
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
    }
}
