import React, {Component} from 'react';
import {Image} from 'react-native';

export default class TabBarItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Image source={this.props.focused ? this.props.selectIcon : this.props.normalIcon}
                style={{tintColor: this.props.tintColor, width: 20, height: 20, resizeMode: 'contain'}}
            />
        );
    }
}
