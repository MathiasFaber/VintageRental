import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';
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
                <Text style={GlobalStyles.textt}>Tillykke! Du har for nyligt lejet et stykke tøj!</Text>
                <Text style={GlobalStyles.textt}>Hvordan vil du vurdere din udlejer?</Text>
                <Text>
                     
                     </Text>
                <Image source={require('../../assets/stars1.png')} style={GlobalStyles.profile.img}></Image>
                <Text>
                     
                     </Text>
                <Pressable style={GlobalStyles.profile.button}>
                    <Text>
                        Send vurdering
                    </Text>
                </Pressable>
                <Text>
                     
                     </Text>
                     <Text>
                     
                     </Text>
                     <Text>
                     
                     </Text>
                     <Text>
                     
                     </Text>
                <Text style={GlobalStyles.profile.text2}>Vi elsker feedback. Skriv gerne herunder, hvis du har kommentarer eller forbedringsforslag :D</Text>
                <Text>
                     
                     </Text>
                <TextInput
                    multiline
                    maxLength={100}
                    placeholder={"Skriv feedback her"}
                    style={GlobalStyles.add.textInput}
                    
                />
                <Text>
                     
                    </Text>
                <Pressable style={GlobalStyles.profile.button}>
                    <Text>
                        Send feedback
                    </Text>
                </Pressable>
            </View>
        );
    }
}

export default Profile