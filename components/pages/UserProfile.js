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

    // If the user is logged in, data about the user will be displayed
    // When developing further, it would be nice to be see all user details and be able to update these. 
    if (firebase.auth().currentUser !== undefined) {
        return (
            <View style={GlobalStyles.profile.container}>
                <Image source={require('../../assets/mig.jpg')} style={GlobalStyles.profile.img}></Image>
                <Text style={GlobalStyles.profile.text1}>Mathias Faber Kristiansen</Text>
                <Text style={GlobalStyles.profile.text2}>Rating: 5 ud af 5 stjerner</Text>
                <Text>
                     
                    </Text>
                <Text style={GlobalStyles.profile.text2}>Aktive annoncer: 2 </Text>
                <Text>
                     
                     </Text>
                <Pressable style={GlobalStyles.profile.button}>
                    <Text>
                        Se annoncer
                    </Text>
                </Pressable>
                <Text>
                     
                    </Text>
                <Pressable style={GlobalStyles.profile.button}>
                    <Text>
                        Send besked
                    </Text>
                </Pressable>
            </View>
        );
    }
}

export default Profile