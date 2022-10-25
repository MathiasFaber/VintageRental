import React, { useState } from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../FirebaseConfig'
import { CheckBox } from 'react-native-elements'


// This is the Add/Edit clothes component, that handles new or updated advertisemnts in the app.
function Add_edit_Clothes({ navigation, route }) {
    // initial state is an object of key/value pairs, containing the keys of each prop an advertisement consists of. 
    const initialState = { Produkt: '', Pris: '', Sælger: '', Størrelse: '' }
    // this state is manipulated when an advertisement is created or updated
    const [newClothes, setNewClothes] = useState(initialState);
    const isEditClothes = route.name === "Edit Clothes"
    const [image, setImage] = useState([])
    const [uploading, setUploading] = useState(false)
    const [firebaseUrl, setFirebaseUrl] = useState('')
    const [state, setState] = useState(false)
    const [checked, setChecked] = useState(false)

    // Sets the newClothes state to be equal to the new input from the edit form 
    const changeTextInput = (name, event) => {
        setNewClothes({ ...newClothes, [name]: event });
    }
    // HandleSave is used when saving ypur edited or newly created advertisement. It saves the data to the database. 
    const handleSave = async () => {
        const { Produkt, Pris, Sælger, Størrelse } = newClothes;
        // if one of the input fields are empty: alert it to the user. 
        if (Produkt.length === 0 || Pris.length === 0 || Sælger.length === 0 || Størrelse.length === 0) {
            return Alert.alert('Et af felterne er tomme!');
        }
        // Updates the data in database, if all inputfields are filled out. 

        uploadImage()

        if (isEditClothes) {
            const id = route.params.Clothes[0];
            try {
                firebase
                    .database()
                    .ref(`/Clothess/${id}`)
                    .update({ Produkt, Pris, Sælger, Størrelse, img: image[1] });
                Alert.alert("Din info er nu opdateret");
                // When data is updated, user is navigated to the page of the advertisements, and should be able to see the changes from there. 
                // navigation.navigate("Clothes Details", { Clothes });
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        } else {
            try {
                firebase
                    .database()
                    .ref('/Clothess/')
                    .push({ Produkt, Pris, Sælger, Størrelse, img: image[1] });
                setNewClothes(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    // Camera -> upload photo experiments:
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // We can specify whether we need only Images or Videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
        });

        //console.log(result, 456);

        if (!result.cancelled) {
            setImage([result.uri, result.fileName]);
        }
    };

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
                    setImage([url, image[1], "done"])
                    setFirebaseUrl(url)
                    blob.close()
                    Alert.alert("Din annonce blev gemt! :D")
                    // navigation.navigate('Clothes List')
                    return url
                })
            }
        )
        return firebaseUrl
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newClothes[key]}
                                    onChangeText={(event) => changeTextInput(key, event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                    <CheckBox iconRight={true} style={{backgroundColor:'#fae4dc', color:'#fae4dc'}} onPress={() => { checked ? setChecked(false) : setChecked(true) }} checked={checked} title={'Har vaskemærke?'}/>

                {image[0] && <Image source={{ uri: image[0] }} style={{ width: 340, height: 400, alignSelf: "center" }} />}
                <Button title='Select Image' onPress={pickImage} />
                {!uploading ? <Button title={isEditClothes ? "Save changes" : "Add Clothes"} onPress={() => handleSave()} /> : <ActivityIndicator size={'small'} color='black' />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fae4dc'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    row1: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        fontWeight: 'bold'
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding: 5,
        flex: 1
    },
});

export default Add_edit_Clothes