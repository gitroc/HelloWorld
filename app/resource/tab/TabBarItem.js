import React, {Component} from 'react';
import {Image} from 'react-native';

export class TabBarItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image source={this.props.focused ? this.props.selectIm : this.props.normalImage}
                style={{tintColor: this.props.tintColor, width: 20, height: 20, resizeMode: 'contain'}}
            />
        );
    }
}
