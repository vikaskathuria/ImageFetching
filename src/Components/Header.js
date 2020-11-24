import React, { Component } from 'react'
import { Text, View,Dimensions } from 'react-native'
const {height,width}=Dimensions.get('window')
const HeaderIconSize = height / 30

export default class Header extends Component {
    render() {
        const {title,RightIcon,RightIconType,RightIconName,RightIconNavigate,type}=this.props
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',elevation:5,backgroundColor:'lightgrey'}}>
                <Text style={{fontSize:height/45,fontWeight:'bold'}}> {title} </Text>
                <View>
                        {RightIcon ?
                            <Icon
                                name={RightIconName}
                                type={RightIconType}
                                size={HeaderIconSize}
                                color={"#000"}
                                onPress={RightIconNavigate ? RightIconNavigate : null}
                            />
                            :
                            type == 'Back' ? <View style={{ width: HeaderIconSize }}>
                            </View>
                                : null}
                    </View>

            </View>
        )
    }
}
