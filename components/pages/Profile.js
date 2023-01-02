import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import firebase from "firebase/compat";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import GlobalStyles from '../../globalStyling/GlobalStyles';

function Profile({ navigation }) {
    const [state, setState] = useState(false)

    // Updates on focus
    navigation.addListener('focus', () => {
        state ? setState(false) : setState(true)
    })

    // Logs out the user by calling the firebase authentication function "signOut()"
    const handleLogOut = async () => {
        await firebase.auth().signOut();
        alert("Du er nu logget ud, på gensyn! :D")
        if (state == true) {
            setState(false)
        } else {
            setState(true)
        }
    };

    // Checks if the user is logged in
    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={GlobalStyles.profile.text}>Ikke logget ind :(((</Text>
            <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
        </View>;
    }

    // If the user is logged in, data about the user will be displayed
    // When developing further, it would be nice to be see all user details and be able to update these. 
    if (firebase.auth().currentUser !== undefined) {
        return (
            <View style={GlobalStyles.profile.container}>
                <Image source={require('../../assets/vr.png')} style={GlobalStyles.profile.img}></Image>
                <Text style={GlobalStyles.profile.text1}>Nuværende bruger: {firebase.auth().currentUser.email}</Text>
                <Text style={GlobalStyles.profile.text2}>"Liste over ting jeg har til salg"</Text>
                <Text style={GlobalStyles.profile.text2}>"Liste over ting jeg har til salg"</Text>
                <Text style={GlobalStyles.profile.text3}>"Liste over ting jeg har til salg"</Text>

                <Pressable style={GlobalStyles.profile.button} onPress={() => handleLogOut()} title="Log out">
                    <Text>
                        Log ud?
                    </Text>
                </Pressable>
            </View>
        );
    }
}

export default Profile