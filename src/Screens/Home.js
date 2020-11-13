import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import Header from '../Components/Header'
import { Get_Image } from '../Utils/Config'
import Axios from "axios"
const { height, width } = Dimensions.get('window')
import Image from 'react-native-scalable-image';
import { globalPostApi } from '../Utils/Service'
let data = ["a", "1", "3", "4", "5"]
let url12 = "https://www.zamzar.com/images/filetypes/jpg.png"
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            userId: "108",
            offset: 0,
            type: "popular",
            ImageData: []

        }
    }

    componentDidMount() {
        this.getImageData()
    }

    async getImageData() {
        this.setState({ loading: true })
        const { userId, offset, type } = this.state
        let formData = new FormData();
        formData.append('user_id', userId);
        formData.append('offset', offset);
        formData.append('type', type);

        await globalPostApi(Get_Image, formData)
            .then(response => {
                this.setState({ loading: false })
                console.log('Success:', response)
                if (response && response.status == "success" && response.images && response.images != "") {
                    this.setState({ ImageData: [...this.state.ImageData, ...response.images] })
                }
            })
            .catch(error => {
                this.setState({ loading: false })
                console.error('Error:', error)
            });
    }

    async handleLoadMore() {
        const { offset } = this.state
        await this.setState({ offset: offset + 1, })
        this.getImageData()

    }
    gotoNextScreen(item) {
        this.props.navigation.navigate("Details", { image: item.xt_image })
    }

    renderItem = ({ item, index }) => {
        const { ImageData } = this.state

        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.gotoNextScreen(item)}
                    style={{ width: width, marginBottom: height / 80, marginTop: index == 0 ? height / 80 : 0 }}>
                    <Image
                        width={width - (width / 40)} // height will be calculated automatically
                        source={{ uri: item.xt_image }}
                    />
                </TouchableOpacity>
                {ImageData.length > 0 && ((ImageData.length - 1) == index) ?
                    <TouchableOpacity
                        onPress={() => this.handleLoadMore()}
                        style={{ height: height / 15, width: width, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1 }}>
                        <Text style={{ fontWeight: '700', fontSize: height / 40 }}>Load More</Text>
                    </TouchableOpacity>
                    : null
                }

            </View>
        )
    }

    render() {
        const { ImageData, loading } = this.state
        console.log("ImageData", ImageData);
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={"blue"} />

                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, }}>
                    <Header title={"Home"} />
                </View>
                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '98%', flex: 1 }}>
                        {ImageData && ImageData.length > 0 ?
                            <FlatList
                            showsVerticalScrollIndicator={false}
                                data={ImageData}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No Data Found</Text></View>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
