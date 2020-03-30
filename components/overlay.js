import React from 'react';
import {StyleSheet} from 'react-native'

import { Button,
         View,
         Text,
         Form, 
         Item,
         Input
        } from 'native-base';

        const styles = StyleSheet.create({
            container: {
              flexDirection: 'column',
              flex: 1
            },
            upper: {
              backgroundColor: '#23374d',
              flex: 1,
              paddingHorizontal: 64,
              paddingVertical: 16,
              color: 'white'
            },
            lower: {
              backgroundColor: '#007bff',
              flex: 2
            },
            logo: {
              fontSize:48,
              color: 'white',
              textAlign: 'right'
            },
            logoB: {
              backgroundColor: '#007bff',
              letterSpacing: 16,
              margin: 0,
              borderRadius: 4,
              color: 'white',
              fontSize: 48
            },
            logoM: {
              textAlign: "right",
              fontSize: 20,
              color: 'white',
            },
          })
          
          
const overlay = (props) => {
    return (
        <View style={styles.container}>
        <View style={styles.upper}>
            <Text style={styles.logo}><Text style={styles.logoB}>B</Text>entsch</Text>
            <Text style={styles.logoM}>Mobile</Text>
        </View >
        <View style={styles.lower}></View>
        {props.children}
        </View>
    );
};


export default overlay