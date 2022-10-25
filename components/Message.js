import React, {useEffect, useState} from 'react';
import {Button,Text,
    View,
    StyleSheet,
} from 'react-native';
import firebase from "firebase/compat";

function Message({navigation}) {

    const [Clothess,setClothess] = useState();

    useEffect(() => {
        if(!Clothess){
            firebase
            .database()
            .ref('/Clothess')
            .on('value', snapshot => {
                setClothess(snapshot.val())
    });
        }
    }, []
    )
    if (!Clothess){
        return <Text>Loading...</Text>
    }

    const handleSelectClothes = id => {
        const Clothes = Object.entries(Clothess).find( Clothes => Clothes[0] === id)
        navigation.navigate('Clothes Details', { Clothes });
    }

    const ClothesArray = Object.values(Clothess); 
    const ClothesKeys = Object.keys(Clothess);


    return (
        <View>
            <Text>Send Beskeder her *todo*</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});

export default Message