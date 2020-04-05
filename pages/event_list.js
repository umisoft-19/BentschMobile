import React from 'react';
import {StyleSheet, ScrollView, Modal, View, Alert, Picker, ToastAndroid} from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import {Text,
         Card,
         CardItem,
         Body,
         Button
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Calendar} from 'react-native-calendars';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import RNCalendarEvents from 'react-native-calendar-events';

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
  },
  modal: {
    margin: 16,
    backgroundColor: 'white',
    padding: 8,
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

const EventCard = (props) => {
  const [alarm, setAlarm] = React.useState(0)
  console.log(props)
  return(
    <Card style={{marginBottom: 16}}>
                  <CardItem>
                    <Body>
                    <Text style={{fontWeight: "600", fontSize: 20, marginBottom: 12}}>{props.event.label}</Text>
                    <Text >{props.event.date}</Text>
                    <Text style={{color: '#ccc'}}>{props.event.start_time}  to {props.event.end_time}</Text>
                    <Text style={{margin: 8}}>{props.event.description}</Text>
                        {props.alarmStatus && props.syncedEvents.indexOf(props.event.id) == -1 ? 
                          <View>
                            <Text>Event Alarm:</Text>
                            <View>
                              <Picker 
                                  selectedValue={alarm}
                                  style={{width:200}} 
                                  onValueChange={val =>setAlarm(val)}>
                                <Picker.Item value={0} label='At event start' />
                                <Picker.Item value={60* 60 * 1000} label='An hour before' />
                                <Picker.Item value={24 * 60* 60 * 1000} label='A day before' />
                              </Picker>
                            </View>
                            <View>
                            <Button transparent onPress={() => {
                              const start = `${props.event.date}T${props.event.start_time}.000Z`
                              const startDate = new Date(start)
                              const alarmDate = new Date(startDate - alarm)
                              RNCalendarEvents.saveEvent(props.event.label, {
                                startDate: start,
                                endDate: `${props.event.date}T23:59:59.001Z`,
                                alarms: [{
                                  date: alarmDate.toISOString()
                                }]
                              }).then(res =>{
                                ToastAndroid.show('Successfully added alarm to calendar',
                                  ToastAndroid.SHORT)
                                const newSyncList = [...props.syncedEvents]
                                newSyncList.push(props.event.id)
                                props.syncManager(newSyncList)
                                AsyncStorage.setItem('Calendar_syncedEvents', JSON.stringify(newSyncList))
                                console.log(res)
                              }).catch(err => {
                                Alert.alert('Error!', 'Failed to record event in system calendar')
                                console.log(err)
                              })
                            }}>
                              <Text> <FontAwesomeIcon icon={faBell} /> Add</Text>
                            </Button>
                            </View>
                          </View>
                          : null}
                    </Body>
                  </CardItem>
                </Card>
  )
}


const EventModal =(props) =>{
  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
      >
        <View style={styles.modal}>
            <Text style={{textAlign: "center", fontSize: 36, marginBottom: 16}}>Event Details</Text>
            <Button transparent onPress={() => props.closeHandler()}>
                <Text style={{textAlign: "center"}}>Close</Text>
              </Button>
            <View style={{flexDirection: 'column'}}>
                
              <ScrollView style={{height: "80%"}}>
                {props.events.map((event, i) => (
                  <EventCard event={event} 
                    key={i} 
                    alarmStatus={props.alarmStatus} 
                    syncedEvents={props.syncedEvents}
                    syncManager={props.syncManager}/>
                  
                ))}
              </ScrollView>
             
            </View>
            
        </View>
      </Modal>
  )
}

const EventListScreen = (props) => {
  const [events, setEvents] = React.useState([])
  const [syncedEvents, setSyncedEvents] = React.useState([])
  const [selectedEvent, setSelectedEvent] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [marked, setMarked] = React.useState({})
  const [canAddAlarms, setCanAddAlarms] = React.useState(false)
  
  const [server, setServer] = React.useState('')


  React.useEffect(() =>{
    async function init(){
      const token = await AsyncStorage.getItem('token')
      const id = await AsyncStorage.getItem('employeeID')
      AsyncStorage.getItem('Calendar_syncedEvents')
        .then(val=>{
          if(val == null){
          setSyncedEvents([])
          }else{
            setSyncedEvents(JSON.parse(val))
          }
        }).catch(err =>{
          AsyncStorage.setItem('Calendar_syncedEvents', JSON.stringify([]))
          setSyncedEvents([])
        }, [])

      RNCalendarEvents.authorizationStatus()
        .then(status => {
          if(status == 'authorized'){
            setCanAddAlarms(true)
          }else{
            RNCalendarEvents.authorizeEventStore()
              .then(status =>{
                if(status == 'authorized'){
                    setCanAddAlarms(true)
                }
              }).catch(err =>{
                Alert.alert('Error!', 'Could not request authorization to save events in the calendar')
              })
          }
        }).catch(err =>{
          Alert.alert('Error!', 'Could not obtain authorization status for the calendar')
        })
      
      const serverStr = await AsyncStorage.getItem('server')
      setServer(serverStr)
      axios.get(`http://${serverStr}/planner/api/event/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        const filteredEvents = res.data.filter(evt => evt.owner == parseInt(id) && evt.completed==false)
        setEvents(filteredEvents)
        console.log(filteredEvents)
        setMarked(filteredEvents.reduce((obj, item)=>{
          return({...obj, 
            [item['date']]: {selected: true, selectedColor: '#007bff'}
          })
        }, {}))

      }).catch(err =>{
        console.log(err)
      })
    }
    init()
    
  },[])
  return (
    <Overlay>
      <EventModal visible={visible}
        alarmStatus={canAddAlarms}
        closeHandler={() =>setVisible(false)}
        events={selectedEvent}
        syncedEvents={syncedEvents}
        syncManager={setSyncedEvents}/>
     

      <ScrollView style={styles.form}>

      <Calendar
          // Collection of dates that have to be marked. Default = {}
          markedDates={marked}
          onDayLongPress={(date) =>{
            console.log('collected!!!')
            setSelectedEvent(events.filter(evt => {
              console.log(evt.date)
              console.log(date)
              return(evt.date == date.dateString)
            }))
            setVisible(true)
          }}
          onDayPress={(date) =>{
            console.log('collected!!!')
            setSelectedEvent(events.filter(evt => {
              console.log(evt.date)
              console.log(date)
              return(evt.date == date.dateString)
            }))
            setVisible(true)
          }}
        />
         <View>
      </View>
      
      </ScrollView>
    </Overlay>
  );
};


export default EventListScreen;
