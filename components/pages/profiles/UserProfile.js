import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import firebase from "firebase/compat";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import GlobalStyles from '../../../globalStyling/GlobalStyles';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';

function UserProfile({ route, navigation }) {
    const [state, setState] = useState(false)
    const [user, setUser] = useState({})
    const [ads, setAds] = useState([])

    const id = route.params.Clothes.Udlejer

    // Updates on focus
    navigation.addListener('focus', () => {
        state ? setState(false) : setState(true)
    })

    useEffect(() => {
        getProfile()
        getAds()
    }, [route])

    const getProfile = () => {
        const ref = firebase.database().ref(`/users`)
        ref.orderByChild("id").equalTo(id).on('value', snapshot => {
            const value = snapshot.val()
            const objectValues = Object.values(value)
            setUser(objectValues)
        })
    }

    const getAds = () => {
        const ref = firebase.database().ref(`/Clothess`)
        ref.orderByChild("Udlejer").equalTo(id).on('value', snapshot => {
            const value = snapshot.val()
            const objectValues = Object.values(value)
            setAds(objectValues)
        })

    }

    const styles = {
        app: {
            flex: 4, // the number of columns you want to devide the screen into
            marginHorizontal: "auto",
            width: 400,
            backgroundColor: "red"
        },
        row: {
            flexDirection: "row"
        },
        "1col": {
            flex: 1,
        },
        "2col": {
            backgroundColor: "green",
            borderColor: "#fff",
            borderWidth: 1,
            flex: 1,
        },
        "3col": {
            flex: 3
        },
        "4col": {
            flex: 4
        },
        background: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
        },
    };

    const Col = ({ numRows, children }) => {
        return (
            <View style={styles[`${numRows}col`]}>{children}</View>
        )
    }

    const Row = ({ children }) => (
        <View style={styles.row}>{children}</View>
    )

    const adKeys = Object.keys(ads);

    return (
        <View style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, minHeight: 2 }}>
            <LinearGradient
                colors={['#fac8b4', '#d9825f']}
                style={styles.background}
            />
            <Image source={user[0]?.img ? { uri: user[0].img } : require('../../../assets/mig.jpg')/**should be firebase image from ad */} style={{ width: 250, height: 250, borderRadius: 400 / 2, marginTop: 10, alignSelf: 'center' }} />
            <Text style={{ fontWeight: 'bold', alignSelf: 'center', marginTop: 10, fontSize: '25' }}>{user[0]?.username}</Text>
            <View style={{ backgroundColor: '#d9825f' }}>
                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: '15' }}>{'Active advertisements: '}</Text>
            </View>
            {
                ads.map((x) => {
                    return (
                        <View style={{ backgroundColor: '#d9825f', height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }} key={x.Produkt}>
                            <FlashList
                                estimatedItemSize={50}
                                data={ads}
                                initialNumToRender={2}
                                contentContainerStyle={{ paddingBottom: 500 }}
                                keyExtractor={(item, index) => adKeys[index]}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View>
                                            <TouchableOpacity style={GlobalStyles.list.container} onPress={() => console.log(adKeys[index])} key={adKeys[index]}>
                                                <Image
                                                    source={require('../../../assets/vr.png')/*{uri: item.img}*/}
                                                    style={GlobalStyles.list.img}
                                                />
                                                <Text style={GlobalStyles.list.text3}>
                                                    {'\n'}
                                                    {`${item.Produkt}, ${item.Størrelse}, ${item.Pris}`}
                                                    {'\n'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }} />
                        </View>
                    )
                })
            }
        </View>
    );

}


export default UserProfile