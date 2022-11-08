import React, { useState } from 'react';
import {
    Button, Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import firebase from "firebase/compat";
import { NavigationContainer } from '@react-navigation/native';


function SignUp({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [address, setAddress] = useState('')


    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };

    const handleSubmit = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
            });

            // after creating user, create user in database: https://stackoverflow.com/questions/43509021/how-to-add-username-with-email-and-password-in-firebase
            // experiment, not tested
            firebase.auth().onAuthStateChanged(function (user) {
                console.log(address)
                if (user) {
                    // Updates the user attributes:
                    user.updateProfile({ // <-- Update Method here

                        displayName: username,

                    }).then(function () {

                        // Profile updated successfully!
                        //  "NEW USER NAME"

                        var displayName = user.displayName;

                        console.log(displayName, "displayName")
                    }, function (error) {
                        // An error happened.
                        console.log(error)
                    }).then(function () {
                        var mail = user.email
                        firebase
                            .database()
                            .ref(`/users/`)
                            .push({ username, address, mail });
                    })
                }
            });

            alert(`User created!`)
            navigation.navigate('Min profil')
        } catch (error) {
            setErrorMessage(error.message)
        }

    }

    return (
        <View>
            <Text style={styles.header}>Opret profil</Text>
            <TextInput
                placeholder="Navn"
                value={username}
                onChangeText={(username) => setUsername(username)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Adresse"
                value={address}
                onChangeText={(address) => setAddress(address)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Mail"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Adgangskode"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
});

export default SignUp