import React, { Component } from 'react'
import { Text, View, SafeAreaView,FlatList,TouchableOpacity,Dimensions } from 'react-native'
import Header from '../Components/Header'
import { Get_Image } from '../Utils/Config'
import Axios from "axios"
const {height,width}=Dimensions.get('window')

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            userId: "108",
            offset: 0,
            type: "popular",
            
        }
    }

    componentDidMount() {
        // this.getImageData()
    }

    getImageData() {
        this.setState({ loading: true })
        const { userId, offset, type } = this.state
        let formData = new FormData();
        formData.append('user_id', userId);
        formData.append('offset', offset);
        formData.append('type', type);

        fetch(Get_Image, {
            method: 'POST', // or 'PUT'
            body: formData, // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({ loading: false })

                console.log('Success:', response)
            })
            .catch(error => {
                this.setState({ loading: false })
                console.error('Error:', error)
            });
    }

renderItem=({item,index})=>{
return(
    <TouchableOpacity style={{height:height/10,width:width,backgroundColor:'pink',marginTop:height/80}}>
 
    </TouchableOpacity>
)
}

    render() {
        let data=["a","1","3","4","5"]
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, }}>
                    <Header title={"Home"} />
                </View>
                <View style={{ flex: 8,justifyContent:'center',alignItems:'center' }}>
                  <View style={{width:'90%',flex:1}}>
                  <FlatList
                  data={data}
                  renderItem={this.renderItem}
                  />
                  </View>
                </View>

            </SafeAreaView>
        )
    }
}
