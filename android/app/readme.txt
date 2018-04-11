打包js包命令
react-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.bundle --platform android --assets-dest ./android/app/src/main/assets/ --dev false

打包apk包命令
./gradlew clean
./gradlew assembleRelease