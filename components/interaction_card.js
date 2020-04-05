import React from 'react';
import {Text,
         Card,
         CardItem,
         Body,
        } from 'native-base';

const InteractionCard = (props) => {
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
            <Text>{props.description}</Text>
            <Text style={{color: '#ccc', textAlign: 'right', marginTop: 8}}>
                {props.timestamp ? props.timestamp.split('T')[0]: null}</Text>
            </Body>
        </CardItem>
      </Card>
    )
  }

export default InteractionCard