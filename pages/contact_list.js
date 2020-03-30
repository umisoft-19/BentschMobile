import React from 'react';
import {StyleSheet, ScrollView, Linking, TextInput} from 'react-native'
import Overlay from '../components/overlay'

import axios from 'axios'
import {Text,
         Card,
         CardItem,
         View,
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


const ContactListScreen = (props) => {
  const [contacts, setContacts] = React.useState([])
  const [visibleContacts, setVisibleContacts] = React.useState([])

  React.useEffect(() =>{
    async function init(){
      const token = await AsyncStorage.getItem('token')
      const serverStr = await AsyncStorage.getItem('server')
      
      axios.get(`http://${serverStr}/base/api/individual/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        setContacts(res.data)
        setVisibleContacts(res.data)
      }).catch(err =>{
        console.log(err)
      })
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


export default ContactListScreen;
