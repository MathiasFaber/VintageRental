import React, { useState } from 'react';
import { Pressable, ActivityIndicator, Text, View } from "react-native";
import firebase from "firebase/compat";

const LoginButton = ({
    navigation,
    email,
    password
}) => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
                alert("Logged in succesfully :D")
                navigation.navigate('Min profil')
            });
            setLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false)
        }
    }
    return (
        <View>
            {errorMessage && (
                <Text>Error: {errorMessage}</Text>
            )}
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
                marginBottom: 10
            }} onPress={() => handleSubmit()}>
                {loading ?
                    <ActivityIndicator size={'small'} color={'black'}></ActivityIndicator>
                    : <Text>
                        Log ind
                    </Text>}

            </Pressable>
        </View>

    )
};

export default LoginButton