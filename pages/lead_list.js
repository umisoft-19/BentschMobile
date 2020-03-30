import React from 'react';
import {StyleSheet, ScrollView, Picker} from 'react-native'
import { faCalendarAlt, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { Container, 
         Header, 
         Text, 
         View,
         Tab, 
         Tabs,
         Card,
         CardItem,
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
  }
})

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
      </Body>
    </CardItem>
  </Card>)
}


const LeadListScreen = (props) => {
  const {navigate} = props.navigation;
  const [leads, setLeads] = React.useState([])
  const [employees, setEmployees] = React.useState([])
  const [currency, setCurrency] = React.useState('')
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
    <Container>
        <Header hasTabs />
        <Tabs>
          <Tab heading="New">
            <ScrollView style={{paddingHorizontal: 12}}>
              {leads.filter(lead =>lead.status =='new').map(lead =>{
                return(<LeadCard {...lead} employees={employees} currency={currency}/>)
              })}
            </ScrollView>
          </Tab>
          <Tab heading="Qualified">
          <ScrollView>
              {leads.filter(lead =>lead.status =='qualified').map(lead =>{
                return(<LeadCard {...lead} employees={employees} currency={currency}/>)
              })}
            </ScrollView>
          </Tab>
          <Tab heading="Quotation">
          <ScrollView>
              {leads.filter(lead =>lead.status =='quotation').map(lead =>{
                return(<LeadCard {...lead} employees={employees} currency={currency}/>)
              })}
            </ScrollView>

          </Tab>
          <Tab heading="Won">
          <ScrollView>
              {leads.filter(lead =>lead.status =='won').map(lead =>{
                return(<LeadCard {...lead} employees={employees} currency={currency}/>)
              })}
            </ScrollView>

          </Tab>
          <Tab heading="Lost">
          <ScrollView>
              {leads.filter(lead =>lead.status =='lost').map(lead =>{
                return(<LeadCard {...lead} employees={employees} currency={currency}/>)
              })}
            </ScrollView>

          </Tab>
        </Tabs>
      </Container>
  );
};


export default LeadListScreen;
