import React, { useEffect, useState, memo, PureComponent } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    View,
    Button,
    Pressable
} from 'react-native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import noImage from '../assets/noImage.png';

const DEFAULT_IMAGE = Image.resolveAssetSource(noImage).uri;

/* todo: 
        map; show a map of where items are (nice to have)
        If vaskemærke is not checked off, you have to check off vaskeanvisning (fx. 30 grader osv) (need to have) DONE
        signUp tilføj adresse (need to have) DONE
        Anmod om udlejning knap (need to have) // more or less done 
        onresolved/onrejected in firebase get image 
*/

// should probably use pure component, to not update already loaded items????

// to have the photo with the clothes details, the photo "name" or potentially ID, should be connected to the details. This should be done by saving the image name/id in the database with the details in order to be able to fetch the photo when fetching the details
function ClothesList({ navigation }) {
    const [Clothess, setClothess] = useState();
    const [Loading, setLoading] = useState(false);
    const [state, setState] = useState(false)
    const [stuff, setStuff] = useState([]) // stuff is only used to update a state, making it possible to load all images in the flashlist

    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Ikke logget ind :(((</Text>
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
        setLoading(true)
        const getData = async () => {
            var updatedObjects;
            var updatedObjects2 = [];
            if (!Clothess) {
                firebase
                    .database()
                    .ref('/Clothess')
                    .on('value', snapshot => {
                        updatedObjects = snapshot.val()
                        setClothess(updatedObjects)
                        Object.values(updatedObjects).forEach((x) => {
                            console.log(x.img, "x.img")
                            firebase
                                .storage()
                                .ref()
                                .child(`Pictures/${x.img}`)
                                .getDownloadURL()
                                .then((url) => {
                                    x.imgurl = url
                                    setStuff(x)
                                    updatedObjects2.push(x)
                                }, () => {
                                    x.imgurl = DEFAULT_IMAGE
                                    setStuff(x)
                                    updatedObjects2.push(x)
                                })
                        })
                    })
                setClothess(updatedObjects2)
            }
        }
        getData()
        setLoading(false)
    }
    ), [state]

    if (!Clothess) {
        return (
            <View>
                <ActivityIndicator size={'large'} color='black' style={{ height: '100%' }} />
            </View>
        )
    }

    const handleSelectClothes = id => {
        const Clothes = Object.entries(Clothess).find(Clothes => Clothes[0] === id)
        console.log(Clothes)
        navigation.navigate('Clothes Details', { Clothes });
    }

    const ClothesArray = Object.values(Clothess);
    const ClothesKeys = Object.keys(Clothess);

    return (
        <View style={styles.view}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.text1}>
                VintageRental
            </Text>
            <Pressable style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    elevation: 3,
                    backgroundColor: '#fac8b4',
                    width: 40,
                    marginLeft: '10%',
                    height: 40,
                    marginTop: 10
                }} onPress={() => navigation.navigate('Map', Clothess)}>
                    <FontAwesome name="map-marker" size={20} />
                </Pressable>
            </View>
            
            <FlashList
                estimatedItemSize={50}
                style={styles.background}
                data={ClothesArray}
                initialNumToRender={2}
                contentContainerStyle={{ paddingBottom: 75 }}
                keyExtractor={(item, index) => ClothesKeys[index]}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.container} onPress={() => handleSelectClothes(ClothesKeys[index])}>
                                {Loading ? <View>
                                    <ActivityIndicator size={'large'} color='black' style={{ height: '100%' }} />
                                </View> :
                                    <Image
                                        source={{ uri: item.imgurl }}
                                        style={{ width: '90%', height: 300, alignSelf: 'center' }}
                                    />
                                }
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
                                    Udlejningsperiode: {item.Udlejningsperiode}
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
        backgroundColor: '#d9825f',
        height: '100%',
        width: '100%',
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
        textAlign: 'left',
        fontFamily: 'Snell Roundhand',
        borderWidth: 3,
        borderColor: 'transparent',
        borderBottomWidth: 8,
        backgroundColor: 'transparent',
        marginLeft: '22%'
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
    },
    BigButtonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }

});

export default memo(ClothesList);