import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import Header from '../Components/Header'
import Cards from '../Components/Card'

const { width, height } = Dimensions.get("window");
let arr = []
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
        this.createDeck()

    }



    componentDidMount() {
        let st = true
        if (st) {
            this.didMountFunctions()
        }
    }

    didMountFunctions() {
        const { Tables, checked1, checked2 } = this.state
    }


    createDeck() {
         arr = []
        let suits = [{suit:'clubs',name:"cards-club",type:'material-community'},{suit: 'diamonds',name:"cards-diamond",type:'material-community'}, {suit:'hearts',name:"cards-heart",type:'material-community'}, {suit:'spades',name:"cards-spade",type:'material-community'}];
        let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                arr.push({ suits: suits[i], ranks: ranks[j], values: values[j] });
            }
        }
        // this.setState({ cards: arr })
        console.log(arr);
    }

    render() {
        const { cards } = this.state
        console.log("cardscards", cards);


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <Cards
                        cards={arr}
                        />

            </SafeAreaView>
        )
    }
}
