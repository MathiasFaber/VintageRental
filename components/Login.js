import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Image,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import firebase from "firebase/compat";

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [state, setState] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogOut = async () => {
        await firebase.auth().signOut();
        alert("Du er nu logget ud, på gensyn! :D")
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
            <View style={styles.container}>
                <Image source={require('../assets/vr.png')} style={{ width: '90%', height: 250, alignSelf: 'center', borderRadius: 25 }}></Image>
                <Text style={styles.text}>Du er allerede logget ind :D</Text>
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 20,
                    elevation: 3,
                    backgroundColor: '#fac8b4',
                    width: '96%',
                    alignSelf: 'center'
                }} onPress={() => handleLogOut()} title="Log ind">
                    <Text>
                        Log ud
                    </Text>
                </Pressable>
            </View>
        )
    }


    const handleSubmit = async () => {
        setLoading(true)
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
                alert("Logged in succesfully :D")
                navigation.navigate('Clothes List')
            });
            setLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false)
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
        }} onPress={() => handleSubmit()}>
            {loading ?
                <ActivityIndicator size={'small'} color={'black'}></ActivityIndicator>
                : <Text>
                    Log ind
                </Text>}

        </Pressable>
    };

    const signUpButton = () => {
        return <Pressable style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center',
            marginBottom: 350
        }} onPress={() => navigation.navigate("Sign Up")} title="Log ind">
            <Text>
                Ny bruger? Lav en profil her :-D
            </Text>
        </Pressable>
    };

    return (
        <ScrollView style={styles.view}>
            <Image source={require('../assets/vr.png')} style={{ width: '90%', height: 270, alignSelf: 'center', borderRadius: 25 }}></Image>
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