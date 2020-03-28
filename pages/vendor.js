import React from 'react';
import {StyleSheet, ScrollView, Picker} from 'react-native'
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


const VendorScreen = (props) => {
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
            <Text>Name:</Text>
            <Input />
          </Item>
          <Item>
            <Text>Primary Phone Number:</Text>
            <Input/>
          </Item>
          <Item>
            <Text>Email:</Text>
            <Input />
          </Item>
          <View>
              <Text>Vendor Type:</Text>
              <Picker>
                  <Picker.item value='organization' label='Organization'/>
                  <Picker.item value='individual' label='Individual'/>
              </Picker>
          </View>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            rowSpan={5} bordered placeholder="Address" />
          
          <Text style={{fontSize: 24}}> Additional Details</Text>
          <Item>
            <Text>Website:</Text>
            <Input />
          </Item>
          <Item>
            <Text>Alternate Phone Number:</Text>
            <Input />
          </Item>
          <Textarea 
            style={{
              margin:16,
              marginTop:16
            }}
            rowSpan={5} bordered placeholder="Billing Address" />
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
            <Text style={{textAlign: 'center'}}>Create Vendor</Text>
          </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default VendorScreen;
