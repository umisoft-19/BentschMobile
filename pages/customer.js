import React from 'react';
import {StyleSheet, ScrollView, Picker, ToastAndroid, Alert} from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


import { Button,
         View,
         Text,
         Form, 
         Item,
         Input,
         Textarea,
        } from 'native-base';


const styles = StyleSheet.create({
  form: {
    
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12
  },

  buttonContainer: {
    marginVertical: 24,
    marginHorizontal: 48
  }
})


const CustomerScreen = (props) => {
  const {navigate} = props.navigation;
  const [type, setType] = React.useState('individual')
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [website, setWebsite] = React.useState('')
  const [alternate, setAlternate] = React.useState('')
  const [billing, setBilling] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [address, setAddress] = React.useState('')


  return (
      <ScrollView style={styles.form}>
        <Form>
          
            <View style={{backgroundColor: '#efefef', padding: 4, margin:12}}>
              <Text>Type:</Text>
              <Picker 
                selectedValue={type} 
                onValueChange={text=> setType(text)}>
                  <Picker.Item label="Individual" value='individual'/>
                  <Picker.Item label="Organization" value='organization'/>
              </Picker>
            </View>
          <Item>
            <Text>Name:</Text>
            <Input value={name} onChangeText={text=> setName(text)}/>
          </Item>
          <Item>
            <Text>Primary Phone Number:</Text>
            <Input value={phone} onChangeText={text=> setPhone(text)}/>
          </Item>
          <Item>
            <Text>Email:</Text>
            <Input value={email} onChangeText={text=> setEmail(text)}/>
          </Item>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            value={address} 
            onChangeText={text=> setAddress(text)}
            rowSpan={5} bordered placeholder="Address" />
          
          <Text style={{fontSize: 24}}> Additional Details</Text>
          <Item>
            <Text>Website:</Text>
            <Input value={website} onChangeText={text=> setWebsite(text)}/>
          </Item>
          <Item>
            <Text>Alternate Phone Number:</Text>
            <Input value={alternate} onChangeText={text=> setAlternate(text)}/>
          </Item>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            value={billing}
            onChangeText={text => setBilling(text)}
            rowSpan={5} bordered placeholder="Billing Address" />
          <Textarea 
            style={{
                margin:16,
                marginTop:16
            }}
            rowSpan={5} 
            bordered 
            value={notes}
            placeholder="Notes"
            onChangeText={text => setNotes(text)} />

        </Form>
        <View style={styles.buttonContainer}>
        <Button 
          style={{flexDirection: 'row', justifyContent: 'center'}}
          primary 
          onPress={() =>{
            if(type =='individual' && name.split(' ').length < 2){
              Alert.alert("Error!", "An individual must be recorded with a first and last name separated by a ' ' ")
            }
            async function submit(){
              const token = await AsyncStorage.getItem('token')
              const server = await AsyncStorage.getItem('server')
              if(type == 'individual'){
                //create the individual first and then use its id to populate the individual field for the customer
                const [first, last] = name.split(' ')
                axios.post(`http://${server}/base/api/individual/`, {
                  first_name:first,
                  last_name:last,
                  address:address,
                  email:email,
                  phone:phone,
                  phone_two:alternate,
                  other_details:notes
            }, {
              headers: {
              'Authorization': 'Token ' + token
              }
            }).then(res => {
                axios.post(`http://${server}/invoicing/api/customer/`, {
                    individual: res.data.id,
                    billing_address: billing,
                    banking_details: "",
                    expense_set: []
              }, {
                    headers: {
                    'Authorization': 'Token ' + token
                }
                  }).then(() =>{
                      ToastAndroid.show('Customer created successfully', ToastAndroid.LONG)
                      navigate("Home")
                  }).catch(err =>{
                      console.log(err)
                      console.log(err.response)
                    })
            }).catch(err =>{
              console.log(err.response)
              console.log(err)
            })
              }else{
                //create the organization first and then use its id to populate the individual field for the customer
                axios.post(`http://${server}/base/api/organization/`, {
                  legal_name:name,
                  business_address:address,
                  email:email,
                  website:website,
                  phone:phone,
            }, {
              headers: {
              'Authorization': 'Token ' + token
              }
            }).then(res => {
                axios.post(`http://${server}/invoicing/api/customer/`, {
                    organization: res.data.id,
                    billing_address: billing,
                    banking_details: "",
                    expense_set: []

              }, {
                    headers: {
                    'Authorization': 'Token ' + token
                }
                  }).then(() =>{
                      ToastAndroid.show('Customer created successfully', ToastAndroid.LONG)
                      navigate("Home")
                  }).catch(err =>{
                      console.log(err)
                      console.log(err.response)
                    })
            }).catch(err =>{
              console.log(err.response)
              console.log(err)
            })
              }
            }

            submit()
          }}>
            <Text style={{textAlign: 'center'}}>Create Customer</Text>
          </Button>
        </View>
      </ScrollView>
  );
};


export default CustomerScreen;
