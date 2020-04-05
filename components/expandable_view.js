import React, {Component} from 'react'
import {View, Text, Button, ScrollView} from 'react-native'

class ExpandableView extends Component{
    state= {
        visible: false
    }
    render(){
       return(<View style={{margin: 8}}>
            <Button title={this.props.label} onPress={() =>this.setState((prevState) => ({visible: !prevState.visible}))}>
                <Text>{this.props.label}</Text>
            </Button>
            <ScrollView style={{display: this.state.visible ? 'flex':'none'}}>
                {this.props.children}
            </ScrollView>
        </View>)

    }
}

export default ExpandableView