import React, {Component} from 'react';
import {StyleSheet, Button, View, TouchableOpacity, Platform, Image, Text} from 'react-native';
import JShareModule from 'jshare-react-native';
import Icon from './resource/share/index';

export default class Product extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            JShareModule.setup();
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    onShareWXFriendPress = () => {
        JShareModule.isWeChatInstalled((isInstalled) => {
            if (isInstalled === true) {
                console.log('wechat is intalled');
            } else {
                console.log('您还未安装微信，请先安装微信！');
                return;
            }
        });

        JShareModule.share({
            platform: 'wechat_session',
            type: 'link',
            url: 'www.baidu.com', // 必填，网页 url
            imagePath: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
            title: '微信', // 选填
            text: '分享到微信' // 选填
        }, (map) => {
            console.log('share succeed, map: ' + JSON.stringify(map));
        }, (map) => {
            console.log('share failed, map: ' + JSON.stringify(map));
        });
    };

    onShareWXCirclePress = () => {
        JShareModule.isWeChatInstalled((isInstalled) => {
            if (isInstalled === true) {
                console.log('wechat is intalled');
            } else {
                console.log('您还未安装微信，请先安装微信！');
                return;
            }
        });
        JShareModule.share({
            platform: 'wechat_timeLine',
            type: 'link',
            url: 'www.baidu.com', // 必填，网页 url
            imagePath: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
            title: '微信', // 选填
            text: '分享到朋友圈' // 选填
        }, (map) => {
            console.log('share succeed, map: ' + JSON.stringify(map));
        }, (map) => {
            console.log('share failed, map: ' + JSON.stringify(map));
        });
    };

    onShareQQFriendPress = () => {
        JShareModule.isQQInstalled((isInstalled) => {
            if (isInstalled === true) {
                console.log('QQ is intalled');
            } else {
                console.log('您还未安装QQ，请先安装QQ！');
                return;
            }
        });

        JShareModule.share({
            platform: 'qq',
            type: 'link',
            url: 'www.baidu.com', // 必填，网页 url
            imagePath: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
            title: 'QQ', // 选填
            text: '分享到QQ' // 选填
        }, (map) => {
            console.log('share succeed, map: ' + JSON.stringify(map));
        }, (map) => {
            console.log('share failed, map: ' + JSON.stringify(map));
        });
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Button
                    style={styles.welcome}
                    title="Go to Roc's User"
                    onPress={() => {
                        navigate('Tab', {name: 'Jane'});
                    }}
                />
                <View style={styles.modalContent}>
                    <View style={styles.modalCont}>
                        <TouchableOpacity style={styles.item} onPress={this.onShareWXFriendPress}>
                            <Image resizeMode='contain' style={styles.image} source={Icon.Share.weChatSession}/>
                            <Text style={styles.bottomText}>微信</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={this.onShareWXCirclePress}>
                            <Image resizeMode='contain' style={styles.image} source={Icon.Share.weChatTimeLine}/>
                            <Text style={styles.bottomText}>朋友圈</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={this.onShareQQFriendPress}>
                            <Image resizeMode='contain' style={styles.image} source={Icon.Share.qq}/>
                            <Text style={styles.bottomText}>QQ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'relative',
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    modalContent: {
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5
    },
    modalCont: {
        paddingTop: 30,
        paddingBottom: 20,
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        height: 72,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    image: {
        width: 48,
        height: 48,
        marginBottom: 8
    },
    bottomText: {
        textAlign: 'center',
        lineHeight: 40,
        color: '#cea770'
    }
});
