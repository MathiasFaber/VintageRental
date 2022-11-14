import * as React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from "expo-location";
import { useState, useEffect } from "react";

function Map({ route, navigation }) {

    //Her instantieres alle anvendte statevariabler
    const [hasLocationPermission, setlocationPermission] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [selectedCoordinate, setSelectedCoordinate] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [mapOrList, setMapOrList] = useState(['Map'])

    /*
    * getLocationPermission udnytter den prædefinerede asynkrone metode requestForegroundPermissionsAsync,
    * som aktiverer en forespørgsel om tilladelse til at benytte enhedens position
    * resultatet af denne handling leveres og benyttes til at sætte værdien af locationPermission
    * Værdien sættes pba. af værdien item.granted
    * Læs mere i dokumentationen:  https://docs.expo.dev/versions/latest/sdk/location/
    */
    const getLocationPermission = async () => {
        await Location.requestForegroundPermissionsAsync().then((item) => {
            setlocationPermission(item.granted)
        });

    };

    // I useEffect kaldes getlocationPermission, der sikrer at enheden forespørger tilladelse
    // så snart mapen kører
    useEffect(() => {
        const response = getLocationPermission()
    });

    /*
    * Metoden updateLocation udnytter det prædefinerede asynkrone kald, getCurrentPositionAsync, returnerer enhedens aktuelle position
    * Resultatet fra kaldet benyttes til at fastsætte værdien af currentlokation.
    * argumentet, Accuracy.Balanced, angiver den nøjagtighed vi ønsker skal bruges til at angive positionen.
    * Læs mere på den førnævnte dokumentation
      */
    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({ accuracy: Accuracy.Balanced }).then((item) => {
            setCurrentLocation(item.coords)
        });
    };

    /*
  * Metoden handleSelectMarker tager en koordinat med som argument. Kordinaten bruges
  * til at sætte værdien af selectedCoordinat-variablen
  * Dernæst aktiveres et asynkront kald, i form af den prædefinerede metode, reverseGeocodeAsync.
  * reverseGeocodeAsync omsætter koordinatsættet til en række data, herunder område- og adresse data.
  * selectedAdress sættes til at være resultatet af det asynkrone kald
  */
    const handleSelectMarker = async coordinate => {
        setSelectedCoordinate(coordinate)

        await Location.reverseGeocodeAsync(coordinate).then((data) => {
            setSelectedAddress(data)
        }
        )
    };


    //Metoden closeInfoBox nulstiller værdienne fro selectedAddress og selectedCoordinate
    const closeInfoBox = () =>
        setSelectedCoordinate(null) && setSelectedAddress(null)


    const handleSelectClothes = (index, obj) => {
        navigation.navigate('Clothes Details', { Clothes: obj });
    }


    const ClothesArray = Object.values(route.params);
    const ClothesKeys = Object.keys(route.params);

    //Slutteligt benyttes SafeAreaView der sikrer at indholdet ikke overskrider grænser for enheden(Kun for IOS enheder version 11 eller nyere )
    /*
    * Dernæst kaldes RenderCurrenokation view
    * Mapview er fremviser et kort, der viser brugerens lokation
    * Dernæst aktiverer metoden handleLongPress igennem onLongPress
    * I Mapview vises tre markører ud fra vilkårlige koordinatsæt. Hver markør får en titel og en beskrivelse
    * Derudover vil alle koordinatsæt i userMarkerCoordinates blive vist som markører på kortet.
    * For hver af markørerne vil metoden handleSelectMarker blive aktiveret ved onPress,
    * hvorved selectedCoordinate og selectedAddres får en værdi og der udskrives data om den vaælgte markør
    *
    */
    {
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>
                    VintageRental
                </Text>
                <MapView
                    provider="google"
                    style={styles.map}
                    showsUserLocation
                    region={{
                        latitude: 55.676098,
                        longitude: 12.568337,
                        latitudeDelta: 0.0952,
                        longitudeDelta: 0.1129 
                    }}
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
                            <Button title="close" onPress={closeInfoBox} />
                        </View>
                    )
                }
            </View >
        );
    }
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