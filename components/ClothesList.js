import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    View,
    Button
} from 'react-native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';


// to have the photo with the clothes details, the photo "name" or potentially ID, should be connected to the details. This should be done by saving the image name/id in the database with the details in order to be able to fetch the photo when fetching the details
function ClothesList({ navigation }) {
    const [Clothess, setClothess] = useState();
    const [image, setImage] = useState();
    const [Loading, setLoading] = useState(false);
    const [state, setState] = useState(false)

    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={{textAlign: 'center', fontSize: 20}}>Ikke logget ind :(((</Text>
            <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
        </View>;
    }

    navigation.addListener('focus', () => {
        if (state == true) {
            setState(false)
        } else {
            setState(true)
        }
    })

    useEffect(() => {
        var updatedObjects;
        if (!Clothess) {
            firebase
                .database()
                .ref('/Clothess')
                .on('value', snapshot => {
                    updatedObjects = snapshot.val()
                    Object.values(updatedObjects).forEach((x) => {
                        firebase
                            .storage()
                            .ref()
                            .child(`Pictures/${x.img}`)
                            .getDownloadURL()
                            .then((url) => {
                                x.imgurl = url
                                setClothess(updatedObjects)
                            })
                    })
                })
        }
    }
    ), [state]


    if (!Clothess) {
        return (
            <View>
                <ActivityIndicator size={'large'} color='black' style={{ height: '100%'}} />
            </View>
        )
    }

    const handleSelectClothes = id => {
        const Clothes = Object.entries(Clothess).find(Clothes => Clothes[0] === id)
        navigation.navigate('Clothes Details', { Clothes });
    }

    const ClothesArray = Object.values(Clothess);
    const ClothesKeys = Object.keys(Clothess);


    return (
        <View style={styles.view}>
            <Text style={styles.text1}>
                VintageRental
            </Text>
            <FlatList
                style={styles.background}
                data={ClothesArray}
                contentContainerStyle={{paddingBottom:75}} 
                keyExtractor={(item, index) => ClothesKeys[index]}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.container} onPress={() => handleSelectClothes(ClothesKeys[index])}>
                                <Image
                                    source={{ url: item.imgurl }}
                                    style={{ width: '90%', height: 300, alignSelf: 'center' }}
                                />
                                <Text style={styles.text3}>
                                    {'\n'}
                                    {item.Produkt}
                                    {'\n'}
                                </Text>
                                <Text style={styles.text4}>

                                    Pris: {item.Pris}
                                    {'\n'}
                                    Størrelse: {item.Størrelse}
                                    {'\n'}
                                    Udlejer: {item.Sælger}
                                    {'\n'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }} />
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#d9825f'
    },
    container: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 25,
        margin: 5,
        padding: 5,
        height: 475,
        justifyContent: 'center',
        backgroundColor: '#fac8b4'
    },
    label: { fontWeight: 'bold' },
    text1: {
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Snell Roundhand',
        borderWidth: 3,
        borderColor: 'transparent',
        borderBottomWidth: 8,
        backgroundColor: 'transparent'
    },
    text2: {
        textAlign: 'center'

    },
    text3: {
        textAlign: 'center',
        borderLeftWidth: 20,
        borderColor: "transparent",
        fontWeight: "bold"
    },
    text4: {
        textAlign: 'left',
        borderLeftWidth: 20,
        borderColor: "transparent",
    }

});

export default ClothesList