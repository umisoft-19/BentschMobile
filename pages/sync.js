
import React, {useState, useEffect} from 'react';
import Overlay from '../components/overlay'
import {StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import {Input, Item} from 'native-base'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { Button,
          View,
          Text,
          Card,
          CardItem,
          Body
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

styles = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 120,
    left: 16,
    right: 16,
    bottom: 0
  }
})

const SyncElement =(props) =>{
  
  return(
    <View style={{flexDirection: 'row', marginBottom: 8, padding:4}}>
                <Text style={{flex: 3}}>{props.name}...</Text>
                {props.statusVar ? 
                  <FontAwesomeIcon icon={faCheck} color='#007bff'/> : 
                  <ActivityIndicator size="small" color="#007bff" />}
                
              </View>    
  )
}

const SyncScreen = () => {
  const [leadsDone, setLeadsDone] = useState(true)
  const [jobsDone, setJobsDone] = useState(false)
  const [eventsDone, setEventsDone] = useState(false)
  const [customersDone, setCustomersDone] = useState(false)
  const [vendorsDone, setVendorsDone] = useState(false)
  const [contactsDone, setContactsDone] = useState(false)
  const [employeesDone, setEmployeesDone] = useState(false)
  const [server, setServer] = useState('')
  const [lastSync, setLastSync] = useState(null)

  useEffect(() =>{
    async function init(){
      const srv = await AsyncStorage.getItem('server')
      const token = await AsyncStorage.getItem('token')
      setServer(srv)
      const last = await AsyncStorage.getItem('lastSync')
      setLastSync(last)  
      //push all pending customers
      // pull customer list

      //push pending events
      //pull all events

      //push pending vendors
      //pull all vendors

      //push pending contacts
      //pull all contacts

      //pull employees

      //pull leads

      //pull jobs

    }
    init()
  }, [])

  
  return (
      <Overlay>
        <ScrollView style={styles.window}>
        <Card>
          <CardItem>
            <Body>
              <Text style={{fontSize: 24, textAlign: 'center', width: '100%',marginBottom: 12}}>Syncing application</Text>
              <Text style={{fontSize: 18, width: '100%',marginBottom: 12, color: '#aaa'}}>LAST SYNCED: {lastSync}</Text>
              <View style={{backgroundColor: 'powderblue',width: '100%', padding: 12}}>
                <Text style={{fontWeight: '700'}}>Server:</Text>
                  <Item>
                    <Text>http://</Text>
                  <Input value={server} onChangeText={text => setServer(text)}/>
                  <Button>

                  </Button>
                </Item>
              </View>
              <SyncElement 
                name='Leads'
                statusVar={leadsDone}/>
              <SyncElement 
                name='Jobs'
                statusVar={jobsDone}/>
              <SyncElement 
                name='Customers'
                statusVar={customersDone}/>
              <SyncElement 
                name='Vendors'
                statusVar={vendorsDone}/>
              <SyncElement 
                name='Employees'
                statusVar={employeesDone}/>
              <SyncElement 
                name='Contacts'
                statusVar={contactsDone}/>
              <SyncElement 
                name='Events'
                statusVar={eventsDone}/>
            </Body>
          </CardItem>
          </Card>
        </ScrollView>
      </Overlay>
  );
};

export default SyncScreen;
