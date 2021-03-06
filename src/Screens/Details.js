import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native'
import Header from '../Components/Header'
import { Get_Image, Send_Details } from '../Utils/Config'
import Axios from "axios"
const { height, width } = Dimensions.get('window')
import { Input } from 'react-native-elements';
import { globalPostApi } from '../Utils/Service'
import RNFetchBlob from 'rn-fetch-blob'
let imagePath = null
export default class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            img: null,
            fName: '',
            lName: '',
            email: '',
            phone: '',
            imgObj:null
        }
    }


    async componentDidMount() {
        console.log('this.props.route.params', this.props.route.params.image)
        if (this.props && this.props.route && this.props.route.params) {
            this.setState({ img: this.props.route.params.image })
            await RNFetchBlob
            .config({
                fileCache: true,
                appendExt: 'png'
            })
            .fetch('GET', this.props.route.params.image, {
            })
            .then((res) => {
                let part=res.path().indexOf("files")
                let url=res.path().slice(part)
                console.log('The file saved to ',res, res.path(),part,res.path().slice(part), RNFetchBlob.wrap(res.path()))
                imagePath = res.path()
                let photo={
                    filename: 'file.jpeg',
                    uri: 'file://' +res.path(),
                    type:'image/jpeg',
                    name:'image'
                }
                this.setState({imgObj:photo})
                return res.readFile("base64")
            })
            .then((res) => {
                console.log('base ', res)
            })

        }

}


    handleSubmit = () => {
        const { fName, lName, email, phone } = this.state
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let EmailValid = re.test(email.trim())
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let phoneValid = phoneno.test(phone.trim())
        if (!fName.trim()) {
            alert('Please Enter First Name')
        }
        else if (!lName.trim()) {
            alert('Please Enter Last Name')
        }
        else if (!email.trim()) {
            alert('Please Enter Email')
        }
        else if (!EmailValid) {
            alert('Please Enter Valid Email')
        }

        else if (!phone.trim()) {
            alert('Please Enter Phoneno')
        }
        else if (!phoneValid) {
            alert('Please Enter Valid Phoneno')
        }

        else {
            this.SubmitData()
        }

    }

    async SubmitData() {
        this.setState({ loading: true })
        const { fName, lName, email, phone,imgObj,img } = this.state
        let formData = new FormData();
        formData.append('first_name', fName);
        formData.append('last_name', lName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('user_image', imgObj);

        await globalPostApi(Send_Details, formData)
            .then(response => {
                this.setState({ loading: false })
                console.log('Success:', response)
                if (response && response.status == "success") {
                    this.props.navigation.navigate("Home")
                    alert(response.message)
                }else{
                    alert(response.message)

                }
            })
            .catch(error => {
                this.setState({ loading: false })
                console.error('Error:', error)
            });
    }



    render() {
        const { img, loading } = this.state
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={"blue"} />

                </View>
            )
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 3, }}>
                    <Image
                        style={{ height: "100%", width: '100%' }}
                        source={{ uri: img ? img : 'https://www.zamzar.com/images/filetypes/jpg.png' }}
                        resizeMode="stretch"
                    />

                </View>
                <View style={{ flex: 7, backgroundColor: 'lightgrey' }}>
                    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={"handled"}>
                        <View style={{ height: height / 10, width: width, }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}><Text>First Name</Text></View>
                                <View style={{ flex: 5, justifyContent: 'flex-end', }}>
                                    <Input
                                        style={{ flex: 1 }}
                                        inputContainerStyle={{ borderWidth: 1, height: height / 20, width: '100%' }}
                                        onChangeText={value => this.setState({ fName: value })}
                                    />

                                </View>
                            </View>

                        </View>
                        <View style={{ height: height / 10, width: width, }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}><Text>Last Name</Text></View>
                                <View style={{ flex: 5, justifyContent: 'flex-end', }}>
                                    <Input
                                        style={{ flex: 1 }}
                                        inputContainerStyle={{ borderWidth: 1, height: height / 20, width: '100%' }}
                                        onChangeText={value => this.setState({ lName: value })}
                                    />

                                </View>
                            </View>

                        </View>
                        <View style={{ height: height / 10, width: width, }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}><Text>Email</Text></View>
                                <View style={{ flex: 5, justifyContent: 'flex-end', }}>
                                    <Input
                                        style={{ flex: 1 }}
                                        inputContainerStyle={{ borderWidth: 1, height: height / 20, width: '100%' }}
                                        onChangeText={value => this.setState({ email: value })}
                                        keyboardType="email-address"
                                    />

                                </View>
                            </View>

                        </View>
                        <View style={{ height: height / 10, width: width, }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}><Text>Phone</Text></View>
                                <View style={{ flex: 5, justifyContent: 'flex-end', }}>
                                    <Input
                                        style={{ flex: 1 }}
                                        inputContainerStyle={{ borderWidth: 1, height: height / 20, width: '100%' }}
                                        onChangeText={value => this.setState({ phone: value })}
                                        maxLength={10}
                                        keyboardType="phone-pad"
                                    />

                                </View>
                            </View>

                        </View>

                        <View style={{ height: height / 10, width: width, }}>
                            <View style={{ flex: 1, width: '98%', alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    onPress={this.handleSubmit}
                                    style={{ height: height / 15, width: height / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ fontSize: height / 45, fontWeight: '700' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
        )
    }
}
