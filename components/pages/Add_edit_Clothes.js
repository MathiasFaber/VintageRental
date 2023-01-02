import React, { useState } from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ScrollView,
    SafeAreaView,
    Alert,
    Image,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../FirebaseConfig'
import Checkbox from 'expo-checkbox';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as Location from 'expo-location';
import { Accuracy } from "expo-location";
import InfoBox from '../infoBox/InfoBox';
import GlobalStyles from '../../globalStyling/GlobalStyles';

// This is the Add/Edit clothes component, that handles new or updated advertisemnts in the app.
function Add_edit_Clothes({ navigation, route }) {
    // initial state is an object of key/value pairs, containing the keys of each prop an advertisement consists of. 
    const initialState = { Produkt: '', Pris: '', Udlejningsperiode: '', Størrelse: '' }
    // The NewClothes state is manipulated when an advertisement is created or updated. It contains the initialstate, which will be updated to have the values of each key when an advertisement is created. 
    const [newClothes, setNewClothes] = useState(initialState);
    const [image, setImage] = useState([])
    const [uploading, setUploading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [checked, setChecked] = useState(true)
    const [checked2, setChecked2] = useState(true)

    const [username, setUsername] = useState('')
    const [address, setAddress] = useState('')

    navigation.addListener('focus', () => {
        if (firebase.auth().currentUser?.displayName === undefined) {
            return <View>
                <Text style={GlobalStyles.add.text}>Ikke logget ind :(((</Text>
                <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
            </View>;
        } else {
            const user = firebase.auth().currentUser
            const mail = user.email
            var ref = firebase.database().ref(`/users`)
            ref.orderByChild("mail").equalTo(mail).on('value', snapshot => {
                const value = snapshot.val()
                const objectValues = Object.values(value)
                setAddress(objectValues[0].address)
                setUsername(objectValues[0].username)
            })
        }
    })


    const infoText1 = `Angiv om det udlejede tøj har et vaskemærke her. Forskelligt tøj kan have forskellige vaskeanvisninger, og det er meget vigtigt at få angivet de rigtige vaskeanvisninger, så vores renserier kan vaske eller rense tøjet korrekt. Såfremt der hverken fremgår vaskemærke eller er opgivet vaskeanvisning, vil tøjet blive sent retur inden udlejning, og udlejer er ansvarlig for at handlen ikke gennemføres, grundet mangel på vaskeanvisnigner.`
    const infoText2 = `Vaskeanvisninger omfatter:                                    
hvor mange grader tøjet må vaskes ved,
om det må stryges,
om det må renses,
om det må tørretumbles og
eventuelle yderligere vaskeanvisninger.`


    const updateLocation = async () => {
        var coordinates;
        await Location.getCurrentPositionAsync({ accuracy: Accuracy.Balanced }).then((item) => {
            const latitude = item.coords.latitude
            const longitude = item.coords.longitude
            coordinates = {
                latitude,
                longitude
            }
        });
        return coordinates
    };

    // Sets the newClothes state to be equal to the new input from the edit form 
    const changeTextInput = (name, event) => {
        setNewClothes({ ...newClothes, [name]: event });
    }
    // HandleSave is used when saving ypur edited or newly created advertisement. It saves the data to the database. 
    const handleSave = async () => {
        var { Produkt, Pris, Udlejningsperiode, Størrelse } = newClothes;
        // if one of the input fields are empty: alert it to the user. 
        if (Produkt.length === 0 || Pris.length === 0 || Udlejningsperiode.length === 0 || Størrelse.length === 0) {
            return Alert.alert('Et af felterne er tomme!');
        }

        // Updates the data in database, if all inputfields are filled out. 
        // This function uploads the image to the firebase storage database
        uploadImage()

        const coordinates = await updateLocation()
        // This function uploads the data from the advertisement, including: price, product, size, owner, renting period, washing instructions, image id and coordinates
        saveToRealTimeDatabase(coordinates)
    };

    // Picks an image from the phone, to add to the advertisement
    const pickImage = async () => {
        // SetLoading is used to show an activityindicator in the ui
        setLoading1(true)
        let source = {}
        // React Native has a built in function that can pick images from your phone:
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // We can specify whether we need only Images or Videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
        });
        source = result

        let fileName = result.fileName;
        // Firebase does not support images with the ".heic" format. It is therefore converted to JPG in these cases.
        if (Platform.OS === 'ios' && (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))) {
            source.fileName = `${fileName.split(".")[0]}.JPG`;
        }

        // If no errors occurred when picking an image, the state variable is set.
        if (!result.cancelled) {
            setImage([source.uri, source.fileName]);
        }
        // Picking an image is done, and the activityindicator is turned off.
        setLoading1(false)
    };

    // Uploads an image to the firebase storage database. 
    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image[0], true);
            xhr.send(null);
        })
        // Creates a path in the database, with the name of the image as an ID. (This should probably be changed in the future, to support more unique ID's, to avoid images with the same name)
        const ref = firebase.storage().ref().child(`Pictures/${image[1]}`)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                setUploading(true)
            },
            (error) => {
                setUploading(false)
                console.log(error)
                blob.close()
                return
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false)
                    blob.close()
                    Alert.alert("Din annonce blev gemt! :D")
                    // navigation.navigate('Clothes List')
                    return url
                })
            }
        )
    }

    // Saves all the data (except the image itself) to the realtime database.
    const saveToRealTimeDatabase = (coordinates) => {
        var { Produkt, Pris, Udlejningsperiode, Størrelse, Vaskeanvisninger } = newClothes;

        // To save an advertisement, washing instructions are required. 
        // The following functionality makes sure that these instruction are either on the clothes or described in the "Vaskeanvisninger" section
        if (Vaskeanvisninger === undefined && checked === false) {
            return Alert.alert('Angiv venligst vaskeanvisninger');
        }
        if (checked === true) {
            Vaskeanvisninger = "Har vaskemærke"
        }
        // this try/catch connects to firebase, and saves the data, unless any errors occurred
        try {
            firebase
                .database()
                .ref('/Clothess/')
                .push({ Udlejer: username, Produkt, Pris, Udlejningsperiode, Størrelse, img: image[1], Vaskeanvisninger, longlat: coordinates });
            setNewClothes(initialState)
            setImage([])
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

    }

    // All pages requires the user to be logged in
    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={GlobalStyles.add.text}>Ikke logget ind :(((</Text>
            <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
        </View>;
    }

    return (
        <SafeAreaView style={GlobalStyles.add.container}>
            <ScrollView>
                <View style={GlobalStyles.add.row3}>
                    <Text style={GlobalStyles.add.owner}>Udlejer: </Text>
                    <Text style={{ textAlign: 'center' }}>{username}</Text>
                </View>
                <View style={GlobalStyles.add.row}>
                    <Text style={GlobalStyles.add.owner}>Adresse: </Text>
                    <Text style={{ textAlign: 'center' }}>{address}</Text>
                </View>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style={GlobalStyles.add.row} key={index}>
                                <Text style={GlobalStyles.add.label}>{key}</Text>
                                <TextInput
                                    value={newClothes[key]}
                                    onChangeText={(event) => changeTextInput(key, event)}
                                    style={GlobalStyles.add.input}
                                />
                            </View>
                        )
                    })
                }
                <View style={GlobalStyles.add.row}>
                    <Text style={GlobalStyles.add.label}>Har vaskemærke</Text>
                    <Checkbox style={{ marginLeft: 20 }} value={checked} onValueChange={setChecked} color={'#d9825f'} />
                    <InfoBox text={infoText1}></InfoBox>
                </View>
                {
                    checked ? null :
                        <View>

                            <View style={GlobalStyles.add.row}>
                                <Text style={GlobalStyles.add.label}>Må vaskes?</Text>
                                <Checkbox style={{ marginLeft: 20 }} value={checked2} onValueChange={setChecked2} color={'#d9825f'} />
                            </View>
                            <View>
                                <View style={GlobalStyles.add.row}>
                                    <Text style={{ fontWeight: 'bold' }}>Vaskeanvisninger:</Text>
                                </View>
                                <View style={GlobalStyles.add.row2}>
                                    <TextInput
                                        multiline
                                        maxLength={120}
                                        placeholder={'Fx. "30 grader, må ikke stryges"'}
                                        onChangeText={(event) => changeTextInput("Vaskeanvisninger", event)}
                                        style={GlobalStyles.add.textInput}
                                    />

                                    <InfoBox text={infoText2}></InfoBox>
                                </View>
                            </View>
                        </View>
                }

                {image[0] && <Image source={{ uri: image[0] }} style={GlobalStyles.add.img} />}
                <Pressable style={GlobalStyles.add.button1} onPress={pickImage}>
                    {loading1 ?
                        <ActivityIndicator size={'small'} color={'black'} />
                        :
                        <Text>Select image</Text>
                    }
                </Pressable>

                {!uploading ?
                    <Pressable style={GlobalStyles.add.button2} onPress={() => handleSave()}>
                        <Text>Add clothes</Text>
                    </Pressable>
                    :
                    <ActivityIndicator size={'small'} color={'black'} />}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Clothes