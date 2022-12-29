import React from 'react';
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import firebase from "firebase/compat";

const LogOutButton = ({navigation}) => {

    const handleLogOut = async () => {
        await firebase.auth().signOut();
        alert("Du er nu logget ud, på gensyn! :D")
        navigation.navigate("Clothes List")
    };

    return <View style={styles.container}>
        <Image source={require('../../assets/vr.png')} style={{ width: '90%', height: 250, alignSelf: 'center', borderRadius: 25 }}></Image>
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
        }} onPress={() => handleLogOut()}>
            <Text>
                Log ud
            </Text>
        </Pressable>
    </View>
};

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        alignSelf: 'center',
        padding: 50
    },
})

export default LogOutButton