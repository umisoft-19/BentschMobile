import React from 'react';
import {StyleSheet, ScrollView, Picker } from 'react-native'
import Overlay from '../components/overlay'

import { Button,
         View,
         Text,
         Form, 
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


const VacationScreen = (props) => {
  const {navigate} = props.navigation;
  return (
    <Overlay>
      <ScrollView style={styles.form}>
        <Form>
          <Item>
              <Text>Start:</Text>
              <DatePicker
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <Item>
              <Text>End:</Text>
              <DatePicker
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                />
          </Item>
          <View style={{marginTop: 16, marginLeft: 12}}>
            <Text>Category:</Text>
            <Picker>
                <Picker.Item value='1' label='Annual Vacation Time'/>
                <Picker.Item value='2' label='Sick Leave'/>
                <Picker.Item value='3' label='Annual Vacation Time'/>
                <Picker.Item value='4' label='Study Leave'/>
                <Picker.Item value='5' label='Maternity Leave'/>
                <Picker.Item value='6' label='Bereavement Leave'/>
            </Picker>
          </View>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            rowSpan={5} bordered placeholder="Notes" />
          
          
        </Form>
        <View style={styles.buttonContainer}>
        <Button primary 
          onPress={() =>navigate('Home')}>
            <Text style={{textAlign: 'center'}}>Submit Application</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default VacationScreen;
