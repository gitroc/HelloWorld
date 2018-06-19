import React, {Component, View} from 'react';
import UiAppStack from 'app/UiAppStack';

export default class UiApp extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Navigator
                    initialRoute={{ name: 'AppNavigator', component: UiAppStack }}
                    configureScene={() => {return Navigator.SceneConfigs.PushFromRight;}}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component navigator={navigator} {...route.params}/>;
                    }
                    }
                />
            </View>
        );
    }
}
