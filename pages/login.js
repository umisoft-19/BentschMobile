import React from 'react';
import {StyleSheet} from 'react-native'
import Overlay from '../components/overlay'

import { Button,
         View,
         Text,
         Form, 
         Item,
         Input
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


const LoginScreen = (props) => {
  const {navigate} = props.navigation;
  return (
    <Overlay>
      <View style={styles.form}>
        <Text>Login</Text>
        <Form>
          <Item>
            <Input placeholder='Username' />
          </Item>
          <Item>
            <Input placeholder='Password' />
          </Item>
          <Item>
            <Input placeholder='Server' />
          </Item>
        </Form>
        <View style={styles.buttonContainer}>
        <Button primary 
          onPress={() =>navigate('Home')}>
            <Text style={{textAlign: 'center'}}>Login</Text>
          </Button>
        </View>
      </View>
    </Overlay>
  );
};


export default LoginScreen;
