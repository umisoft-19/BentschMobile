import React from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import { Button,
         View,
         Text,
         Form, 
         Item,
         Input,
         Textarea,
         DatePicker
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


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
    marginHorizontal: 48
  }
})


const EventScreen = (props) => {
  const {navigate} = props.navigation;
  const [date, setDate] = React.useState(new Date())
  const [label, setLabel] = React.useState('')
  const [token, setToken] = React.useState('')
  const [start, setStart] = React.useState('')
  const [end, setEnd] = React.useState('')
  const [owner, setOwner] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [server, setServer] = React.useState('')

  React.useEffect(() =>{
    async function init(){
    const authToken = await AsyncStorage.getItem('token')
    const serverStr = await AsyncStorage.getItem('server')
    const ownerStr = await AsyncStorage.getItem('employeeID')
    setOwner(ownerStr)
    setServer(serverStr)
    setToken(authToken)
    }
    init()
  },[])
  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Form>
          <Item>
              <Text>Date:</Text>
              <DatePicker
                value={date}
                onDateChange={(date) => setDate(date)}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <Item>
            <Text>Label:</Text>
            <Input 
              value={label}
              onChangeText={text => setLabel(text)}/>
          </Item>
          <Item>
            <Text>Start:</Text>
            <Input placeholder='HH:MM'
              value={start}
              onChangeText={text => setStart(text)} />
          </Item>
          <Item>
            <Text>End:</Text>
            <Input placeholder='HH:MM'
              value={end}
              onChangeText={text => setEnd(text)} />
          </Item>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            value={description}
            onChangeText={text => setDescription(text)}
            rowSpan={5} bordered placeholder="Description" />
          
          
        </Form>
        <View style={styles.buttonContainer}>
        <Button 
          style={{flexDirection: 'row', justifyContent: 'center'}}
          primary 
          onPress={() =>{
            const re = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
            if(label ==''){
              Alert.alert('Error!', 'A valid label is required')
              return
            }
            if(start.match(re) == null){
              Alert.alert('Error', 'Please input a valid start time in the format HH:MM')
              return
            }
            if(end.match(re) == null){
              Alert.alert('Error', 'Please input a valid end time in the format HH:MM')
              return
            }
            axios.post(`http://${server}/planner/api/event/`, {
              date: `${date.toISOString().split('T')[0]}`,
              owner: owner,
              description: description,
              label: label,
              start_time: start + ':00',
              end_time: end + ':00'
            }, {
              headers: {
              'Authorization': 'Token ' + token
              }
            }).then(res => {
              navigate('Home')
            }).catch(err =>{
              console.log(err.response)
              console.log(err)
              console.log(err.response.data)
            })
          }}>
            <Text style={{textAlign: 'center'}}>Create Event</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default EventScreen;
