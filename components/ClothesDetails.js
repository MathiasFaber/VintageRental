import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firebase from 'firebase/compat';
import { useEffect, useState } from "react";
// to have the photo with the clothes details, the photo "name" or potentially ID, should be connected to the details. This should be done by saving the image name/id in the database with the details in order to be able to fetch the photo when fetching the details

const ClothesDetails = ({ route, navigation }) => {
    const [Clothes, setClothes] = useState({});

    useEffect(() => {
        setClothes(route.params.Clothes[1]);
        return () => {
            setClothes({})
        }
    });

    if (!Clothes) {
        return <Text>No data</Text>;
    }
    return (
        <View style={styles.container}>
            <Image
                source={{url:Clothes.imgurl}}
                style={{ width: '97%', height: '50%', alignSelf: "center" }}></Image>
            {
                Object.entries(Clothes).map((item, index) => {
                    // img og imurl fjernes, for ikke at vise dem som skrift på siden. 
                    if(item[0] === 'img' || item[0] === 'imgurl'){
                        delete item[0]
                        delete item[1]
                    }
                    return (
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{item[0]} </Text>
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ClothesDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});