import React from 'react';
import Overlay from '../components/overlay'
import {StyleSheet, ScrollView} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt, faUsers, faFileAlt, faToolbox, faWarehouse,faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Button,
         View,
         Text,
         Card,
         CardItem,
         Body
        } from 'native-base';

styles = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 120,
    left: 16,
    right: 16,
    height: '100%'
  },
  cardBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  cardIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex'
  },
  cardActions: {
    flex: 3
  },
  cardTitle: { 
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 34
  }
})

const HomeScreenCard = (props) =>{
  return(<Card>
          <CardItem>
            <Body style={styles.cardBody}>
              <View style={styles.cardIcon}>
                <FontAwesomeIcon icon={props.icon} size={64} color='#007bff'/>
              </View>
              <View style={styles.cardActions}>
                <Text style={styles.cardTitle}>{props.title}</Text>
                {props.children}
              </View>
            </Body>
          </CardItem>
          </Card>
        )
}


const HomeScreen = (props) => {
  const {navigate} = props.navigation
  return (
      <Overlay>
        <ScrollView style={styles.window}>
          <HomeScreenCard icon={faCalendarAlt} title='Planner'>
            <Button transparent onPress={() => navigate('Event')}>
              <Text>Create Event</Text>
            </Button>
          </HomeScreenCard>
          <HomeScreenCard icon={faUsers} title='Employee'>
            <Button transparent onPress={() => navigate('Logger')}>
              <Text>Log Time In/Out</Text>
            </Button>
            <Button transparent onPress={() => navigate('Vacation')}>
              <Text>Apply for Vacation Time</Text>
            </Button>
          </HomeScreenCard>
          <HomeScreenCard icon={faFileAlt} title='Sales'>
            <Button transparent>
              <Text>Create Quotation</Text>
            </Button>
            <Button transparent>
              <Text>Create Invoice</Text>
            </Button>
            <Button transparent onPress={() => navigate('Contact')}>
              <Text>Create Contact</Text>
            </Button>
            <Button transparent onPress={() => navigate('Lead')}>
              <Text>Create Lead</Text>
            </Button>
            <Button transparent onPress={() => navigate('Customer')}>
              <Text>Create Customer</Text>
            </Button>
          </HomeScreenCard>
          <HomeScreenCard icon={faToolbox} title='Services'>
            <Button transparent>
                <Text>Jobs</Text>
            </Button>
          </HomeScreenCard>
          <HomeScreenCard icon={faWarehouse} title='Inventory'>
            <Button transparent>
              <Text>Stock Take</Text>
            </Button>
            <Button transparent onPress={() => navigate('Vendor')}>
              <Text>Add Vendor</Text>
            </Button>
          </HomeScreenCard>
          <HomeScreenCard icon={faDollarSign} title='Accounting'>
            <Button transparent onPress={() => navigate('Expense')}>
              <Text>Record Expense</Text>
            </Button>
          </HomeScreenCard>     
        </ScrollView>
      </Overlay>
  );
};


export default HomeScreen;
