打包js包命令
1. iOS
react-native bundle --entry-file index.js --dev false --platform ios --bundle-output ./ios/bundle/index.jsbundle --assets-dest ./ios/bundle

2. Android
react-native bundle --entry-file index.js --dev false --platform android --bundle-output ./android/app/src/main/assets/index.bundle --assets-dest ./android/app/src/main/assets/


iOS打包请使用Xcode Archive

Android 打包apk包命令, 配置好gradle环境变量
gradle clean
gradle assembleRelease