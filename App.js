import React from 'react';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './pages/home'
import LoginScreen from './pages/login'
import SyncScreen from './pages/sync'
import EventScreen from './pages/event'



const AppNavigator = createStackNavigator({
    Login: {screen: LoginScreen},
    Event: {screen: EventScreen},
    Home: {screen: HomeScreen},
    Sync: {screen: SyncScreen},
})


const App = createAppContainer(AppNavigator)

export default App;
