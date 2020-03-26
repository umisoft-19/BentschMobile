
import React from 'react';
import Overlay from '../components/overlay'
import {StyleSheet, ActivityIndicator} from 'react-native'

import { Button,
          View,
          Text,
          Card,
          CardItem,
          Body
        } from 'native-base';

styles = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 120,
    left: 16,
    right: 16,
    height: 200
  }
})

const SyncScreen = () => {
  return (
      <Overlay>
        <View style={styles.window}>
        <Card>
          <CardItem>
            <Body>
              <Text>Syncing application</Text>
              <ActivityIndicator size="large" color="#007bff" />
              <Text>Invoicing...</Text>
              <Text>Inventory...</Text>
              <Text>Accounting...</Text>
              <Text>Planner...</Text>
              <Text>Employee...</Text>
            </Body>
          </CardItem>
          </Card>
          
        </View>
          
      </Overlay>
  );
};

export default SyncScreen;
