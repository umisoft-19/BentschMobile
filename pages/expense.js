import React, {useState,useEffect} from 'react';
import {StyleSheet, ScrollView, Picker } from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import { Button,
         View,
         Text,
         Form, 
         Input,
         Switch,
         Item,
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


const ExpenseScreen = (props) => {
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState("0.0")
  const [category, setCategory] = useState("0")
  const [description, setDescription] = useState("")
  const [billable, setBillable] = useState(false)
  const [customer, setCustomer] = useState("1")
  const [customers, setCustomers] = useState([])
  let authToken, serverStr

  React.useEffect(() =>{
    async function init(){
    authToken = await AsyncStorage.getItem('token')
    serverStr = await AsyncStorage.getItem('server')
    id = await AsyncStorage.getItem('employeeID')
    axios.get(`http://${serverStr}/invoicing/api/customer/`, {
      headers: {
      'Authorization': 'Token ' + authToken
      }
    }).then(res => {
      setCustomers(res.data)
    }).catch(err =>{
      console.log(err.response)
      console.log(err)
      console.log(err.response.data)
    })
  }
    init()
  },[])

  const {navigate} = props.navigation;
  return (
      <ScrollView style={styles.form}>
        <Form>
          <Item>
              <Text>Date:</Text>
              <DatePicker
                value={date}
                onDateChange={d => setDate(d)}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <Item>
              <Text>Amount:</Text>
              <Input value={amount} onChangeText={val=> setAmount(val)} 
                keyboardType="numeric"/>
          </Item>
         
          <View style={{backgroundColor: '#efefef', padding: 4, margin:12}}>
            <Text>Category:</Text>
            <Picker value={category} onValueChange={val => setCategory(val)}>
                <Picker.Item value='0' label='Advertising'/>
                <Picker.Item value='1' label='Bank Service Charges'/>
                <Picker.Item value='2' label='Dues and Subscriptions'/>
                <Picker.Item value='3' label='Equipment Rental'/>
                <Picker.Item value='4' label='Telephone'/>
                <Picker.Item value='5' label='Vehicles'/>
                <Picker.Item value='6' label='Travel and Expenses'/>
                <Picker.Item value='7' label='Supplies'/>
                <Picker.Item value='8' label='Salaries and Wages'/>
                <Picker.Item value='9' label='Rent'/>
                <Picker.Item value='10' label='Payroll Taxes'/>
                <Picker.Item value='11' label='Legal and Accounting'/>
                <Picker.Item value='12' label='Insurance'/>
                <Picker.Item value='13' label='Office Expenses'/>
                <Picker.Item value='14' label='Carriage Outwards'/>
                <Picker.Item value='15' label='Training'/>
                <Picker.Item value='16' label='Vendor Services'/>
                <Picker.Item value='17' label='Other'/>

            </Picker>
          </View>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            value={description}
            onChangeText={text => setDescription(text)}
            rowSpan={5} bordered placeholder="Description" />
          <Text style={{fontSize: 24}}>Billable</Text>
          <Text>Is Billable?</Text>
          <Switch value={billable} onValueChange={val => setBillable(val)} />
          <View style={{backgroundColor: '#efefef', padding: 4, margin: 12}}>
          <Text>Customer:</Text>
          <Picker value={customer} onValueChange={val => setCustomer(val)}>
              {customers.map(cus => <Picker.Item 
                                          value={cus.id} 
                                          label={`${cus.name}`}/>)}
              
          </Picker>
          </View>
          
        </Form>
        <View style={styles.buttonContainer}>
        <Button 
          style={{flexDirection: 'row', justifyContent: 'center',}}
          primary 
          onPress={() =>{
            axios.post(`http://${serverStr}/accounting/api/expense/`, {
              date: `${date.toISOString().split('T')[0]}`,
              amount: amount,
              category: category,
              description: description,
              billable: billable,
              customer: customer,
              recorded_by: id,
            }, {
              headers: {
              'Authorization': 'Token ' + authToken
              }
            }).then(res => {
              ToastAndroid.show(
                'Expense Recorded successfully',
                ToastAndroid.LONG
              )
              navigate('Home')
            }).catch(err =>{
              console.log(err.response)
              console.log(err)
            })
          }}>
            <Text style={{textAlign: 'center'}}>Record Expense</Text>
          </Button>
        </View>
      </ScrollView>
  );
};


export default ExpenseScreen;
