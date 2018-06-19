
import React from 'react';
import {Image} from 'react-native';
import {TabNavigator, TabBarBottom, TabView} from 'react-navigation';

import Home from 'app/Home';
import User from 'app/User';
import {Tab} from 'app/resource/tab/index';


class TabBar extends Comment{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image source={this.props.focused ? this.props.imageSelected : this.props.imageNormal}
                style={{tintColor: this.props.tintColor, width: 20, height: 20, resizeMode: 'contain'}}
            />
        );
    }
}

export const UiTab = TabNavigator(
    {
        tabHome: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => {
                    return (
                        <TabBar
                            focused={focused}
                            tintColor={tintColor}
                            imageNormal={Tab.home}
                            imageSelected={Tab.homeSelected}
                        />
                    );
                }
            }
        },
        tabUser: {
            screen: User,
            navigationOptions: {
                tabBarLabel: '我',
                tabBarIcon: ({focused, tintColor}) => {
                    return (
                        <TabBar
                            focused={focused}
                            tintColor={tintColor}
                            imageNormal={Tab.user}
                            imageSelected={Tab.userSelected}
                        />
                    );
                }
            }
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        showIcon: true,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            // activeTintColor:'#06c1ae',
            // inactiveTintColor:'#979797',
            style: {backgroundColor: '#fff'}, //tabbar的高度，顏色
            labelStyle: {
                fontSize: 9, // 文字大小
                color: '#999', //文字顏色，黑色
                marginBottom: 4
            }
        }
    }
);
