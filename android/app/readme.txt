打包js包命令
React-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false


打包apk包命令
./gradlew assembleRelease