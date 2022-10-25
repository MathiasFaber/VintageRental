import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import firebase from "firebase/compat";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

function Profile({ navigation }) {
    const [state, setState] = useState(false)

    navigation.addListener('focus', () => {
        if (state == true) {
            setState(false)
        } else {
            setState(true)
        }
    })

    const handleLogOut = async () => {
        await firebase.auth().signOut();
        alert("Logged out, bye :D")
        if (state == true) {
            setState(false)
        } else {
            setState(true)
        }
    };

    // Spørgsmål: jeg kan først se den bruger der er logget ind, når jeg selv laver opdateringer i koden. Why? 
    // siden opdaterer ikke når der navigeres til den, og man kan derfor ikke se om en bruger har logget ind..??
    
    if (!firebase.auth().currentUser) {
        return <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Ikke logget ind :(((</Text>
            <Button onPress={() => navigation.navigate('Login')} title="Log ind?" />
        </View>;
    }

    if (firebase.auth().currentUser !== undefined) {
        return (
            <View style={styles.container} >
                <Image source={require('/Users/mathiasfaberkristiansen/Desktop/expo.nosync/GK2/vr.png')} style={{ width: '90%', height: 250, alignSelf: 'center', borderRadius:25 }}></Image>
                <Text style={{ borderTopWidth: 75, borderBottomWidth: 50, alignSelf: 'center', fontWeight: 'bold' }}>Nuværende bruger: {firebase.auth().currentUser.email}</Text>
                <Text style={{ alignSelf: 'center', fontWeight: '100' }}>"Liste over ting jeg har til salg"</Text>
                <Text style={{ alignSelf: 'center', fontWeight: '100' }}>"Liste over ting jeg har til salg"</Text>
                <Text style={{ borderBottomWidth: 100, alignSelf: 'center', fontWeight: '100' }}>"Liste over ting jeg har til salg"</Text>

                <Pressable style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 20,
                    elevation: 3,
                    backgroundColor: '#fac8b4',
                }} onPress={() => handleLogOut()} title="Log out">
                    <Text>
                        Log ud?
                    </Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#e2e1de',
        padding: 8,
    },
});

export default Profile