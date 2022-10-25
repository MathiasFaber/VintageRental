import React, { useState } from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Image
} from 'react-native';
import firebase from "firebase/compat";

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [state, setState] = useState(false)

    const handleLogOut = async () => {
        await firebase.auth().signOut();
        alert("Logged out, bye :D")
        if (state == true) {
            setState(false)
        } else {
            setState(true)
        }
    };

    navigation.addListener('focus', () => {
        if (state == true) {
            setState(false)
        } else {
            setState(true)
        }
    }) 
    if (firebase.auth().currentUser !== null) {
        return (
            <View>
                <Text>Already logged in</Text>
                <Button onPress={handleLogOut} title={'Log ud?'}/>
            </View>
        )
    }

 
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
                alert("Logged in succesfully :D")
                navigation.navigate('Min profil')
            });
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const loginButton = () => {
        return <Pressable style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center'
        }} onPress={() => handleSubmit()} title="Log ind">
            <Text>
                Log ind
            </Text>
        </Pressable>
    };

    const signUpButton = () => {
        // lav til pressable for bedre styling
        return <Pressable style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center'
        }} onPress={() => navigation.navigate("Sign Up")} title="Log ind">
            <Text>
                 Ny bruger? Lav en profil her :-D
            </Text>
        </Pressable>
        //<Button onPress={() => navigation.navigate("Sign Up")} title="Ny bruger? Lav en profil her:D"/>;
    };

    return (
        <View style={styles.view}>
            <Image source={require('/Users/mathiasfaberkristiansen/Desktop/expo.nosync/GK2/vr.png')} style={{ width: '90%', height: 270, alignSelf: 'center', borderRadius:25 }}></Image>
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
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {loginButton()}
            <Text>{'\n'}</Text>
            {signUpButton()}
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
        borderRadius: 10
    },
    header: {
        fontSize: 40,
        fontFamily: 'Snell Roundhand',
        alignSelf: 'center'
    },
});

export default Login;