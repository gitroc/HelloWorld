/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {ToastAndroid, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

var WeChat = require('react-native-wechat');
import Toast, {DURATION} from 'react-native-easy-toast'

//import fs from 'react-native-fs';
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

export default class WxApp extends Component {
    constructor(props) {
        super(props);
        //应用注册
        WeChat.registerApp('wx00ae1ff9e5646e91');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    微信好友/朋友圈分享实例
                </Text>
                <CustomButton text='微信好友分享-文本'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToSession({type: 'text', description: '测试微信好友分享文本'})
                                                  .catch((error) => {
                                                      console.log(error);
                                                      this.refs.toast.show(error.message);
                                                  });
                                          } else {
                                              this.refs.toast.show('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
                <CustomButton text='微信好友分享-链接'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToSession({
                                                  title: '微信好友测试链接',
                                                  description: '分享自:江清清的技术专栏(www.lcode.org)',
                                                  thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                                                  type: 'news',
                                                  webpageUrl: 'http://www.lcode.org'
                                              })
                                                  .catch((error) => {
                                                      this.refs.toast.show(error.message);
                                                  });
                                          } else {
                                              this.refs.toast.show('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
                <CustomButton text='微信朋友圈分享-文本'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享文本'})
                                                  .catch((error) => {
                                                      this.refs.toast.show(error.message);
                                                  });
                                          } else {
                                              this.refs.toast.show('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
                <CustomButton text='微信朋友圈分享-链接'
                              onPress={() => {
                                  WeChat.isWXAppInstalled()
                                      .then((isInstalled) => {
                                          if (isInstalled) {
                                              WeChat.shareToTimeline({
                                                  title: '微信朋友圈测试链接',
                                                  description: '分享自:江清清的技术专栏(www.lcode.org)',
                                                  thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                                                  type: 'news',
                                                  webpageUrl: 'http://www.lcode.org'
                                              })
                                                  .catch((error) => {
                                                      this.refs.toast.show(error.message);
                                                  });
                                          } else {
                                              this.refs.toast.show('没有安装微信软件，请您安装微信之后再试');
                                          }
                                      });
                              }}
                />
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#434343'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
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
    button: {
        margin: 5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
});