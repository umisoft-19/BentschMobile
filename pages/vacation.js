import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Picker, ToastAndroid } from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import { Button,
         View,
         Text,
         Form, 
         Item,
         Textarea,
         DatePicker
        } from 'native-base';


const styles = StyleSheet.create({
  form: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    bottom: 32,
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


const VacationScreen = (props) => {
  const {navigate} = props.navigation;
  let employee
  let server
  let token
  const [start, setStart] = React.useState(new Date())
  const [end, setEnd] = React.useState(new Date())
  const [category, setCategory] = React.useState('1')
  const [notes, setNotes] = React.useState('')


  React.useEffect(() => {
    async function init(){
      employee = await AsyncStorage.getItem('employeeID')
      token = await AsyncStorage.getItem('token')
      server = await AsyncStorage.getItem('server')
    
    }
    init()
  }, [])

  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Form>
          <Item>
              <Text>Start:</Text>
              <DatePicker
                value={start}
                onDateChange={date => setStart(date)}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <Item>
              <Text>End:</Text>
              <DatePicker
                value={end}
                onDateChange={date => setEnd(date)}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <View style={{marginTop: 16, marginLeft: 12}}>
            <Text>Category:</Text>
            <Picker selectedValue={category}
              onValueChange={val => setCategory(val)}>
                <Picker.Item value='1' label='Annual Vacation Time'/>
                <Picker.Item value='2' label='Sick Leave'/>
                <Picker.Item value='3' label='Annual Vacation Time'/>
                <Picker.Item value='4' label='Study Leave'/>
                <Picker.Item value='5' label='Maternity Leave'/>
                <Picker.Item value='6' label='Bereavement Leave'/>
            </Picker>
          </View>
          <Textarea 
            value={notes}
            onChangeText={text => setNotes(text)}
            style={{
              margin:16,
              marginTop:16
            }}
            rowSpan={5} bordered placeholder="Notes" />
          
          
        </Form>
        <View style={styles.buttonContainer}>
        <Button primary 
          onPress={() =>{
            axios.post(`http://${server}/employees/api/leave/`, {
              start_date: `${start.toISOString().split('T')[0]}`,
              end_date: `${end.toISOString().split('T')[0]}`,
              employee: employee,
              category: category,
              status: 0,
              notes: notes,
            }, {
              headers: {
              'Authorization': 'Token ' + token
              }
            }).then(res => {
              ToastAndroid.show(
                `Leave application submitted successfully`,
                ToastAndroid.LONG
              )
              navigate('Home')
            }).catch(err =>{
              console.log(err.response)
              console.log(err)
              ToastAndroid.show(
                `Error submitting application`,
                ToastAndroid.LONG
              )
            })
            }}>
            <Text style={{textAlign: 'center'}}>Submit Application</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default VacationScreen;
