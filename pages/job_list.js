import React from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native'
import Overlay from '../components/overlay'
import axios from 'axios'
import {Text,
         Card,
         CardItem,
         Body,
         Button
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


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


const JobListScreen = (props) => {
  const [jobs, setJobs] = React.useState([])
  const {navigate} = props.navigation

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
      axios.get(`http://${server}/services/api/work-order/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        console.log(res.data)
        setJobs(res.data.filter(job => job.status != "authorized"))
      }).catch(err =>{
        console.log(err)
      })
    }
    init()
    
  },[])
  return (
      <ScrollView style={styles.form}>
        {jobs.map(job => (<Card key={job.id}>
          <CardItem>
            <Body>
            <Text style={{fontWeight: "600", fontSize: 20}}>{job.description}</Text>
            <Text style={{color: colorStatusMap[job.status], margin: 8}}>{job.status}</Text>
            <Text style={{color: '#bbb', textAlign: 'right', width: '100%'}}>{job.date}</Text>
            <Button small primary onPress={() => navigate('Job', {job: job.id})}>
              <Text>Detail</Text>
            </Button>
            </Body>
          </CardItem>
        </Card>))}
      </ScrollView>
  );
};


export default JobListScreen;
