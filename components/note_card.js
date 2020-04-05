import React from 'react';
import axios from 'axios'
import {Text,
         Card,
         CardItem,
         Body,
        } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const NoteCard = (props) => {
    console.log('note card rendered')
    const [user, setUser] = React.useState('')
    React.useEffect(() =>{
        async function init(){
            const server = await AsyncStorage.getItem('server')
            const token = await AsyncStorage.getItem('token')
            axios.get(`http://${server}/base/api/users/${props.author}`, {
                headers: {
                    'Authorization': 'Token ' + token
                }})
                .then(res => setUser(res.data.username))
                .catch(err=>console.log(err))
        }
        init()
    })
    return(
      <Card style={{marginBottom: 8}}>
        <CardItem>
            <Body>

    <Text style={{fontWeight: '700'}}>{user}</Text>
    <Text>{props.note}</Text>
    <Text style={{textAlign: 'right', color:'#ccc'}}>{props.timestamp}</Text>
            
            </Body>
        </CardItem>
      </Card>
    )
  }

export default NoteCard