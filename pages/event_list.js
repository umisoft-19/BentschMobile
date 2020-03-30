import React from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import {Text,
         Card,
         CardItem,
         Body
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


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
    padding: 8
  },

  buttonContainer: {
    marginTop: 24,
    marginHorizontal: 48
  }
})


const EventListScreen = (props) => {
  const [events, setEvents] = React.useState([])
  const [server, setServer] = React.useState('')

  React.useEffect(() =>{
    async function init(){
      const token = await AsyncStorage.getItem('token')
      const id = await AsyncStorage.getItem('employeeID')
      console.log('user id')
      console.log(id)
      const serverStr = await AsyncStorage.getItem('server')
      setServer(serverStr)
      axios.get(`http://${serverStr}/planner/api/event/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        setEvents(res.data.filter(evt => evt.owner == parseInt(id) && evt.completed==false))
      }).catch(err =>{
        console.log(err)
      })
    }
    init()
    
  },[])
  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Text style={{fontSize: 24}}>My Open Events</Text>
        {events.map(event => (<Card key={event.id}>
          <CardItem>
            <Body>
            <Text style={{fontWeight: "600", fontSize: 20}}>{event.label}</Text>
            <Text>{event.date}</Text>
            <Text style={{color: '#ccc'}}>{event.start_time}</Text>
            </Body>
          </CardItem>
        </Card>))}
      </ScrollView>
    </Overlay>
  );
};


export default EventListScreen;
