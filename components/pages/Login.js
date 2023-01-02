import React, { useState } from 'react';
import {
    Text,
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import firebase from "firebase/compat";
import LoginButton from '../Buttons/LoginButton';
import SignUpButton from '../Buttons/SignUpButton';
import LogOutButton from '../Buttons/LogOutButton';
import GlobalStyles from '../../globalStyling/GlobalStyles';

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
        <ScrollView>
            <Image source={require('../../assets/vr.png')} style={GlobalStyles.login.loginImage}></Image>
            <Text>{'\n'}</Text>
            <Text style={GlobalStyles.login.loginHeader}>Login</Text>
            <TextInput
                placeholder="Mail"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={GlobalStyles.login.inputField}
            />
            <TextInput
                placeholder="Adgangskode"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={GlobalStyles.login.inputField}
            />
            <LoginButton email={email} password={password} navigation={navigation}></LoginButton>
            <SignUpButton email={email} password={password} navigation={navigation}></SignUpButton>
        </ScrollView>
    );
}

export default Login;