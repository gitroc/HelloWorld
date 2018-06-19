import { AppRegistry } from 'react-native';
import App from './app/App';
import WxApp from './app/WxApp';
import UiApp from './app/UiApp';

AppRegistry.registerComponent('App', () => {return App;});
AppRegistry.registerComponent('WxApp', () => {return WxApp;});
AppRegistry.registerComponent('UiApp', () => {return UiApp;});
