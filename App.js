/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import {NativeEventEmitter, DeviceEventEmitter, NativeModules, StyleSheet, Text, View} from 'react-native';

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
    }

    constructor(props) {
        super(props);

        this.state = {
            /*初始化msg*/
            msg: '初始化msg',
        }

        DeviceEventEmitter.addListener('kEventEmitter', this.kEventEmitter.bind(this));
        new NativeEventEmitter(NativeModules.RNBridgeModule).addListener('kEventEmitter', this.kEventEmitter.bind(this))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {title}
                </Text>
                <Text style={styles.welcome}>
                {NativeModules.RNBridgeModule.CONSTVALUE}
                {/*{NativeModules.ToastModule.show('Awesome', NativeModules.ToastModule.SHORT)}*/}
                </Text>
                <Text style={styles.welcome}>
                    {this.state.msg}
                </Text>
                <Text style={styles.welcome} onPress={this.pressSelectContract.bind(this)}>
                    选择联系人
                </Text>
                <Text style={styles.welcome} onPress={this.skipNativeCall.bind(this)}>
                    跳转到拨号界面
                </Text>
                <Text style={styles.welcome} onPress={this.pressCallback.bind(this)}>
                    Callback通信方式
                </Text>
                <Text style={styles.welcome} onPress={this.pressPromise.bind(this)}>
                    Promise通信方式
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
