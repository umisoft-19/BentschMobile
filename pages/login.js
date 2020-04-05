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
    left: 16,
    right: 16,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    flex: 1
  },

  buttonContainer: {
    marginTop: 30,
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
        <Button 
          style={{flexDirection: 'row', justifyContent: 'center'}}
          primary 
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
              const userID = users.data.filter(usr => usr.username == name)[0].id
              AsyncStorage.setItem('userID',userID.toString())
              const employees = await axios.get(`http://${server}/employees/api/employee`,  {
                headers: {
                'Authorization': 'Token ' + res.data.token
              }
            })
            const employeeID = employees.data.filter(emp => emp.user == userID)[0].employee_number
            AsyncStorage.setItem('employeeID',employeeID.toString())

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
          <Button
            style={{marginTop: 20}}
            primary 
            transparent 
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
