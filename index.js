/** @format */

import { AppRegistry, Dimensions } from 'react-native';
import App from './App';
// import { DrawerNavigator } from 'react-navigation';
import {name as appName} from './app.json';
import BasicFlatList from './components/BasicFlatList'
import HorizontalFlatList from './components/HorizontalFlatList';
import BasicSectionList from './components/BasicSectionList';
import LifeCycleComponent from './components/LifeCycleComponent';
import Login from './components/Login';
import Splash from './components/Splash';
import HomeComponent from './components/HomeComponent';
import InfoComponent from './components/InfoComponent';
import SettingsComponent from './components/SettingsComponent';
import CloudComponent from './components/CloudComponent';
import EmployeeFlatList from './components/EmployeeFlatList'
//Screen names
import { Home, Info, Settings, Cloud } from './screenNames';
//Screen size
var {height, width} = Dimensions.get('window');

// import { StackNavigator } from 'react-navigation';
//Screen names
// import MainComponent from './components/MainComponent';
// import DetailComponent from './components/DetailComponent';
// import ThirdComponent from './components/ThirdComponent';
// import { MainScreen, DetailScreen, ThirdScreen } from './screenNames';
// const App = StackNavigator({
//     MainScreen: {
//         screen: MainComponent,
//         navigationOptions: {
//             headerTitle: 'Main',
//         },
//     },
//     DetailScreen: {
//         screen: DetailComponent,
//         navigationOptions: {
//             headerTitle: 'Detail',
//         },
//     },
//     ThirdScreen: {
//         screen: ThirdComponent,
//         navigationOptions: {
//             headerTitle: 'Third',
//         },
//     },
// });
// class Main extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { currentScreen: 'Splash' };
//         console.log('Start doing some tasks for about 3 seconds')
//         setTimeout(()=>{
//             console.log('Done some tasks for about 3 seconds')
//             this.setState({ currentScreen: 'Login' })
//         }, 3000)
//     }
//     render() {
//         const { currentScreen } = this.state
//         let mainScreen = currentScreen === 'Splash' ? <Splash /> : <Login />
//         return mainScreen
//     }
// }
// let routeConfigs = {
//     Home: {
//         path: '/',
//         screen: HomeComponent,
//     },
//     Info: {
//         path: '/info',
//         screen: InfoComponent,
//     },
//     Settings: {
//         screen: SettingsComponent,
//     },
//     Cloud: {
//         screen: CloudComponent,
//     },
// };
// let drawerNavigatorConfig = {
//     initialRouteName: Home,
//     drawerWidth: width / 2,
//     drawerPosition: 'left',
//     drawerOpenRoute: 'DrawerOpen',
//     drawerCloseRoute: 'DrawerClose',
//     drawerToggleRoute: 'DrawerToggle',
//     // drawerBackgroundColor: 'orange',
//     contentOptions: {
//         activeTintColor: 'red',
//     },
//     order: [Info, Settings, Cloud, Home]
// };
// const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig);
AppRegistry.registerComponent('AwesomeProject', () => App);
