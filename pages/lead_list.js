import React from 'react';
import {StyleSheet, ScrollView, Modal} from 'react-native'
import { faCalendarAlt, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import NoteCard from '../components/note_card'
import TaskCard from '../components/task_card'
import InteractionCard from '../components/interaction_card'
import ExandableView from '../components/expandable_view'

import { Container, 
         Header, 
         Text, 
         View,
         Tab, 
         Tabs,
         Card,
         CardItem,
         ScrollableTab,
         Button,
         Title,
         Icon,
         Left,
         Body } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

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

const LeadModal = (props) =>{
  console.log(props)
  const [user, setUser] = React.useState('')
  const [notes, setNotes] = React.useState([])
  React.useEffect(() =>{
    if(props.employees == undefined){
      return
    }
    //set employee string
    const employee = props.employees.filter(emp => emp.number == props.owner)
    if(employee.length > 0){
      setUser(employee[0].rep_name)
    }

    //get notes list
    console.log('getting notes')
    async function init(){
      const token = await AsyncStorage.getItem('token')
      const server = await AsyncStorage.getItem('server')
      axios.get(`http://${server}/base/api/notes/lead/${props.id}`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        console.log(res.data)
        setNotes(res.data)
      }).catch(err =>{
        console.log(err)
      })
    }
    init()

  }, [props.employees])
  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
      >
        <ScrollView style={styles.modal}>
          {props.title ? 
            <>
            <Button transparent onPress={props.close}>
            <Text>Close</Text>
          </Button>
          <Text style={{fontSize: 28}}>{props.title}</Text>
          <Text style={{marginBottom: 8}}> <FontAwesomeIcon icon={faUser}/> {user}</Text>
          <Text style={{marginBottom: 8}}> <FontAwesomeIcon icon={faCalendarAlt }/>  {props.created.split('T')[0]}</Text>
          <Text style={{color: '#ccc', fontWeight: "700"}}>{props.currency}{props.opportunity.toFixed(2)}</Text>
            <ExandableView label="NOTES">
            {notes.map(note =>(<NoteCard {...note} key={note.id}/>))}
            </ExandableView>


          <ExandableView label='TASKS'>
            {props.task_set.map(task =>(<TaskCard {...task} key={task.id}/>))}
          </ExandableView>
          

          <ExandableView label='INTERACTIONS'>
          {props.interaction_set.map(interaction =>(<InteractionCard {...interaction} key={interaction.id}/>))}
          </ExandableView>
            </>
            : null}
            
        </ScrollView>
      </Modal>
  )
}

const LeadCard = (props) =>{
  const [user, setUser] = React.useState('')
  React.useEffect(() =>{
    const employee = props.employees.filter(emp => emp.number == props.owner)
    if(employee.length > 0){
      setUser(employee[0].rep_name)
    }
  }, [props.employees])
  return(<Card >
    <CardItem>
      <Body>
        <Text style={{fontSize: 20, fontWeight: "500", marginBottom: 25}}>{props.title}</Text>
        <View style={{display:'flex', flexDirection: 'row',marginBottom: 12}}>
          <View style={{marginRight: 16}}>
          <Text > <FontAwesomeIcon icon={faUser}/> {user}</Text>
          </View>
          <Text> <FontAwesomeIcon icon={faCalendarAlt }/>  {props.created.split('T')[0]}</Text>
        </View>
  <Text style={{color: '#ccc', fontWeight: "700"}}>{props.currency}{props.opportunity.toFixed(2)}</Text>
        <Button transparent onPress={() =>{
          props.modalManager(true)
          props.leadManager(props)
        }}>
          <Text>Detail</Text>
        </Button>
      </Body>
    </CardItem>
  </Card>)
}


const LeadListScreen = (props) => {
  const {navigate} = props.navigation;
  const [leads, setLeads] = React.useState([])
  const [employees, setEmployees] = React.useState([])
  const [currency, setCurrency] = React.useState('')
  const [active, setActive] = React.useState({})
  const [modalState, setModalState] = React.useState(false)

  React.useEffect(() => {
    async function init(){
      const token = await AsyncStorage.getItem('token')
      const serverStr = await AsyncStorage.getItem('server')
      axios.get(`http://${serverStr}/invoicing/api/lead/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        setLeads(res.data)
      }).catch(err =>{
        console.log(err)
      })
      axios.get(`http://${serverStr}/invoicing/api/sales-rep/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        setEmployees(res.data)
      }).catch(err =>{
        console.log(err)
      })

      axios.get(`http://${serverStr}/accounting/api/settings/1/`, {
        headers: {
        'Authorization': 'Token ' + token
      }
    }).then(res =>{
        axios.get(`http://${serverStr}/accounting/api/currency/${res.data.active_currency}/`, {
          headers: {
            'Authorization': 'Token ' + token
          }
        }).then(res =>{
          setCurrency(res.data.symbol)
        }).catch(err =>{
            console.log(err)
        })
      }).catch(err =>{
        console.log(err)
      })
    }
    init()
    
  }, [])
  return (
    <>
      <LeadModal visible={modalState} 
        close={() => {
          setActive({})
          setModalState(false)
        }}
        {...active}/>
      <Container>
        <Header hasTabs style={{backgroundColor: '#23374b'}} >
          <Left>
          <Button transparent onPress={() =>navigate('Home')}>
            <Icon name='arrow-back' />
          </Button>
          </Left>
          <Body>
          <Title>Leads</Title>
          </Body>
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="New">
            <ScrollView style={{paddingHorizontal: 12}}>
              {leads.filter(lead =>lead.status =='new').map(lead =>{
                return(<LeadCard 
                          {...lead} 
                          employees={employees} 
                          currency={currency}
                          modalManager={setModalState}
                          leadManager={setActive}
                          />)
              })}
            </ScrollView>
          </Tab>
          <Tab heading="Qualified">
          <ScrollView>
              {leads.filter(lead =>lead.status =='qualified').map(lead =>{
                return(<LeadCard 
                  {...lead} 
                  employees={employees} 
                  currency={currency}
                  modalManager={setModalState}
                          leadManager={setActive}/>)
              })}
            </ScrollView>
          </Tab>
          <Tab heading="Quote">
          <ScrollView>
              {leads.filter(lead =>lead.status =='quotation').map(lead =>{
                return(<LeadCard 
                  {...lead} 
                  employees={employees} 
                  currency={currency}
                  modalManager={setModalState}
                          leadManager={setActive}/>)
              })}
            </ScrollView>

          </Tab>
          <Tab heading="Won">
          <ScrollView>
              {leads.filter(lead =>lead.status =='won').map(lead =>{
return(<LeadCard 
  {...lead} 
  employees={employees} 
  currency={currency}
  modalManager={setModalState}
                          leadManager={setActive}/>)
              })}
            </ScrollView>

          </Tab>
          <Tab heading="Lost">
          <ScrollView>
              {leads.filter(lead =>lead.status =='lost').map(lead =>{
                return(<LeadCard 
                  {...lead} 
                  employees={employees} 
                  currency={currency}
                  modalManager={setModalState}
                          leadManager={setActive}/>)
              })}
            </ScrollView>

          </Tab>
        </Tabs>
      </Container>
    </>
  );
};


export default LeadListScreen;
