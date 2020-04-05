import React from 'react';
import {StyleSheet, ScrollView, Picker, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { Button,
         View,
         Text,
         Form, 
         Item,
         Input,
         Textarea,
         DatePicker
        } from 'native-base';


const styles = StyleSheet.create({
  form: {
    
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16
  },

  buttonContainer: {
    marginVertical: 24,
    marginHorizontal: 48
  }
})


const LeadScreen = (props) => {
  const {navigate} = props.navigation;
  const [contacts, setContacts] = React.useState([])
  const [sources, setSources] = React.useState([])
  const [reps, setReps] = React.useState([])
  const [date, setDate] = React.useState(new Date())
  const [title, setTitle] = React.useState('')
  const [rep, setRep] = React.useState('')
  const [source, setSource] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [opportunity, setOpportunity] = React.useState('')
  const [probability, setProbability] = React.useState('')
  const [status, setStatus] = React.useState('')

  React.useEffect(() =>{
    async function init(){
        const server = await AsyncStorage.getItem('server')
        const token = await AsyncStorage.getItem('token')
        axios.get(`http://${server}/base/api/individual`, {
            headers: {
                'Authorization': 'Token ' + token
            }})
            .then(res => setContacts(res.data))
            .catch(err=>console.log(err))

        axios.get(`http://${server}/invoicing/api/sales-rep`, {
          headers: {
              'Authorization': 'Token ' + token
          }})
          .then(res => {setReps(res.data)})
          .catch(err=>console.log(err))

        axios.get(`http://${server}/invoicing/api-list-lead-sources`, {
          headers: {
              'Authorization': 'Token ' + token
          }})
          .then(res => {
            setSources(res.data)})
          .catch(err=>console.log(err))
    }
    init()
},[])
  return (
      <ScrollView style={styles.form}>
        <Form>
          <Item>
              <Text>Date:</Text>
              <DatePicker
                value={date}
                onDateChange={(date) => setDate(date)}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <Item>
            <Text>Title:</Text>
            <Input value={title} onChangeText={(text) => {setTitle(text)}}/>
          </Item>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            rowSpan={5} 
            bordered 
            placeholder="Description"
            value={description} 
            onChangeText={(text) => {setDescription(text)}} />
          <View style={{backgroundColor: '#efefef', padding: 4}}>
              <Text>Owner: </Text>
              <Picker selectedValue={rep} 
                onValueChange={val =>setRep(val)}>
              {reps.map(rep =>(<Picker.Item 
                                              value={rep.number} 
                                              label={rep.rep_name} />))}
              </Picker>
          </View>
          
          <View>
              <Text>Source: </Text>
              <Picker selectedValue={source} 
                onValueChange={val =>setSource(val)}>
              {sources.map(source =>(<Picker.Item 
                                              value={source.id} 
                                              label={source.name} />))}
              </Picker>
          </View>
          <View style={{backgroundColor: '#efefef', padding: 4}}>
              <Text>Contact: </Text>
              <Button transparent onPress={() =>navigate('Contact')}>
                <Text>Create New</Text>
              </Button>
              <Picker selectedValue={contact} 
                onValueChange={val =>setContact(val)}>
                  {contacts.map(contact =>(<Picker.Item 
                                              value={contact.id} 
                                              label={`${contact.first_name} ${contact.last_name}`} />))}
              </Picker>
          </View>
          <Item>
            <Text>Opportunity:</Text>
            <Input keyboardType='numeric'  value={opportunity} onChangeText={(text) => {setOpportunity(text)}}/>
          </Item>
          <Item>
            <Text>Closing Probability(%):</Text>
            <Input keyboardType='numeric' value={probability} onChangeText={(text) => {setProbability(text)}}/>
          </Item>
          <View style={{backgroundColor: '#efefef', padding: 4}}>
              <Text>Status: </Text>
              <Picker  selectedValue={status} 
                onValueChange={val =>setStatus(val)}>
                  <Picker.Item value='new' label='New' />
                  <Picker.Item value='qualified' label='Qualified' />
                  <Picker.Item value='quotation' label='Quote' />
                  <Picker.Item value='won' label='Won' />
                  <Picker.Item value='lost' label='Lost' />
              </Picker>
          </View>
        </Form>
        <View style={styles.buttonContainer}>
        <Button 
          style={{flexDirection: 'row', justifyContent: 'center',}}
          primary 
          onPress={() =>{
            async function submit(){
              const server = await AsyncStorage.getItem('server')
              const token = await AsyncStorage.getItem('token')
              axios.post(`http://${server}/invoicing/api/lead/`, 
                    {
                      date: `${date.toISOString().split('T')[0]}`,
                      contacts: [contact],
                      title: title,
                      description: description,
                      owner: rep,
                      status: status,
                      opportunity: opportunity,
                      probability_of_sale: probability,
                      source: source,
                      notes: []
                    },{
                  headers: {
                      'Authorization': 'Token ' + token
                  }})
                  .then(res => {
                    ToastAndroid.show('Created Lead successfully', ToastAndroid.LONG)
                    navigate('Home')
                  })
                  .catch(err=>console.log(err.response))
            }
            submit()
            }}>
            <Text style={{textAlign: 'center'}}>Submit Lead</Text>
          </Button>
        </View>
      </ScrollView>
  );
};


export default LeadScreen;
