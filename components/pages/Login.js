import React, { useState } from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import firebase from "firebase/compat";
import LoginButton from '../buttons/LoginButton';
import SignUpButton from '../buttons/SignUpButton';
import LogOutButton from '../buttons/LogOutButton';

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [state, setState] = useState(false)

    // When page is focused, it updates. 
    navigation.addListener('focus', () => {
        state ? setState(false) : setState(true)
    })

    // If user is logged in already, the logoutbutton is displayed
    if (firebase.auth().currentUser !== null) {
        return (
            <LogOutButton navigation={navigation}></LogOutButton>
        )
    }

    return (
        <ScrollView style={styles.view}>
            <Image source={require('../../assets/vr.png')} style={{ width: '90%', height: 270, alignSelf: 'center', borderRadius: 25 }}></Image>
            <Text>{'\n'}</Text>
            <Text style={styles.header}>Login</Text>
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
            <LoginButton email={email} password={password} navigation={navigation}></LoginButton>
            <SignUpButton email={email} password={password} navigation={navigation}></SignUpButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingTop: '15,5%',
        backgroundColor: '#e2e1de',
        padding: 8,
    },
    text: {
        fontSize: 25,
        alignSelf: 'center',
        padding: 50
    },
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    header: {
        fontSize: 40,
        fontFamily: 'Snell Roundhand',
        alignSelf: 'center'
    }
});

export default Login;