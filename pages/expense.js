import React from 'react';
import {StyleSheet, ScrollView, Picker } from 'react-native'
import Overlay from '../components/overlay'

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


const ExpenseScreen = (props) => {
  const {navigate} = props.navigation;
  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Form>
          <Item>
              <Text>Date:</Text>
              <DatePicker
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <Item>
              <Text>Amount:</Text>
              <Input />
          </Item>
         
          <View style={{marginTop: 16, marginLeft: 12}}>
            <Text>Category:</Text>
            <Picker>
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
            rowSpan={5} bordered placeholder="Description" />
          <Text style={{fontSize: 24}}>Billable</Text>
          <Text>Is Billable?</Text>
          <Switch value={false} />
          <Text>Customer:</Text>
          <Picker>
              <Picker.Item value='1' label='Generic Customer'/>
          </Picker>
        </Form>
        <View style={styles.buttonContainer}>
        <Button primary 
          onPress={() =>navigate('Home')}>
            <Text style={{textAlign: 'center'}}>Record Expense</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default ExpenseScreen;
