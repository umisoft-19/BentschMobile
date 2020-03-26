import React from 'react';
import {StyleSheet, ScrollView} from 'react-native'
import Overlay from '../components/overlay'

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


const EventScreen = (props) => {
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
            <Text>Label:</Text>
            <Input />
          </Item>
          <Item>
            <Text>Start:</Text>

            <Input placeholder='HH:MM' />
          </Item>
          <Item>
            <Text>Stop:</Text>
            <Input placeholder='HH:MM' />
          </Item>
          <Textarea rowSpan={5} bordered placeholder="Description" />
          
          
        </Form>
        <View style={styles.buttonContainer}>
        <Button primary 
          onPress={() =>navigate('Home')}>
            <Text style={{textAlign: 'center'}}>Create Event</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default EventScreen;
