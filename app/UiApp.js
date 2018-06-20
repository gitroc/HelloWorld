/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';
import User from './User';


const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx;
}

export default class UiApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        };

        this.updateTab.bind(this);
    }

    updateTab(tab) {
        this.setState(tab);
    }

    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    selectedTitleStyle={{color: '#3496f0'}}
                    renderIcon={() => {
                        return <Icon name="home" size={px2dp(22)} color="#666"/>;
                    }}
                    renderSelectedIcon={() => {
                        return <Icon name="home" size={px2dp(22)} color="#3496f0"/>;
                    }}
                    badgeText="17"
                    onPress={() => {
                        return this.updateTab({selectedTab: 'home'});
                    }}>
                    <Home/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'user'}
                    title="User"
                    selectedTitleStyle={{color: '#3496f0'}}
                    renderIcon={() => {
                        return <Icon name="user" size={px2dp(22)} color="#666"/>;
                    }}
                    renderSelectedIcon={() => {
                        return <Icon name="user" size={px2dp(22)} color="#3496f0"/>;
                    }}
                    onPress={() => {
                        return this.updateTab({selectedTab: 'user'});
                    }}>
                    <User/>
                </TabNavigator.Item>
            </TabNavigator>
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
    dividingLine: {
        height: 10,
        backgroundColor: '#666666'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    red: {
        color: 'red'
    }
});
