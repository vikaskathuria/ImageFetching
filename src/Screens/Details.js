import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Details extends Component {

    async componentDidMount() {
        console.log('this.props.route.params', this.props.route.params.image)
        if (this.props && this.props.route && this.props.route.params) {
            this.setState({ img: this.props.route.params })

        }

}

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
