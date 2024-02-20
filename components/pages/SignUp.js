import React, { useState } from 'react';
import {
    Text,
    ScrollView,
    TextInput,
    ActivityIndicator,
    Image
} from 'react-native';
import firebase from "firebase/compat";
import GlobalStyles from '../../globalStyling/GlobalStyles';
import * as ImagePicker from 'expo-image-picker'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


// This components is used to create users in the app
function SignUp({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const renderButton = () => {
        return (
            <Pressable style={GlobalStyles.signUp.button} onPress={() => handleSubmit()}>
                {
                    loading2 ? <ActivityIndicator size={'small'} color={'black'}></ActivityIndicator> :
                        <Text>
                            Opret profil
                        </Text>
                }
            </Pressable>
        )
    };

    const pickImage = async () => {
        // SetLoading is used to show an activityindicator in the ui
        setLoading(true)
        let source = {}
        // React Native has a built in function that can pick images from your phone:
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // We can specify whether we need only Images or Videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,   // 0 means compress for small size, 1 means compress for maximum quality
        });
        source = result

        let fileName
        if (result.fileName === null) {
            fileName = result.uri.split("/").pop();
        } else {
            fileName = result.fileName;
        }
        // Firebase does not support images with the ".heic" format. It is therefore converted to JPG in these cases.
        if (Platform.OS === 'ios' && (fileName?.endsWith('.heic') || fileName?.endsWith('.HEIC'))) {
            source.fileName = `${fileName.split(".")[0]}.JPG`;
        }

        // If no errors occurred when picking an image, the state variable is set.
        if (!result.cancelled) {
            setImage([source.uri, fileName]);
        }
        // Picking an image is done, and the activityindicator is turned off.
        setLoading(false)
    };

    const handleSubmit = async () => {
        setLoading2(true)
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then(async () => {
                await firebase.auth().signInWithEmailAndPassword(email, password).then(async (x) => {
                    const id = x.user.uid
                    const mail = x.user.email
                    try {
                        const response = await fetch(image[0]);
                        const blob = await response.blob();

                        const ref = firebase.storage().ref().child(`pictures/users/${image[1]}`);
                        const snapshot = await ref.put(blob);

                        snapshot.ref.getDownloadURL().then(async (url) => {
                            try {
                                await firebase.database().ref(`/users/`).push({ id, username, address, mail, img: url });
                            } catch (error) {
                                console.log(`Error: ${error.message}`);
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        return null;
                    }
                })
            });
            alert(`Bruger blev oprettet!`)
            navigation.navigate('Clothes List')
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message)
        }
        setLoading2(false)
    }

    return (
        <ScrollView>
            <Text style={GlobalStyles.signUp.header}>Opret profil</Text>
            <TextInput
                placeholder="Navn"
                value={username}
                onChangeText={(username) => setUsername(username)}
                style={GlobalStyles.signUp.inputField}
            />
            <TextInput
                placeholder="Adresse"
                value={address}
                onChangeText={(address) => setAddress(address)}
                style={GlobalStyles.signUp.inputField}
            />
            <TextInput
                placeholder="Mail"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={GlobalStyles.signUp.inputField}
            />
            <TextInput
                placeholder="Adgangskode"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={GlobalStyles.signUp.inputField}
            />
            {image[0] && <Image source={{ uri: image[0] }} style={GlobalStyles.add.img} />}
            <Pressable style={GlobalStyles.add.button1} onPress={pickImage}>
                {loading ?
                    <ActivityIndicator size={'small'} color={'black'} />
                    :
                    <Text>Select image</Text>
                }
            </Pressable>
            {errorMessage && (
                <Text style={GlobalStyles.signUp.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </ScrollView>
    );
}

export default SignUp