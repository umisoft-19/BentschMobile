import React from 'react';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './pages/home'
import LoginScreen from './pages/login'
import LeadScreen from './pages/lead'
import ContactScreen from './pages/contact'
import CustomerScreen from './pages/customer'
import VendorScreen from './pages/vendor'
import LoggerScreen from './pages/logger'
import SyncScreen from './pages/sync'
import EventScreen from './pages/event'
import ExpenseScreen from './pages/expense'
import VacationScreen from './pages/vacation'



const AppNavigator = createStackNavigator({
    Login: {screen: LoginScreen},
    Contact: {screen: ContactScreen},
    Customer: {screen: CustomerScreen},
    Vendor: {screen: VendorScreen},
    Lead: {screen: LeadScreen},
    Logger: {screen: LoggerScreen},
    Event: {screen: EventScreen},
    Expense: {screen: ExpenseScreen},
    Home: {screen: HomeScreen},
    Sync: {screen: SyncScreen},
    Vacation: {screen: VacationScreen}
})


const App = createAppContainer(AppNavigator)

export default App;
