import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import Header from '../Components/Header'
const { width, height } = Dimensions.get("window");

export const MinMargin = width / 40;
export const Margin = width / 20;
import { CheckBox } from 'react-native-elements';
let TableData = []
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: []
        }
    }



    componentDidMount() {
        let st = true
        if (st) {
            this.didMountFunctions()
        }
    }

    didMountFunctions() {
        const { Tables, checked1, checked2 } = this.state
        this.createDeck()
    }


    createDeck() {
        let arr = []
        let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                arr.push({ suits: suits[i], ranks: ranks[j], values: values[j] });
            }
        }
        this.setState({ cards: arr })
    }

    render() {
        const { cards } = this.state
        console.log("cardscards", cards);


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, }}>
                    <Header title={"Card Deck"} />
                </View>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '98%', flex: 1 }}>
                    </View>
                </View>

            </SafeAreaView>
        )
    }
}
