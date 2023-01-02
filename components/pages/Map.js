import * as React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from "expo-location";
import { useState, useEffect } from "react";
import GlobalStyles from '../../globalStyling/GlobalStyles';

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
        <View style={GlobalStyles.map.container}>
            <Text style={GlobalStyles.map.text1}>
                VintageRental
            </Text>
            <MapView
                provider="google"
                style={GlobalStyles.map.map}
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
                                style={GlobalStyles.map.img}
                            >

                            </Image>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {
                selectedCoordinate && selectedAddress && (
                    <View style={GlobalStyles.map.infoBox}>
                        <Text style={GlobalStyles.map.infoText}>
                            {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                        </Text>
                        <Text style={GlobalStyles.map.infoText}>
                            name: {selectedAddress[0].name}  region: {selectedAddress[0].region}
                        </Text>
                        <Button title="close" onPress={closeAdvertisement} />
                    </View>
                )
            }
        </View >
    );
}

export default Map