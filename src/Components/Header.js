import React, { Component } from 'react'
import { Text, View,Dimensions } from 'react-native'
const {height,width}=Dimensions.get('window')
export default class Header extends Component {
    render() {
        const {title}=this.props
        return (
            <View style={{paddingVertical:height/40,justifyContent:'center',alignItems:'center',elevation:5,backgroundColor:'lightgrey'}}>
                <Text style={{fontSize:height/45,fontWeight:'bold'}}> {title} </Text>
            </View>
        )
    }
}
