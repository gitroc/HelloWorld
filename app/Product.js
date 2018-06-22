import React, {Component} from 'react';
import {StyleSheet, Button, View} from 'react-native';

export default class Product extends Component {
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
