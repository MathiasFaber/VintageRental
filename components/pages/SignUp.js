import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    Pressable
} from 'react-native';
import firebase from "firebase/compat";
import GlobalStyles from '../../globalStyling/GlobalStyles';

// This components is used to create users in the app
function SignUp({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [address, setAddress] = useState('')

    const renderButton = () => {
        return <Pressable style={GlobalStyles.signUp.button} onPress={() => handleSubmit()}>
            <Text>
                Opret profil
            </Text>
        </Pressable>;
    };

    const handleSubmit = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
            });

            // after creating user with email and password, additional attributes should be added to the user.
            // This is done here 
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // Updates the user attributes:
                    user.updateProfile({ 
                        displayName: username,
                    })
                        .then(function () {
                            var mail = user.email
                            firebase
                                .database()
                                .ref(`/users/`)
                                .push({ username, address, mail });
                        }), function (error) {
                            // Error handling
                            console.log(error)
                        }
                }
            });
            alert(`Bruger blev oprettet!`)
            navigation.navigate('Clothes List')
        } catch (error) {
            setErrorMessage(error.message)
        }

    }

    return (
        <View>
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
            {errorMessage && (
                <Text style={GlobalStyles.signUp.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

export default SignUp