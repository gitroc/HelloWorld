import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Greeting extends Component {
    render() {
        return (
            <Text style={styles.instructions}>Hello {this.props.name}!, Your ages is {this.props.age}</Text>
        );
    }
}

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = { showText: true };

        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState(previousState => {
                return { showText: !previousState.showText };
            });
        }, 1000);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        let display = this.state.showText ? this.props.text : ' ';
        return (
            <Text style={styles.instructions}>{display}</Text>
        );
    }
}

export default class Ui extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Props 学习
                </Text>
                <Greeting name='Rexxar' />
                <Greeting name='Jaina' />
                <Greeting name='Valeera' age='100' />

                <Text style={styles.welcome}>
                    State 学习
                </Text>
                <Blink text='I love to blink' />
                <Blink text='Yes blinking is so great' />
                <Blink text='Why did they ever take this out of HTML' />
                <Blink text='Look at me look at me look at me' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 80,
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