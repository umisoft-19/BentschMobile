import React from 'react';
import {Text,
         Card,
         CardItem,
         Body,
        } from 'native-base';

const TaskCard = (props) => {
    const statusColorMap = {
        'planned': 'grey',
        'cancelled': 'red',
        'completed': 'green',
        'in-progress': 'orange'
    }
    return(
      <Card style={{marginBottom: 8}}>
        <CardItem>
            <Body>
    <Text style={{fontSize: 18, marginBottom: 12}}>{props.title}</Text>
    <Text style={{color: statusColorMap[props.status]}}>{props.status}</Text>
            <Text>{props.description}</Text>
            <Text style={{color: '#ccc'}}>{props.due}</Text>
            </Body>
        </CardItem>
      </Card>
    )
  }

export default TaskCard