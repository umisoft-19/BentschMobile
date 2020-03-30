import React from 'react';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './pages/home'
import LoginScreen from './pages/login'
import LeadScreen from './pages/lead'
import LeadListScreen from './pages/lead_list'
import ContactScreen from './pages/contact'
import ImportContactScreen from './pages/import_contact'
import ContactListScreen from './pages/contact_list'
import CustomerScreen from './pages/customer'
import VendorScreen from './pages/vendor'
import LoggerScreen from './pages/logger'
import SyncScreen from './pages/sync'
import EventScreen from './pages/event'
import EventListScreen from './pages/event_list'
import ExpenseScreen from './pages/expense'
import VacationScreen from './pages/vacation'



const AppNavigator = createStackNavigator({
    Login: {screen: LoginScreen},
    ContactList: {screen: ContactListScreen},
    Contact: {screen: ContactScreen},
    ImportContact: {screen: ImportContactScreen},
    Customer: {screen: CustomerScreen},
    Vendor: {screen: VendorScreen},
    Lead: {screen: LeadScreen},
    LeadList: {screen: LeadListScreen},
    Logger: {screen: LoggerScreen},
    Event: {screen: EventScreen},
    EventList: {screen: EventListScreen},
    Expense: {screen: ExpenseScreen},
    Home: {screen: HomeScreen},
    Sync: {screen: SyncScreen},
    Vacation: {screen: VacationScreen}
})


const App = createAppContainer(AppNavigator)

export default App;
