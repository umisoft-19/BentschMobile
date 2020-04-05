import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView, ToastAndroid, ActivityIndicator} from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';



import { Button,
         View,
         Text,
        } from 'native-base';

const styles = StyleSheet.create({
  window: {
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
  },
  textContainer: {
      padding: 16
  },
  time: {
      fontSize: 64,
      textAlign: 'center',
      lineHeight: 96
  },
  shiftText: {
      fontSize: 24,
      textAlign: 'center',
      lineHeight: 36
  }
})

class Time extends React.Component{
  state = {
    blink: false,
    now: new Date()
  }

  componentDidMount() {
    this.ticker = setInterval(() =>{
      this.setState(prevState => ({
        now: new Date(),
        blink: !prevState.blink
      }))
  }, 700)
  
  }
  componentWillUnmount(){
    clearInterval(this.ticker)
  }
  
  render(){
    return(<Text style={styles.time}>
              {("0" + this.state.now.getHours().toString()).slice(-2)}<Text style={{...styles.time, color: this.state.blink ? 'white' : 'black'}}>:</Text>{("0" + this.state.now.getMinutes().toString()).slice(-2)}
          </Text>)
  }
}


function paddedTime(time){
  return`${("0" + time.getHours().toString()).slice(-2)}:${("0" + time.getMinutes().toString()).slice(-2)}`
}


const LoggerScreen = (props) => {
    const [currShift, setCurrShift] = useState(null)
    const [start, setStart] = useState('-')
    const [end, setEnd] = useState('-')
    let authToken
    let serverStr
    let employee

    useEffect(()=>{
        //set up the shifts
        async function init(){

          authToken = await AsyncStorage.getItem('token')
          serverStr = await AsyncStorage.getItem('server')
          employee = await AsyncStorage.getItem('employeeID')
          
        //collect all shift schedules
          const scheduleList = await axios.get(`http://${serverStr}/employees/api/shift-schedule/`,  {
            headers: {
            'Authorization': 'Token ' + authToken
            }
          })
        //filter those that are still valid
        const validSchedules = scheduleList.data.filter(shift =>{
          const start = new Date(shift.valid_from)
          const end = new Date(shift.valid_to)
          const today = new Date()
          return today >= start && today <= end
        })
        if(validSchedules.length == 0){
          setCurrShift("No active shift")
          return
        }
        //filter those that cover the current day of week
        const mapping = {
          0: 'sunday',
          1: 'monday',
          2:'tuesday',
          3:'wednesday',
          4: 'thursday',
          5: 'friday',
          6: 'saturday',
        }
        
        const validShiftsByDay = []
        validSchedules.forEach((schedule, index) =>{
          schedule.shiftscheduleline_set.forEach((shift, i) =>{
            if(shift[mapping[new Date().getDay()]]){
              // if the week day is true...
              validShiftsByDay.push(shift)
            }
          })
        })

        if(validShiftsByDay.length ==0){
          setCurrShift('No active shift')
          return
        }

        let validShiftByTime = null
        validShiftsByDay.forEach((shift, index) =>{
          const [startHr, startMin, startSec] = shift.start_time.split(':')
          const [endHr, endMin, endSec] = shift.end_time.split(':')
          const start = new Date().setHours(startHr, startMin, startSec)
          const end = new Date().setHours(endHr, endMin, endSec)
          const now = new Date()
          if(now > start && now < end){
            validShiftByTime = shift
          }
        }) 

        //filter those that cover the current time
        if(validShiftByTime != null){
          setStart(validShiftByTime.start_time)
          setEnd(validShiftByTime.end_time)
          const shiftObj = await axios.get(`http://${serverStr}/employees/api/shift/${validShiftByTime.shift}/`,  {
          headers: {
          'Authorization': 'Token ' + authToken
          }
        })
          setCurrShift(shiftObj.data.name)
        }else{
          setCurrShift("No active shift")
        }
       
        }
        init()
    }, [])
  const {navigate} = props.navigation;
  return (
    <Overlay>
      <ScrollView style={styles.window}>
        <View style={styles.textContainer}>
            <Time/>
            {currShift == null ?
              <ActivityIndicator size="large" color="#0000ff" />
            :
              <View>
                <Text style={styles.shiftText}>Current Shift: {currShift}</Text>
                <Text style={styles.shiftText}>Time In: {start}</Text>
                <Text style={styles.shiftText}>Time Out: {end}</Text>
              </View>
            }
        </View>
        {currShift == null || "No active shift" == currShift ? null:
          <View style={styles.buttonContainer}>
            <Button onPress={() =>{
              async function submit(){
                const authToken = await AsyncStorage.getItem('token')
                const serverStr = await AsyncStorage.getItem('server')
                const employee = await AsyncStorage.getItem('employeeID')
                //check if an attendance line exists else create a new one.
                const url2 = `http://${serverStr}/employees/api/log-in-out/${employee}/`
                console.log(url2)
                axios.get(url2,  {
              headers: {
              'Authorization': 'Token ' + authToken
              }
            }).then(res => {
              ToastAndroid.show(`Logged ${res.data.value} successfully`, ToastAndroid.SHORT)
  
            }).catch(err =>{
              
            })
              }
              submit()
             
            }}>
                <Text>Login/Logout</Text>
            </Button>
        </View>
        }
        
      </ScrollView>
    </Overlay>
  );
};


export default LoggerScreen;
