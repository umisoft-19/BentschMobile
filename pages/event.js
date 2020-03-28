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


const EventScreen = (props) => {
  const {navigate} = props.navigation;
  const [events, setEvents] = React.useState([])
  const [date, setDate] = React.useState(new Date())
  const [label, setLabel] = React.useState('')
  const [start, setStart] = React.useState('')
  const [end, setEnd] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [server, setServer] = React.useState('')

  React.useEffect(async () =>{
    const token = await AsyncStorage.getItem('token')
    const id = await AsyncStorage.getItem('userID')
    console.log('user id')
    console.log(id)
    const serverStr = await AsyncStorage.getItem('server')
    setServer(serverStr)
    axios.get(`http://${serverStr}/planner/api/event/`, {
      headers: {
      'Authorization': 'Token ' + token
    }
  }).then(res =>{
      setEvents(res.data)
    }).catch(err =>{
      console.log(err)
    })
  },[])
  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Form>
  {events.map(event => (<Text key={event.id}>{event.label}</Text>))}
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
        <Button primary 
          onPress={() =>{
            const re = new RegExp('^(0[\d]|1[\d]|2[0-3]):[0-5][0-9]$')
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
            axios.post(`http://${server}/planner/api/event`, {

            }).then(res => {
              navigate('Home')
            }).catch(err =>{
              console.log(err.response)
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
