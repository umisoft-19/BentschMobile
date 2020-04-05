import React from 'react';
import {StyleSheet, ScrollView, ToastAndroid} from 'react-native'
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
         DatePicker
        } from 'native-base';


const styles = StyleSheet.create({
  form: {
    position: 'absolute',
    top: 120,
    left: 12,
    right: 12,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8
  },

  buttonContainer: {
    marginVertical: 24,
    marginHorizontal: 48,
  }
})


const ContactScreen = (props) => {
  const {navigate} = props.navigation;
  const [first, setFirst] = React.useState('')
  const [last, setLast] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [addr, setAddr] = React.useState('')
  let authToken
  let serverStr

  React.useEffect(() =>{
    async function init(){
    authToken = await AsyncStorage.getItem('token')
    serverStr = await AsyncStorage.getItem('server')
    }
    init()
  },[])
  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Form>
          <Item>
            <Text>First Name:</Text>
            <Input onChangeText={text => setFirst(text)} value={first} />
          </Item>
          <Item>
            <Text>Last Name:</Text>
            <Input  onChangeText={text => setLast(text)} value={last}/>
          </Item>
          <Item>
            <Text>Email:</Text>
            <Input  onChangeText={text => setEmail(text)} value={email}/>
          </Item>
          <Item>
            <Text>Phone:</Text>
            <Input keyboardType="numeric"  onChangeText={text => setPhone(text)} value={phone} />
          </Item>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            onChangeText={text => setAddr(text)} value={addr}
            rowSpan={5} bordered placeholder="Address" />
          
        </Form>
        <View style={styles.buttonContainer}>
        <Button 
          style={{flexDirection: 'row', justifyContent: 'center'}}
          primary 
          onPress={() =>{
            axios.post(`http://${serverStr}/base/api/individual/`, {
              first_name: first,
              last_name: last,
              phone: phone,
              address: addr,
              email: email
            }, {
              headers: {
              'Authorization': 'Token ' + authToken
              }
            }).then(res => {
              ToastAndroid.show(
                'Contact added successfully',
                ToastAndroid.LONG
              )
              navigate('Home')
            }).catch(err =>{
              console.log(err.response)
              console.log(err)
              console.log(err.response.data)
            })
          }}>
            <Text style={{textAlign: 'center'}}>Create Contact</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default ContactScreen;
