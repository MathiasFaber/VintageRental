import * as React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from "expo-location";
import { useState, useEffect } from "react";

function Map({ route, navigation }) {
    const [selectedCoordinate, setSelectedCoordinate] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [initialRegion, setInitialRegion] = useState(null)

    navigation.addListener('focus', () => {
        if (initialRegion == null) {
            // initialRegion specifies where the map should be focused on to begin with. These coordinates show Copenhagen, as this is the area the innovation will operate in
            setInitialRegion({
                latitude: 55.676098,
                longitude: 12.568337,
                latitudeDelta: 0.0952,
                longitudeDelta: 0.1129
            })
        }
    })

    // For first time users, permission to the users location is asked.
    const getLocationPermission = async () => {
        await Location.requestForegroundPermissionsAsync()

    };

    // Location permission is asked when page is loaded.
    useEffect(() => {
        getLocationPermission()
    });

    // closeAdvertisement closes sets the states to null, which causes the advertisement pop up to close. 
    const closeAdvertisement = () =>
        setSelectedCoordinate(null) && setSelectedAddress(null)

    // Is used for navigating to ClothesDetails page, when an advertisement is created. 
    const handleSelectClothes = (index, obj) => {
        navigation.navigate('Clothes Details', { Clothes: obj });
    }

    // This variable is used to loop through all advertisements, when displaying them on the page.
    const ClothesArray = Object.values(route.params);


    return (
        <View style={styles.container}>
            <Text style={styles.text1}>
                VintageRental
            </Text>
            <MapView
                provider="google"
                style={styles.map}
                showsUserLocation
                region={initialRegion}
            >

                {ClothesArray.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.longlat}
                    >
                        <Callout
                            onPress={() => handleSelectClothes(index, marker)}
                        >
                            <Text>
                                {marker.Produkt}
                                {'\n'}
                                {marker.Pris}
                            </Text>
                            <Image
                                source={{ url: marker.imgurl }}
                                style={{ width: 250, height: 200, alignSelf: 'center' }}
                            >

                            </Image>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {
                selectedCoordinate && selectedAddress && (
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                        </Text>
                        <Text style={styles.infoText}>
                            name: {selectedAddress[0].name}  region: {selectedAddress[0].region}
                        </Text>
                        <Button title="close" onPress={closeAdvertisement} />
                    </View>
                )
            }
        </View >
    );
}


//Lokal styling til brug i map.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 0,
        height: '100%',
        width: '100%'
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Snell Roundhand',
        borderWidth: 3,
        borderColor: 'transparent',
        borderBottomWidth: 8,
        backgroundColor: '#d9825f',
    },
    map: { flex: 1 },
    infoBox: {
        height: 200,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    infoText: {
        fontSize: 15,
    },
});
export default Map