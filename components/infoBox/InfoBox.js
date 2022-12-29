import React, { useState } from 'react';
import {
    Text,
    View,
    Alert,
    Modal,
    StyleSheet
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const InfoBox = (text) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (

        <View style={styles.centeredView1}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView1}>
                    <View style={styles.modalView1}>
                        <Text style={styles.modalText1}>
                            {text.text}
                        </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Forstået! :D</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>?</Text>
            </Pressable>
        </View>

    )
}


const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fae4dc'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        maxHeight: 100
    },
    row1: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        fontWeight: 'bold'
    },
    row2: {
        flexDirection: 'row',
        height: 55,
        margin: 10,
    },
    row3: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        marginTop: 25
    },
    label: {
        fontWeight: 'bold',
        width: 130
    },
    input: {
        borderWidth: 1,
        padding: 5,
        flex: 1
    },
    owner: {
        fontWeight: 'bold',
        width: 110,
        flexDirection: 'row',
        marginRight: '5%',

    },
    textBoxButton: {
        position: 'absolute',
        right: 20,
        zIndex: 100,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        elevation: 2,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: "#fac8b4",
        zIndex: 100,
        width: 35,
        height: 35,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    buttonClose: {
        backgroundColor: "#fac8b4",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    centeredView1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "left",
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 10
    },
    modalView1: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText1: {
        marginBottom: 15,
        textAlign: "center"
    },
});


export default InfoBox