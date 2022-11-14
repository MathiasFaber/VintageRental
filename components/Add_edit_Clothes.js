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
    ActivityIndicator,
    TouchableOpacity,
    Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../FirebaseConfig'
import Checkbox from 'expo-checkbox';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as Location from 'expo-location';
import { Accuracy } from "expo-location";

// This is the Add/Edit clothes component, that handles new or updated advertisemnts in the app.
function Add_edit_Clothes({ navigation, route }) {
    // initial state is an object of key/value pairs, containing the keys of each prop an advertisement consists of. 
    const initialState = { Produkt: '', Pris: '', Udlejningsperiode: '', Størrelse: '' }
    // The NewClothes state is manipulated when an advertisement is created or updated. It contains the initialstate, which will be updated to have the values of each key when an advertisement is created. 
    const [newClothes, setNewClothes] = useState(initialState);
    const isEditClothes = route.name === "Edit Clothes"
    const [image, setImage] = useState([])
    const [uploading, setUploading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [firebaseUrl, setFirebaseUrl] = useState('')
    const [checked, setChecked] = useState(true)
    const [checked2, setChecked2] = useState(true)

    const [username, setUsername] = useState('')
    const [address, setAddress] = useState('')

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);


    navigation.addListener('focus', () => {
        if (firebase.auth().currentUser?.displayName === null) {
            return <View>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Ikke logget ind :(((</Text>
                <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
            </View>;
        } else {
            const user = firebase.auth().currentUser
            const mail = user.email
            var ref = firebase.database().ref(`/users`)
            ref.orderByChild("mail").equalTo(mail).on('value', snapshot => {
                const value = snapshot.val()
                const lol = Object.values(value)
                setAddress(lol[0].address)
                setUsername(lol[0].username)
            })
        }
    })

    const updateLocation = async () => {
        var coordinates;
        await Location.getCurrentPositionAsync({ accuracy: Accuracy.Balanced }).then((item) => {
            console.log(item.coords)
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
        var { Produkt, Pris, Udlejningsperiode, Størrelse, Vaskeanvisninger } = newClothes;
        // if one of the input fields are empty: alert it to the user. 
        if (Produkt.length === 0 || Pris.length === 0 || Udlejningsperiode.length === 0 || Størrelse.length === 0) {
            return Alert.alert('Et af felterne er tomme!');
        }
        // Updates the data in database, if all inputfields are filled out. 

        const hej = await uploadImage()
        console.log(hej, "firebaseurls")
        const coordinates = await updateLocation()
        saveToRealTimeDatabase(coordinates)
    };

    // Camera -> upload photo
    const pickImage = async () => {
        let source = {}
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // We can specify whether we need only Images or Videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
        });
        source = result

        let fileName = result.fileName;
        console.log(fileName, "filename")
        if (Platform.OS === 'ios' && (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))) {
            source.fileName = `${fileName.split(".")[0]}.JPG`;
        }

        if (!result.cancelled) {
            setImage([source.uri, source.fileName]);
        }
        console.log(source, 456);
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


    const saveToRealTimeDatabase = (coordinates) => {
        var { Produkt, Pris, Udlejningsperiode, Størrelse, Vaskeanvisninger } = newClothes;
        if (Vaskeanvisninger === undefined && checked === false) {
            return Alert.alert('Angiv venligst vaskeanvisninger');
        }
        if (checked === true) {
            Vaskeanvisninger = "Har vaskemærke"
        }
        if (isEditClothes) {
            const id = route.params.Clothes[0];
            try {
                firebase
                    .database()
                    .ref(`/Clothess/${id}`)
                    .update({ Udlejer: username, Produkt, Pris, Udlejningsperiode, Størrelse, img: image[1], Vaskeanvisninger, longlat: coordinates });
                Alert.alert("Din info er nu opdateret");
                setImage([])
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
                    .push({ Udlejer: username, Produkt, Pris, Udlejningsperiode, Størrelse, img: image[1], Vaskeanvisninger, longlat: coordinates });
                setNewClothes(initialState)
                setImage([])
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    }



    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Ikke logget ind :(((</Text>
            <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
        </View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.row3}>
                    <Text style={styles.owner}>Udlejer: </Text>
                    <Text style={{ textAlign: 'center' }}>{username}</Text>
                </View>
                <View style={styles.row}>

                    <Text style={styles.owner}>Adresse: </Text>
                    <Text style={{ textAlign: 'center' }}>{address}</Text>
                </View>
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
                <View style={styles.row}>
                    <Text style={styles.label}>Har vaskemærke</Text>
                    <Checkbox style={{ marginLeft: 20 }} value={checked} onValueChange={setChecked} color={'#d9825f'} />
                    <View style={styles.centeredView1}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView1}>
                                <View style={styles.modalView1}>
                                    <Text style={styles.modalText1}>
                                        Angiv om det udlejede tøj har et vaskemærke her.
                                        Forskelligt tøj kan have forskellige vaskeanvisninger, og det
                                        er meget vigtigt at få angivet de rigtige vaskeanvisninger,
                                        så vores renserier kan vaske eller rense tøjet korrekt.
                                        Såfremt der hverken fremgår vaskemærke eller er opgivet
                                        vaskeanvisning, vil tøjet blive sent retur inden udlejning,
                                        og udlejer er ansvarlig for at handlen ikke gennemføres,
                                        grundet mangel på vaskeanvisnigner.
                                    </Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Forstået! :D</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.textStyle}>?</Text>
                        </Pressable>
                    </View>
                </View>
                {
                    checked ? null :
                        <View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Må vaskes?</Text>
                                <Checkbox style={{ marginLeft: 20 }} value={checked2} onValueChange={setChecked2} color={'#d9825f'} />
                            </View>
                            <View>
                                <View style={styles.row}>
                                    <Text style={{ fontWeight: 'bold' }}>Vaskeanvisninger:</Text>
                                </View>
                                <View style={styles.row2}>
                                    <TextInput
                                        multiline
                                        maxLength={120}
                                        placeholder={'Fx. "30 grader, må ikke stryges"'}
                                        onChangeText={(event) => changeTextInput("Vaskeanvisninger", event)}
                                        style={{
                                            borderWidth: 1,
                                            padding: 5,
                                            flex: 6,
                                            marginLeft: 10,
                                        }}
                                    />
                                    <View style={styles.centeredView}>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible1}
                                            onRequestClose={() => {
                                                Alert.alert("Modal has been closed.");
                                                setModalVisible1(!modalVisible1);
                                            }}
                                        >
                                            <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                                                    <Text style={styles.modalText}>
                                                        Vaskeanvisninger omfatter:
                                                        {'\n'}
                                                        {'\n'}
                                                        hvor mange grader tøjet må vaskes ved,
                                                        {'\n'}
                                                        om det må stryges,
                                                        {'\n'}
                                                        om det må renses,
                                                        {'\n'}
                                                        om det må tørretumbles og
                                                        {'\n'}
                                                        eventuelle yderligere vaskeanvisninger.
                                                    </Text>
                                                    <Pressable
                                                        style={[styles.button, styles.buttonClose]}
                                                        onPress={() => setModalVisible1(!modalVisible1)}
                                                    >
                                                        <Text style={styles.textStyle}>Forstået! :D</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </Modal>
                                        <Pressable
                                            style={[styles.button, styles.buttonOpen]}
                                            onPress={() => setModalVisible1(true)}
                                        >
                                            <Text style={styles.textStyle}>?</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>

                }

                {image[0] && <Image source={{ uri: image[0] }} style={{ width: 340, height: 400, alignSelf: "center", margin: 10 }} />}
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 20,
                    elevation: 3,
                    backgroundColor: '#fac8b4',
                    width: '96%',
                    alignSelf: 'center',
                    marginBottom: 15,
                    marginTop: 5,
                }} onPress={pickImage}>
                    {loading1 ?
                        <ActivityIndicator size={'small'} color={'black'} />
                        :
                        <Text>Select image</Text>
                    }
                </Pressable>

                {!uploading ?
                    <Pressable style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 32,
                        borderRadius: 20,
                        elevation: 3,
                        backgroundColor: '#fac8b4',
                        width: '96%',
                        alignSelf: 'center',
                        marginBottom: 100
                    }} onPress={() => handleSave()}>
                        {
                            isEditClothes ? <Text>Save changes</Text> : <Text>Add clothes</Text>
                        }
                    </Pressable>
                    :
                    <ActivityIndicator size={'small'} color={'black'} />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fae4dc'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        maxHeight: 100
    },
    row1: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        fontWeight: 'bold'
    },
    row2: {
        flexDirection: 'row',
        height: 55,
        margin: 10,
    },
    row3: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        marginTop: 25
    },
    label: {
        fontWeight: 'bold',
        width: 130
    },
    input: {
        borderWidth: 1,
        padding: 5,
        flex: 1
    },
    owner: {
        fontWeight: 'bold',
        width: 110,
        flexDirection: 'row',
        marginRight: '5%',

    },
    textBoxButton: {
        position: 'absolute',
        right: 20,
        zIndex: 100,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        elevation: 2,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: "#fac8b4",
        zIndex: 100,
        width: 35,
        height: 35,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    buttonClose: {
        backgroundColor: "#fac8b4",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    centeredView1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "left",
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 10
    },
    modalView1: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText1: {
        marginBottom: 15,
        textAlign: "center"
    },
});

export default Add_edit_Clothes