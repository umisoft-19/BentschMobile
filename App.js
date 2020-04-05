import React from 'react';
import {Button} from 'react-native'

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
import JobScreen from './pages/job'
import JobListScreen from './pages/job_list'


const headerStyles = {
    headerTintColor: 'white',
  headerStyle: {
     backgroundColor: '#23374d'
  }
}
const AppNavigator = createStackNavigator({
    
    Login: {screen: LoginScreen, navigationOptions:{
        header: null
    }
},
    'Contacts List': {screen: ContactListScreen, navigationOptions: headerStyles},
    Contact: {screen: ContactScreen, navigationOptions: {...headerStyles, title:'Create Contact'}},
    'Import Contact': {screen: ImportContactScreen, navigationOptions: {...headerStyles, title:'Import Contacts'}},
    Customer: {screen: CustomerScreen, navigationOptions: {...headerStyles, title:'Create Customer'}},
    Vendor: {screen: VendorScreen, navigationOptions: headerStyles},
    Sync: {screen: SyncScreen, navigationOptions: headerStyles},
    Lead: {screen: LeadScreen, navigationOptions: {...headerStyles, title:'Create Lead'}},
    'Leads List': {screen: LeadListScreen,navigationOptions:{
        header: null
    }},
    Logger: {screen: LoggerScreen, navigationOptions: {...headerStyles, title:'Time Logger'}},
    Event: {screen: EventScreen, navigationOptions: {...headerStyles, title:'Create Event'}},
    'Events List': {screen: EventListScreen, navigationOptions: headerStyles},
    Expense: {screen: ExpenseScreen, navigationOptions: headerStyles},
    Home: {
            screen: HomeScreen, 
            navigationOptions: ({navigation, route}) => ({
                headerTintColor: 'white',
                headerStyle: {
                   backgroundColor: '#23374d'
                },
                headerRight: () => (<Button
                                        onPress={() => {navigation.navigate('Sync')}}
                                        title="SYNC"
                                        color="#23374d"/>)
            })
    },
    Vacation: {screen: VacationScreen, navigationOptions: {...headerStyles, title:'Vacation Application'}},
    Job: {screen: JobScreen, navigationOptions: headerStyles},
    'Jobs List': {screen: JobListScreen, navigationOptions: headerStyles}
})


const App = createAppContainer(AppNavigator)

export default App;

