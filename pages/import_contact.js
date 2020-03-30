import React from 'react';
import {StyleSheet, ScrollView, Linking, TextInput, PermissionsAndroid} from 'react-native'
import Overlay from '../components/overlay'
import Contacts from 'react-native-contacts';

import axios from 'axios'
import {Text,
         Card,
         CardItem,
         View,
         Button,
         Body
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { faAt, faUser, faPhone, faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


const styles = StyleSheet.create({
  form: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    padding: 8
  },

  buttonContainer: {
    marginTop: 24,
    marginHorizontal: 48
  }
})


const ImportContactScreen = (props) => {
    const {navigate} = props.navigation;
  const [contacts, setContacts] = React.useState([])
  const [visibleContacts, setVisibleContacts] = React.useState([])
  let token
  let server

  React.useEffect(() =>{
   
    async function init(){
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contacts',
              'message': 'This app would like to view your contacts.',
              'buttonPositive': 'Please accept bare mortal'
            }
          )
        if(granted == PermissionsAndroid.RESULTS.GRANTED){
            console.log('granted')
        }else{
            console.log('denied')
        }
        token = await AsyncStorage.getItem('token')
        server = await AsyncStorage.getItem('server')
    }
    init()
    
  },[])
  return (
    <Overlay>
      <View  style={styles.form}>
          <View style={{marginBottom: 16, borderWidth: 1, borderColor: 'black', borderRadius: 6}}>
              <TextInput placeholder='SEARCH CONTACTS' onChangeText={text =>{
                  setVisibleContacts(contacts.filter(
                      contact => contact.first_name.indexOf(text) != -1 || contact.last_name.indexOf(text) != -1))
              }}/>
              <Button>
                  <Text>Import Selected</Text>
              </Button>
          </View>
      <ScrollView>
          
          {visibleContacts.map(contact => (<Card key={contact.id}>
            <CardItem>
              <Body>
              <View>
                  <View style={{flexDirection: 'row', display:'flex'}}>
                      <View style={{padding: 16, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <FontAwesomeIcon icon={faUser} style={{color: '#ccc'}} size={64}/>
                      </View>
                      <View>
                      <Text style={{fontWeight: "700", fontSize: 20, marginBottom: 12}}>{`${contact.first_name} ${contact.last_name}`}</Text>
              <Text style={{color: "#007bff"}} onPress={() => {
                  Linking.openURL(`tel:${contact.phone}`)
              }}><FontAwesomeIcon icon={faPhone}/> {contact.phone}</Text>
              <Text style={{
                  marginVertical: 8, 
                  color: "#007bff"}}
                onPress={() =>{
                    Linking.openURL(`mailto:${contact.email}`)
                }}><FontAwesomeIcon icon={faAt}/> {contact.email}</Text>
              <Text><FontAwesomeIcon icon={faHome}/>{contact.address}</Text>
                      </View>
                  </View>
              </View>
              </Body>
            </CardItem>
          </Card>))}
        </ScrollView>
      </View>
    </Overlay>
  );
};


export default ImportContactScreen;
