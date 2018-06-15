/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import {
    Platform,
    NativeEventEmitter,
    DeviceEventEmitter,
    NativeModules,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';
import _updateConfig from './update.json';

const {appKey} = _updateConfig[Platform.OS];

let title = 'React Native世界';

export default class App extends Component {
    /**
     * 调用Native页面选择联系人
     */
    pressSelectContract() {
        console.log('pressSelectContract');
        // 调用Native页面
        NativeModules.RNBridgeModule.handleMessage("I press button.");
    }

    skipNativeCall() {
        let phone = '18721756393';
        NativeModules.RNBridgeModule.rnCallNative(phone);
    }

    /**
     * 测试Callback
     */
    pressCallback() {
        NativeModules.RNBridgeModule.handleCallback('i will be callback', (msg) => {
            console.log(msg);
        });
    }

    /**
     * 测试Promise
     */
    pressPromise() {
        /*NativeModule.ExampleInterface.handlePromise 返回的是一个Promise对象*/
        NativeModules.RNBridgeModule.handlePromise('i will be promise').then((msg) => {
            console.log(msg)
        })
            .catch((error) => {
                console.log(error)
            });
    }

    kEventEmitter(msg) {
        console.log(msg);
        this.setState({msg: msg});
        this.refs.toast.show(msg);
    }

    constructor(props) {
        super(props);

        this.state = {
            /*初始化msg*/
            msg: '初始化msg',
        }

        DeviceEventEmitter.addListener('kEventEmitter', this.kEventEmitter.bind(this));
        new NativeEventEmitter(NativeModules.RNBridgeModule).addListener('kEventEmitter', this.kEventEmitter.bind(this))

        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {
                    text: '是', onPress: () => {
                        throw new Error('模拟启动失败,请重启应用')
                    }
                },
                {
                    text: '否', onPress: () => {
                        markSuccess()
                    }
                },
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }

    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {
                    text: '是', onPress: () => {
                        switchVersion(hash);
                    }
                },
                {text: '否',},
                {
                    text: '下次启动时', onPress: () => {
                        switchVersionLater(hash);
                    }
                },
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {
                        text: '确定', onPress: () => {
                            info.downloadUrl && Linking.openURL(info.downloadUrl)
                        }
                    },
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
                    {
                        text: '是', onPress: () => {
                            this.doUpdate(info)
                        }
                    },
                    {text: '否',},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {title}
                </Text>
                <Text style={styles.instructions}>
                    {NativeModules.RNBridgeModule.CONSTVALUE}
                </Text>
                <Text style={styles.instructions}>
                    {this.state.msg}
                </Text>
                <Text style={styles.instructions} onPress={this.pressSelectContract.bind(this)}>
                    选择联系人
                </Text>
                <Text style={styles.instructions} onPress={this.skipNativeCall.bind(this)}>
                    跳转到拨号界面
                </Text>
                <Text style={styles.instructions} onPress={this.pressCallback.bind(this)}>
                    Callback通信方式
                </Text>
                <Text style={styles.instructions} onPress={this.pressPromise.bind(this)}>
                    Promise通信方式
                </Text>
                <Text style={styles.welcome}>
                    欢迎使用热更新服务
                </Text>
                <Text style={styles.instructions}>
                    这是版本一 {'\n'}
                    当前包版本号: {packageVersion}{'\n'}
                    当前版本Hash: {currentVersion || '(空)'}{'\n'}
                </Text>
                <TouchableOpacity onPress={this.checkUpdate.bind(this)}>
                    <Text style={styles.instructions}>
                        点击这里检查更新
                    </Text>
                </TouchableOpacity>
                <Toast
                    ref="toast"
                    style={{backgroundColor: '#cdcdcd'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color: 'white'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        paddingTop: 80
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
