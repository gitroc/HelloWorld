import React, {Component} from 'react';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import TabBarItem from './resource/tab/TabBarItem';
import Icon from './resource/tab/index';
import Home from './Home';
import User from './User';
import Product from './Product';

const Tab = TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({navigation}) => {
                return {
                    tabBarLabel: '首页',
                    tabBarIcon: ({focused, tintColor}) => {
                        return (
                            <TabBarItem
                                tintColor={tintColor}
                                focused={focused}
                                normalIcon={Icon.Tab.home}
                                selectIcon={Icon.Tab.homeSelected}
                            />
                        );
                    }
                };
            }
        },
        Mine: {
            screen: User,
            navigationOptions: ({navigation}) => {
                return {
                    tabBarLabel: '我',
                    tabBarIcon: ({focused, tintColor}) => {
                        return (
                            <TabBarItem
                                tintColor={tintColor}
                                focused={focused}
                                normalIcon={Icon.Tab.user}
                                selectIcon={Icon.Tab.userSelected}
                            />
                        );
                    }
                };
            }
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#06c1ae',
            inactiveTintColor: '#979797',
            style: {backgroundColor: '#ffffff'},
            labelStyle: {
                fontSize: 12 // 文字大小
            }
        }
    }
);

const Navigator = StackNavigator(
    {
        Tab: {screen: Tab},
        Product: {screen: Product}
    },

    {
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
            swipeEnabled: false,
            animationEnabled: false
        },

        mode: 'card'
    });

export default class TabApp extends Component {
    render() {
        return (
            <Navigator/>
        );
    }
}
