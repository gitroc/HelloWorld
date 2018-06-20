import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class User extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    User
                </Text>
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
        margin: 10
    }
});
