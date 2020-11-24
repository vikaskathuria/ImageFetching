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
            Tables: [
                { table: "Table one", size: "Big", img: require("../images/big.jpg"), slot: "Available", id: "1" },
                { table: "Table Two", size: "Big", img: require("../images/big.jpg"), slot: "Available", id: "2" },
                { table: "Table three", size: "Big", img: require("../images/big.jpg"), slot: "Available", id: "3" },
                { table: "Table four", size: "Big", img: require("../images/big.jpg"), slot: "Available", id: "4" },
                { table: "Table five", size: "Small", img: require("../images/small.jpg",), slot: "Available", id: "5" },
                { table: "Table six", size: "Small", img: require("../images/small.jpg"), slot: "Available", id: "6" },
                { table: "Table seven", size: "Small", img: require("../images/small.jpg"), slot: "Available", id: "7" },
                { table: "Table eight", size: "Small", img: require("../images/small.jpg"), slot: "Available", id: "8" },

            ],             
            timeArr: [
                { startTime: "10:00am", endTime: "12:00pm" },
                { startTime: "1:00pm", endTime: '3:00pm' },
                { startTime: "3:00pm", endTime: '5:00pm' },
                { startTime: "5:00pm", endTime: "7:00pm" },
                { startTime: "7:00pm", endTime: "9:00pm" },

            ],
            checked1: false,
            checked2: false,
            checked3:false,
            checked4:false
        }
    }


    onPressRadio = (type) => {
        if (type == "one") {
            this.setState({ checked1: !this.state.checked1, })

        }else  if (type == "two") {
            this.setState({ checked2: !this.state.checked2 })

        }
        else  if (type == "three") {
            this.setState({ checked3: !this.state.checked3 })

        }
        else {
            this.setState({ checked4: !this.state.checked4 })

        }

    }

    componentDidMount() {
        let st = true
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            (async () => {
                st = false
                this.didMountFunctions()
            })
        );
        if (st) {
            this.didMountFunctions()
        }
    }

    didMountFunctions() {
        const { Tables, checked1, checked2 } = this.state
        console.log('this.props.route.params', this.props.route.params)
        if (this.props && this.props.route && this.props.route.params&& this.props.route.params.selectedTable) {
            let data=this.props.route.params.selectedTable
            Tables.map((item,index) => {
             if (item.id==data.id) {
                Tables[index].slot="Booked"
             }
            })
    
        }
        this.setState({Tables:Tables})

    }
    handleButtonPress(item) {
        this.props.navigation.navigate("Details", { data: item,table:this.state.Tables })
    }


    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => this.handleButtonPress(item)}
                style={{ backgroundColor: "#fff", paddingVertical: MinMargin / 2, width: width / 2, paddingLeft: index % 2 == 0 ? MinMargin / 2 : MinMargin }}>
                <ImageBackground
                    source={item.img} style={{ width: (width - (MinMargin * 3)) / 2, height: (width - (MinMargin * 3)) / 2, }} resizeMode="cover">
                    <View style={{ padding: MinMargin, flex: 1, justifyContent: 'space-evenly' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: height / 45, color: "#fff", textAlign: 'center' }}>{item.size}</Text>
                            <Text style={{ fontSize: height / 45, color: "#fff", textAlign: 'center' }}>Table No:{index + 1}</Text>
                            <Text style={{ fontSize: height / 45, color: "#fff", textAlign: 'center' }}>{item.slot}</Text>

                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        )
    }


    render() {
        const { Tables, checked1, checked2,checked3,checked4 } = this.state
        TableData = Tables

        if (checked1) { TableData = Tables.filter(function (i) { return i.size.match("Big"); }); }
        if (checked2) { TableData = Tables.filter(function (i) { return i.size.match("Small"); }); }
        if (checked3) { TableData = Tables.filter(function (i) { return i.slot.match("Booked"); }); }
        if (checked4) { TableData = Tables.filter(function (i) { return i.slot.match("Available"); }); }

        if (checked1 && checked2) { TableData = Tables.filter(function (i) { return i }); }


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, }}>
                    <Header title={"Resturant"} />
                </View>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '98%', flex: 1 }}>
                   {TableData.length>0?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}

                            data={TableData}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                     : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No Data Found</Text></View> 
                   }
                        </View>
                </View>
                <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '98%', flex: 1 }}>
                      <View style={{flex:2,}}>
                      <Text style={{ fontSize: height / 40 }}>Filter table </Text>

                      </View>
                      <View style={{flex:8,}}>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',  }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 5, justifyContent: 'flex-start' }}>
                                <CheckBox
                                    center
                                    title='Big'
                                    textStyle={{ color: "grey", }}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    onPress={() => this.onPressRadio("one")}
                                    checked={this.state.checked1}
                                    containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 5, justifyContent: 'flex-start' }}>
                                <CheckBox
                                    center
                                    title='Small'
                                    textStyle={{ color: "grey", }}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    onPress={() => this.onPressRadio("two")}
                                    checked={this.state.checked2}
                                    containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 5, justifyContent: 'flex-start' }}>
                                <CheckBox
                                    center
                                    title='Booked'
                                    textStyle={{ color: "grey", }}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    onPress={() => this.onPressRadio("three")}
                                    checked={this.state.checked3}
                                    containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 5, justifyContent: 'flex-start' }}>
                                <CheckBox
                                    center
                                    title='Available'
                                    textStyle={{ color: "grey", }}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    onPress={() => this.onPressRadio("four")}
                                    checked={this.state.checked4}
                                    containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                                />
                            </View>
                        </View>
                        </View>

                    </View>

                </View>

            </SafeAreaView>
        )
    }
}
