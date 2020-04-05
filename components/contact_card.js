import React from 'react';
import {StyleSheet, Linking, Modal} from 'react-native'

import {Text,
         View,
         Button
        } from 'native-base';
import { faAt, faUser, faPhone, faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


const styles = StyleSheet.create({
    modal: {
      margin: 16,
      backgroundColor: 'white',
      padding: 12,
      flex: 1,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    }
  })


  const ContactDetail =(props) =>{
    return(
      <Modal
          animationType="slide"
          transparent={true}
          visible={props.visible}
        >
          {props.data ==null ? null:
            <View style={styles.modal}>
              <Text style={{textAlign: "center", fontSize: 36, marginBottom: 16}}>Contact Details</Text>
              <Button block transparent onPress={() => props.closeHandler()}>
                  <Text style={{textAlign: "right"}}>Close</Text>
                </Button>
            <View style={{margin:24}}>
                        <View style={{padding: 16, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon icon={faUser} style={{color: '#ccc'}} size={64}/>
                        </View>
                        <View>
                        <Text style={{fontWeight: "700", fontSize: 20, marginBottom: 12}}>{`${props.data.first_name} ${props.data.last_name}`}</Text>
                <Text style={{color: "#007bff"}} onPress={() => {
                    Linking.openURL(`tel:${props.data.phone}`)
                }}><FontAwesomeIcon icon={faPhone}/> {props.data.phone}</Text>
                <Text style={{
                    marginVertical: 8, 
                    color: "#007bff"}}
                  onPress={() =>{
                      Linking.openURL(`mailto:${props.data.email}`)
                  }}><FontAwesomeIcon icon={faAt}/> {props.data.email}</Text>
                <View style={{marginTop: 12}}>
                <Text><FontAwesomeIcon icon={faHome}/>{props.data.address}</Text>
                </View>
                        </View>
                    </View>
            
        </View>
          }
          
        </Modal>
    )
  }
  

export default ContactDetail