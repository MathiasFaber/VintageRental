import React, { useEffect, useState, memo } from 'react';
import {
    Text,
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
import GlobalStyles from '../../globalStyling/GlobalStyles';

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

    /*
    // Checks if user is logged in
    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={GlobalStyles.list.text}>Ikke logget ind :(((</Text>
            <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
        </View>;
    }
    */

    /*
    // Updates the page, when the user navigates to this page (This is used for updating the data, when new advertisements are created)
    navigation.addListener('focus', () => {
        state ? setState(false) : setState(true)
    })
*/
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
                    //console.log(updatedObjects)
                    setClothess(updatedObjects)
                    Object.values(updatedObjects).forEach((x) => {
                        firebase
                            .storage() // storage database
                            .ref()
                            .child(`pictures/advertisements/${x.img}`) // finds images for each advertisement. 
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
        <View style={GlobalStyles.list.view}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={GlobalStyles.list.text1}>
                    VintageRental
                </Text>
                <Pressable style={GlobalStyles.list.button} onPress={() => navigation.navigate('Map', Clothess)}>
                    <FontAwesome name="map-marker" size={20} />
                </Pressable>
            </View>

            <FlashList
                estimatedItemSize={50}
                data={ClothesArray}
                initialNumToRender={2}
                keyExtractor={(item, index) => ClothesKeys[index]}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity style={GlobalStyles.list.container} onPress={() => handleSelectClothes(ClothesKeys[index])}>
                                <Image
                                    source={require('../../assets/vr.png')/*{uri: item.img}*/ }
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
    );
}

// memo allows the component to only re-render when it's props has changed.
// If requests are sent to the database, and all advertisements in the database matches advertisements in the app, the page is not re-rendered
// This is good for runtime.
export default memo(ClothesList);