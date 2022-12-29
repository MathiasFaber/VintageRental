import React, { useEffect, useState, memo } from 'react';
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
import { FlashList } from '@shopify/flash-list';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import noImage from '../../assets/noImage.png';

// An issue we have been struggling with, is to load images in realtime from the database. 
// We have not found a solution to this issue, which is why a default picture is loaded, when advertisements has just been created. 
// When the photo can be found in the databae (firebase storage), it will be showed on the advertisement. 
const DEFAULT_IMAGE = Image.resolveAssetSource(noImage).uri;

// The ClothesList component shows all advertisements in the application
function ClothesList({ navigation }) {
    const [Clothess, setClothess] = useState();
    const [Loading, setLoading] = useState(false);
    const [state, setState] = useState(false)
    const [stuff, setStuff] = useState([]) // stuff is only used to update a state, making it possible to load all images in the flashlist

    // Checks if user is logged in
    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Ikke logget ind :(((</Text>
            <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
        </View>;
    }

    // Updates the page, when the user navigates to this page (This is used for updating the data, when new advertisements are created)
    navigation.addListener('focus', () => {
        state ? setState(false) : setState(true)
    })

    // The useEffect is dependent on the "state" useState variable.
    // This means that this useEffect triggers, when the ClothesList page is navigated to/displayed on screen. 
    useEffect(() => {
        // Activityindicator is showing that the page is loading untill advertisements are loaded. 
        setLoading(true)
        // The getData function fetches all in the realtime database AND in the storage database. 
        getData()
        setLoading(false)
    }
    ), [state]

    // getData fetches all advertisements from the databases.
    const getData = async () => {
        var updatedObjects;
        var updatedObjects2 = [];
        if (!Clothess) {
            // The following code connects to the firebase databases and pushes data into the above listed variables. 
            // The Clothes state is set to 
            firebase
                .database() // realtime database
                .ref('/Clothess')
                .on('value', snapshot => {
                    updatedObjects = snapshot.val()
                    setClothess(updatedObjects)
                    Object.values(updatedObjects).forEach((x) => {
                        firebase
                            .storage() // storage database
                            .ref()
                            .child(`Pictures/${x.img}`) // finds images for each advertisement. 
                            .getDownloadURL()
                            // The .then method uses a onresolved/onrejected. Meaning that, if the image does not exist, the onrejected function is used, and the default image is used.
                            .then((url) => {
                                x.imgurl = url // x is the advertisement (from the forEach loop). Here, a new prop is added, containing the firebaseurl to the image. 
                                setStuff(x) // setStuff is a useState that is set, in order to update the advertisement from the first firebase request, with the images from this firebase request 
                                updatedObjects2.push(x)
                            }, () => {
                                x.imgurl = DEFAULT_IMAGE
                                setStuff(x) // setStuff is a useState that is set, in order to update the advertisement from the first firebase request, with the images from this firebase request 
                                updatedObjects2.push(x)
                            })
                    })
                })
            // Clothess is set to contain all advertisements, including images. 
            setClothess(updatedObjects2)
        }
    }

    // Activityindicator, showing that advertisements are on the way. 
    if (!Clothess) {
        return (
            <View>
                <ActivityIndicator size={'large'} color='black' style={{ height: '100%' }} />
            </View>
        )
    }

    // When an advertisement is pressed, the user is navigated to the ClothesDetails page, with the route containing data about the chosen advertisement. 
    const handleSelectClothes = id => {
        const Clothes = Object.entries(Clothess).find(Clothes => Clothes[0] === id)
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

// memo allows the component to only re-render when it's props has changed.
// If requests are sent to the database, and all advertisements in the database matches advertisements in the app, the page is not re-rendered
// This is good for runtime.
export default memo(ClothesList);