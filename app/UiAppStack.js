import {
    StackNavigator
} from 'react-navigation';

import UiTab from 'app/UiTab';

export const UiAppStack = StackNavigator({
    Tab: {
        screen: UiTab,
        navigationOptions: {
            header: null
        }
    }
});
