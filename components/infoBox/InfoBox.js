import React, { useState } from 'react';
import {
    Text,
    View,
    Alert,
    Modal,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import GlobalStyles from '../../globalStyling/GlobalStyles';

// The infobox component is used in the "add-clothes" component to show a pop-up infobox when creating an advertisement.
const InfoBox = (text) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={GlobalStyles.infoBox.centeredView1}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={GlobalStyles.infoBox.centeredView1}>
                    <View style={GlobalStyles.infoBox.modalView1}>
                        <Text style={GlobalStyles.infoBox.modalText1}>
                            {text.text}
                        </Text>
                        <Pressable
                            style={[GlobalStyles.infoBox.button, GlobalStyles.infoBox.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={GlobalStyles.infoBox.textStyle}>Forstået! :D</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[GlobalStyles.infoBox.button, GlobalStyles.infoBox.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={GlobalStyles.infoBox.textStyle}>?</Text>
            </Pressable>
        </View>
    )
}

export default InfoBox