import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import firebase from "firebase/compat";


function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };

    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
            });
            alert(`User created!`)
        } catch (error){
            setErrorMessage(error.message)
        }

    }

    return (
        <View>
            <Text style={styles.header}>Opret profil</Text>
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