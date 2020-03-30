import React from 'react';
import {StyleSheet, ScrollView, Picker} from 'react-native'
import Overlay from '../components/overlay'
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


const LeadScreen = (props) => {
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
            <Text>Title:</Text>
            <Input />
          </Item>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            rowSpan={5} bordered placeholder="Description" />
          <View>
              <Text>Owner: </Text>
              <Picker>
                  <Picker.Item value='1' label='Sales Rep' />
              </Picker>
          </View>
          
          <View>
              <Text>Source: </Text>
              <Picker>
                  <Picker.Item value='1' label='Phone Call' />
              </Picker>
          </View>
          <View>
              <Text>Contact: </Text>
              <Picker>
                  <Picker.Item value='1' label='Mr Person' />
              </Picker>
          </View>
          <Item>
            <Text>Opportunity:</Text>
            <Input />
          </Item>
          <Item>
            <Text>Closing Probability(%):</Text>
            <Input />
          </Item>
          <View>
              <Text>Status: </Text>
              <Picker>
                  <Picker.Item value='new' label='New' />
                  <Picker.Item value='qualified' label='Qualified' />
                  <Picker.Item value='quotation' label='Quotation' />
                  <Picker.Item value='won' label='Won' />
                  <Picker.Item value='lost' label='Lost' />
              </Picker>
          </View>
        </Form>
        <View style={styles.buttonContainer}>
        <Button primary 
          onPress={() =>navigate('Home')}>
            <Text style={{textAlign: 'center'}}>Submit Lead</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default LeadScreen;
