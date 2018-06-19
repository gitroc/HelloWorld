import React, {Component} from 'react';
import {StyleSheet, Text, View, BackHandler, ToastAndroid} from 'react-native';

class Greeting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={[styles.instructions, styles.red]}>
                Hello {this.props.name}!, Your ages is {this.props.age}
            </Text>
        );
    }
}

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: true};

        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState((previousState) => {
                return {showText: !previousState.showText};
            });
        }, 1000);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        let display = this.state.showText ? this.props.text : ' ';
        return (
            <Text style={[styles.instructions, styles.bigblue]}>
                {display}
            </Text>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {state, props} = this;
        if (nextProps.formList.length && !this.state.formId) {
            this.setState({formId: nextProps.formList[0].formOriginId});
        }
        props.getFormTemplate({
            formId: nextProps.formList[0].formOriginId
        });
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.titleProps = 'Props 学习';
        this.name = ['Rexxar', 'Jaina', 'Valeera'];
        this.age = [0, 0, 100];

        this.titleState = 'State 学习';
        this.text = [
            'I love to blink',
            'Yes blinking is so great',
            'Why did they ever take this out of HTML',
            'Look at me look at me look at me'
        ];
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.titleProps}
                </Text>
                <Greeting name={this.name[0]}/>
                <Greeting name={this.name[1]}/>
                <Greeting name={this.name[2]} age={this.age[2]}/>

                <View style={styles.dividingLine}/>

                <Text style={styles.welcome}>
                    {this.titleState}
                </Text>
                <Blink text={this.text[0]}/>
                <Blink text={this.text[1]}/>
                <Blink text={this.text[2]}/>
                <Blink text={this.text[3]}/>
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
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

    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16
    },
    red: {
        color: 'red'
    }
});
