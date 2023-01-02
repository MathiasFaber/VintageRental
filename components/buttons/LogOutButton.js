import React from 'react';
import { Pressable, Text, View, Image } from "react-native";
import firebase from "firebase/compat";
import GlobalStyles from '../../globalStyling/GlobalStyles';

const LogOutButton = ({navigation}) => {

    const handleLogOut = async () => {
        await firebase.auth().signOut();
        alert("Du er nu logget ud, på gensyn! :D")
        navigation.navigate("Clothes List")
    };

    return <View>
        <Image source={require('../../assets/vr.png')} style={GlobalStyles.btn.img}></Image>
        <Text style={GlobalStyles.btn.text}>Du er allerede logget ind :D</Text>
        <Pressable style={GlobalStyles.btn.button} onPress={() => handleLogOut()}>
            <Text>
                Log ud
            </Text>
        </Pressable>
    </View>
};

export default LogOutButton