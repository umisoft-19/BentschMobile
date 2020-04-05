import React from 'react';
import {StyleSheet, 
    TextInput, 
    PermissionsAndroid, 
    ToastAndroid, 
    Alert,
    FlatList,
    ActivityIndicator, } from 'react-native'
import Overlay from '../components/overlay'
import Contacts from 'react-native-contacts';

import axios from 'axios'
import {Text,
         View,
         Button,
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ContactCard from '../components/contact_card'


const styles = StyleSheet.create({
  form: {
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
      <View style={{marginBottom: 12, padding: 6, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
        <Text style={{fontWeight: "600", fontSize: 20, marginBottom: 12}}>{props.displayName}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        
        <Button bordered small onPress={() =>{
            const newSelection = [...props.selection]
            if(props.isSelected){
              props.selectionHandler(props.selection.filter(item => item.recordID != props.recordID))
            }else{
              newSelection.push(props)
              props.selectionHandler(newSelection)
            }
          props.selectionHandler}}>
                    <Text>{props.isSelected ? "Clear" : "Select"}</Text>
                  </Button>
                  <Button transparent small onPress={props.detail}>
                    <Text>Detail</Text>
                  </Button>
        </View>
      </View>
  )
}


const ImportContactScreen = (props) => {
    const {navigate} = props.navigation;
  const [contacts, setContacts] = React.useState([])
  const [serverStr, setServerStr] = React.useState('')
  const [tokenStr, setTokenStr] = React.useState('')
  const [selected, setSelected] = React.useState([])
  const [visibleContacts, setVisibleContacts] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [active, setActive] = React.useState(null)

  let token
  let server

  React.useEffect(() =>{
   
    async function init(){
      //check if a list of imported contacts exists. if not create it
      token = await AsyncStorage.getItem('token')
      server = await AsyncStorage.getItem('server')
      console.log(server)
      setServerStr(server)
      setTokenStr(token)
      try{
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
          Contacts.getAll((err, contacts) =>{
            console.log(contacts)
            setContacts(contacts)
            setVisibleContacts(contacts)
          })
      }else{
          console.log(granted)
          console.log('denied')
      }
      }catch(err){
        console.log(err)
      }
        
        
    }
    init()
    
  },[])
  return (
      <View  style={styles.form}>
          <View style={{marginBottom: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 6}}>
              <TextInput placeholder='SEARCH CONTACTS' onChangeText={text =>{
                  setVisibleContacts(contacts.filter(
                      contact => contact.displayName.indexOf(text) != -1))
              }}/>
          </View>
          <Text>{selected.length} Contacts selected</Text>
          <View style={{flexDirection: 'row', marginVertical: 8, justifyContent: 'center'}}>
              <Button onPress={() =>{
                console.log(`http://${serverStr}/base/api/bulk-individuals-create/`)
                console.log(selected)
                axios({
                  url: `http://${serverStr}/base/api/bulk-individuals-create/`, 
                  method: 'POST',
                  data: selected.map(selection =>{
                    return({
                      first_name: selection.givenName,
                      last_name: selection.familyName == "" ? "?": selection.familyName,
                      phone: selection.phoneNumbers.length > 0 ? selection.phoneNumbers[0].number : "",
                      phone_two: selection.phoneNumbers.length > 1 ? selection.phoneNumbers[1].number : "",
                      email: selection.emailAddresses.length > 1 ? selection.emailAddresses[0].email : "",
                      address: selection.postalAddresses.length > 1 ? selection.postalAddresses[0].formattedAddress : "",
                      other_details: selection.note
                    })
                  }),
                  headers: {
                  'Authorization': 'Token ' + tokenStr
                }
              }).then(res =>{
                ToastAndroid.show(`Imported ${selected.length}contacts successfully`, ToastAndroid.LONG)
                setSelected([])
                navigate('Home')

              })
              .catch(err =>{
                console.log(err)
                console.log(err.response)
                Alert.alert('Error!', 'Failed to import contacts')
              })
                
              }}>
                  <Text>Import Selected</Text>
              </Button>
              <Button transparent bordered onPress={()=>{
                setSelected([])
              }}>
                  <Text>Clear Selection</Text>
              </Button>
              </View>
              {active != null ? <ContactCard visible={modalVisible} 
              data={{
                phone:active.phoneNumbers.length > 0 ? active.phoneNumbers[0].number : '',
                email:active.emailAddresses.length > 0 ? active.emailAddresses[0].email : '',
                first_name: active.givenName,
                last_name: active.familyName == "" ? "?": active.familyName,
                address: active.postalAddresses.length > 0 ? active.postalAddresses[0].formattedAddress : ''
              }}
              closeHandler={() => setModalVisible(false)}/> : null}
              {contacts.length > 0 ? <FlatList data={visibleContacts}
            renderItem={({item}) => <Contact 
                                      {...item} 
                                      detail={()=>{
                                        setActive(item)
                                        setModalVisible(true)
                                      }}
                                      selectionHandler={setSelected}
                                      selection={selected}
                                      isSelected={selected.filter(selection => item.recordID == selection.recordID).length > 0}/>}
            keyExtractor={item => item.id}/>: <ActivityIndicator size='large' color='#007bff' />}

    
      </View>
  );
};


export default ImportContactScreen;
