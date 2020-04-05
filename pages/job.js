import React from 'react';
import {StyleSheet, ScrollView, Alert, ActivityIndicator} from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import {Text,
         Card,
         CardItem,
         Body,
         Button,
         CheckBox,
         View
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import NoteCard from '../components/note_card'
import ExpandableView from '../components/expandable_view'

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8
  },

  buttonContainer: {
    marginTop: 24,
    marginHorizontal: 48
  }
})


const JobScreen = (props) => {
  const [job, setJob] = React.useState(null)
  const [notes, setNotes] = React.useState([])
  const colorStatusMap = {
    'requested': '#ccc',
    'progress': 'steelblue',
    'completed': 'limegreen',
    'authorized': 'green',
    'declined': 'crimson'
  }

  React.useEffect(() =>{
    async function init(){
      const token = await AsyncStorage.getItem('token')
      const server = await AsyncStorage.getItem('server')
      const jobID = props.navigation.getParam('job')
      
      //getting job
      axios.get(`http://${server}/services/api/work-order/${jobID}/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        console.log(res.data)
        setJob(res.data)
      }).catch(err =>{
        console.log(err)
      })

      //getting notes
      axios.get(`http://${server}/base/api/notes/service/${jobID}`, {
      headers: {
      'Authorization': 'Token ' + token
    }
  }).then(res =>{
      console.log(res.data)
      if(Array.isArray(res.data)){
          setNotes(res.data)
      }
    }).catch(err =>{
      console.log(err)
    })
    }
    init()
    
  },[])
  return (
      <ScrollView style={styles.form}>
          {job == null ? 
            <ActivityIndicator  size="large" color="#007bff" />
          :
        <View>
            <Text style={{fontSize: 20}}>{job.description}</Text>
            <View style={{
                backgroundColor: colorStatusMap[job.status],
                color: 'white',
                padding: 6,
                marginVertical: 8,
                width: 150

                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>{job.status}</Text>
            </View>
            <Text style={{color: '#bbb'}}>{job.date}</Text>
            <ExpandableView label='TASKS'>
            {job.workordertask_set.map((task,i) =>(
                <Card key={i}>
                <CardItem>
                  <Body>
            <Text style={{fontWeight: "600", fontSize: 20}}><FontAwesomeIcon icon={faHashtag} /> {task.id}</Text>
                  <Text >{task.description}</Text>
                  <Text>{task.due}</Text>
                  <Text>{task.assigned}</Text>
                  <CheckBox checked={task.completed} />
                  </Body>
                </CardItem>
              </Card>
            ))}
            </ExpandableView>
            
            <ExpandableView label='TIME LOGS'>
            {job.timelog_set.map((log,i) =>(
                <Card key={i}>
                <CardItem>
                  <Body>
            <Text style={{fontWeight: "600", fontSize: 20}}>{log.employee}</Text>
                  <Text >{log.date}</Text>
                  <Text>Normal Time: {log.normal_time}</Text>
                  <Text>Overtime: {log.overtime}</Text>
                  </Body>
                </CardItem>
              </Card>
            ))}
            </ExpandableView>
            
            <ExpandableView label="NOTES">
                {notes.map(note =>(<NoteCard {...note} key={note.id}/>))}
            </ExpandableView>
            
        </View>

          }
      </ScrollView>
  );
};


export default JobScreen;
