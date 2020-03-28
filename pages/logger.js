import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native'
import Overlay from '../components/overlay'

import { Button,
         View,
         Text,
        } from 'native-base';


const styles = StyleSheet.create({
  window: {
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
  },
  textContainer: {
      padding: 16
  },
  time: {
      fontSize: 64,
      textAlign: 'center',
      lineHeight: 96
  },
  shiftText: {
      fontSize: 24,
      textAlign: 'center',
      lineHeight: 36
  }
})


const LoggerScreen = (props) => {
    const [now, setNow] = useState(new Date())
    const [blink, setBlink] = useState(false)
    useEffect(()=>{
        const ticker = setInterval(() =>{
            setNow(new Date())
            setBlink(!blink)
        }, 1000)
        return(() =>{
            clearInterval(ticker)
        })
    }, [])
  const {navigate} = props.navigation;
  return (
    <Overlay>
      <ScrollView style={styles.window}>
        <View style={styles.textContainer}>
            <Text style={styles.time}>
                {now.getHours()}<Text style={{...styles.time, color: blink ? 'white' : 'black'}}>:</Text>{now.getMinutes()}
            </Text>
            <Text style={styles.shiftText}>Current Shift: Shift 1</Text>
            <Text style={styles.shiftText}>Time In: 08:00</Text>
            <Text style={styles.shiftText}>Time Out: 17:00</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button >
                <Text>Login/Logout</Text>
            </Button>
        </View>
      </ScrollView>
    </Overlay>
  );
};


export default LoggerScreen;
