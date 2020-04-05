import React from 'react';
import {StyleSheet, ActivityIndicator, Linking, TextInput, FlatList, Modal, TouchableOpacity} from 'react-native'
import Overlay from '../components/overlay'

import axios from 'axios'
import {Text,
         View,
         Button
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { faAt, faUser, faPhone, faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import ContactCard from '../components/contact_card'


const styles = StyleSheet.create({
  form: {
    position: 'absolute',
    top: 120,
    left: 16,
    right: 16,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8
  },

  buttonContainer: {
    marginTop: 24,
    marginHorizontal: 48
  }

})


const Contact =(props) =>{
  return(
    <TouchableOpacity onPress={props.detail}>
      <View style={{marginBottom: 12, padding: 4, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
        <Text style={{fontWeight: "600", fontSize: 20, marginBottom: 12}}>{`${props.first_name} ${props.last_name}`}</Text>
      
      </View>
    </TouchableOpacity>
  )
}


const ContactListScreen = (props) => {
  const [contacts, setContacts] = React.useState([])
  const [active, setActive] = React.useState(null)
  const [modalVisible, setModalVisible] = React.useState(false)
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
          <ContactCard visible={modalVisible} 
            data={active}
            closeHandler={() => setModalVisible(false)}/>
          {contacts.length > 0 ? <FlatList data={visibleContacts}
            renderItem={({item}) => <Contact {...item} detail={()=>{
              setActive(item)
              setModalVisible(true)
            }}/>}
            keyExtractor={item => item.id}/>: <ActivityIndicator size='large' color='#007bff' />}
     
      </View>
    </Overlay>
  );
};


export default ContactListScreen;
