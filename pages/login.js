import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {StyleSheet, Alert, ScrollView} from 'react-native'
import Overlay from '../components/overlay'
import AsyncStorage from '@react-native-community/async-storage';

import { Button,
         View,
         Text,
         Form, 
         Item,
         Input
        } from 'native-base';


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
    padding: 24
  },

  buttonContainer: {
    marginTop: 24,
    marginHorizontal: 48
  }
})


const LoginScreen = (props) => {
  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  const [server, setServer] = useState('')


  const {navigate} = props.navigation;
  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Form>
          <Item>
            <Input placeholder='Username'
              value={name}
              autoFocus
              onChangeText={text=>setName(text)} />
          </Item>
          <Item>
            <Input placeholder='Password'
              value={pwd}
              secureTextEntry
              onChangeText={text=>setPwd(text)} />
          </Item>
          <Item>
            <Text>http://</Text>
            <Input placeholder='server name'
              value={server}
              onChangeText={text=>setServer(text)} />
          </Item>
        </Form>
        <View style={styles.buttonContainer}>
        <Button primary 
          onPress={() =>{
            axios.post(`http://${server}/api-token-auth/`, {
              username: name,
              password: pwd
            })
              .then(async res => {
                AsyncStorage.setItem('token', res.data.token)
                AsyncStorage.setItem('user', name)
                
                AsyncStorage.setItem('server', server)
                console.log(res.data.token)
                const users = await axios.get(`http://${server}/base/api/users`,  {
                  headers: {
                  'Authorization': 'Token ' + res.data.token
                }
              })
              AsyncStorage.setItem('userID',users.data.filter(usr => usr.username == name)[0].id)

                console.log('success')
                navigate('Home')
              })
              .catch(err =>{
                Alert.alert('Error!', 'Failed to sign into server')
                setName('')
                setPwd('')
                setServer('')
              })
          }}>
            <Text style={{textAlign: 'center'}}>Login</Text>
          </Button>
          <Button primary transparent 
          onPress={() =>{
                navigate('Home')  
          }}>
            <Text style={{textAlign: 'center'}}>Offline Mode</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default LoginScreen;
