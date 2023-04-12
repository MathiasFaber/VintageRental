import * as React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useEffect, useState } from "react";
import GlobalStyles from '../../globalStyling/GlobalStyles';

// The ClothesDetails component is for displaying one single advertisement. 
const ClothesDetails = ({ route }) => {

    // Whenever an advertisement is clicked from the ClothesList page, the route is sent to this component, and the Clothes state is set to this particular advertisement data in the useEffect. 
    const [Clothes, setClothes] = useState({});

    useEffect(() => {
        const selectedClothing = route.params.Clothes
        selectedClothing[1] == undefined ? setClothes(route.params.Clothes) : setClothes(route.params.Clothes[1]);
        return () => {
            setClothes({})
        }
    });

    // If something goes wrong, and there are no data sent to the component, "no data" will be displayed
    if (!Clothes) {
        return <Text>No data</Text>;
    }

    // returns the info about the advertisement
    return (
        <View style={GlobalStyles.details.container}>
            <Image
                source={{ url: Clothes.imgurl }}
                style={GlobalStyles.details.img}></Image>
            {
                Object.entries(Clothes).map((item, index) => {
                    // img, imgurl, koordinater og vaskeanvisnigner fjernes, for ikke at vise dem som skrift på siden. 
                    if (item[0] === 'img' || item[0] === 'imgurl' || item[0] === 'longlat' || item[0] === 'Vaskeanvisninger') {
                        delete item[0]
                        delete item[1]
                    }
                    return (
                        <View style={GlobalStyles.details.row} key={index}>
                            <Text style={GlobalStyles.details.label}>{item[0]} </Text>
                            <Text style={GlobalStyles.details.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
            <Pressable style={GlobalStyles.details.button} onPress={() => console.log('Button pressed')}>
                <Text>
                    Kontakt udlejer
                </Text>
            </Pressable>
        </View>
    );
}

export default ClothesDetails;