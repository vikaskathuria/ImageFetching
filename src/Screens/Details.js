import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
const { width, height } = Dimensions.get("window");
import { Icon } from 'react-native-elements';

export const MinMargin = width / 40;
export const BorderRadius = height / 200;

export default class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Tables: [
                { table: "Table one", size: "Big", img: require("../images/big.jpg"),slot:"Available",id:"1" },
                { table: "Table Two", size: "Big", img: require("../images/big.jpg"),slot:"Available",id:"2" },
                { table: "Table three", size: "Big", img: require("../images/big.jpg"),slot:"Available",id:"3" },
                { table: "Table four", size: "Big", img: require("../images/big.jpg"),slot:"Available",id:"4" },
                { table: "Table five", size: "Small", img: require("../images/small.jpg",),slot:"Available",id:"5" },
                { table: "Table six", size: "Small", img: require("../images/small.jpg"),slot:"Available",id:"6" },
                { table: "Table seven", size: "Small", img: require("../images/small.jpg"),slot:"Available",id:"7" },
                { table: "Table eight", size: "Small", img: require("../images/small.jpg"),slot:"Available",id:"8" },

            ],
            ShiftData: [
                { startTime: "10:00am", endTime: "12:00pm" ,timeId:"1"},
                { startTime: "1:00pm", endTime: '3:00pm',timeId:"2" },
                { startTime: "3:00pm", endTime: '5:00pm',timeId:"3" },
                { startTime: "5:00pm", endTime: "7:00pm",timeId:"4" },
                { startTime: "7:00pm", endTime: "9:00pm",timeId:"5" },

            ],
            selectedTime: '',
            SheetArr: [],
            TableName: '',
            tableId:'',
            selectedTable:null,
            selectedSlot:null,

        }
    }


    async componentDidMount() {
        const { Tables } = this.state
        console.log('this.props.route.params', this.props.route.params)
        if (this.props && this.props.route && this.props.route.params) {
            let data=this.props.route.params.data
            this.setState({
                TableName: data.table,
                tableId:data.id,
                selectedTable:data,
                Tables:this.props.route.params.table

            })

        }
        let data = []
        Tables.map((item, index) => {
            data.push(item.table)

        })

        data.push("Cancel")
        this.setState({ SheetArr: data, })
        console.log('typeee--------', data)

    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }


    handleAction(index) {
        const { Tables } = this.state
        console.log('Tables', Tables)
        if (Tables[index] && Tables[index].table) {
            this.setState({
                TableName: Tables[index].table,
                tableId:Tables[index].id,
                selectedTable:Tables[index]
            })

        }


    }

    handleTimeItem = (item) => {
        const { } = this.state
        this.setState({
            selectedTime: item.startTime,
            timeId:item.id,
            selectedSlot:item
        })
    }



    renderItem = ({ item, index }) => {
        const { selectedTime, } = this.state

        console.log('iiii', item)

        return (
            <View style={{ paddingVertical: MinMargin, width: (width - (MinMargin * 6)) / 3, backgroundColor: selectedTime == item.startTime ? "#000" : "lightgrey", borderRadius: height / 150, marginLeft: MinMargin, marginBottom: MinMargin, marginTop: index < 3 ? MinMargin : 0 }}>
                <TouchableOpacity onPress={() => { this.handleTimeItem(item, index) }}
                    style={{ justifyContent: 'center', alignItems: 'center', }}>

                    <Text style={{ fontSize: height / 48, color: selectedTime == item.startTime ? "#fff" : "#000" }}>{item && item.startTime ? item.startTime : ''}</Text>
                    <Text style={{ fontSize: height / 68, color: selectedTime == item.startTime ? "#fff" : "#000" }}>To</Text>

                    <Text style={{ fontSize: height / 48, color: selectedTime == item.startTime ? "#fff" : "#000" }}>{item && item.endTime ? item.endTime : ''}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleTable=()=>{
        const { selectedTable, selectedSlot, selectedTime } = this.state
        
        if (!selectedTime) {
            alert("Please select shift")
        } else {
            if (selectedTable.slot=="Booked") {
                alert("This table is already booked please select other")
            } else {
                this.props.navigation.navigate("Home",{selectedTable:selectedTable,selectSlot:selectedSlot})

            }
        }
    }

    render() {
        const { SheetArr, TableName, ShiftData } = this.state

        return (
            <View style={{ flex: 1 }}>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Select Table'}
                    options={SheetArr}
                    cancelButtonIndex={SheetArr.length - 1}
                    onPress={(index) => { this.handleAction(index) }}
                />

                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <View style={{ marginVertical: height / 80 }}>
                            <Text style={{ fontWeight: '700', fontSize: height / 45 }}>Select Table</Text>
                            <TouchableOpacity
                                onPress={this.showActionSheet}
                                style={{ marginVertical: height / 150, borderWidth: 1, height: height / 15, borderRadius: height / 120, borderColor: "lightgrey", backgroundColor: "white" }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 8, justifyContent: 'center', }}>
                                        <Text style={{ fontSize: height / 48, color: "grey" }}>   {TableName ? TableName : "Select Table"}</Text>
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon
                                            name='chevron-down'
                                            type='entypo'
                                            color={"grey"}
                                        />

                                    </View>


                                </View>
                            </TouchableOpacity>

                        </View>


                       
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: height / 45 }}>{"Select Shift"}</Text>
                            <View style={{ backgroundColor: "white", justifyContent: 'center', marginVertical: MinMargin, borderRadius: BorderRadius }}>
                                <FlatList
                                    extraData={this.state}
                                    data={ShiftData}
                                    renderItem={this.renderItem}
                                    numColumns={3}
                                    keyExtractor={(item, index) => index}
                                />

                            </View>

                        </View>


                    </View>
                </ScrollView>
                <View style={{width:width,justifyContent:'center',alignItems:'center',position:'absolute',bottom:4,}}>
                     <TouchableOpacity 
                     onPress={this.handleTable}
                     style={{height:height/13,width:"90%",backgroundColor:"black",borderRadius:height/120,justifyContent:'center',alignItems:'center',}}>
                         <Text style={{fontSize:height/35,color:"white"}}>Book Table</Text>
                     </TouchableOpacity>
              
                     </View>

            </View>
        )
    }
}
