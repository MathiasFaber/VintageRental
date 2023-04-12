import { StyleSheet } from "react-native";


const GlobalStyles = StyleSheet.create({
    textt: {
        alignItems: "center",
        alignSelf: "center",
        fontSize: 17,
        fontWeight: "bold"
    },
// styling for loginpage
    login: {
        loginImage: {
            width: '90%', height: 270, alignSelf: 'center', borderRadius: 25
        },
        inputField: {
            borderWidth: 1,
            margin: 10,
            padding: 10,
            borderRadius: 10
        },
        loginHeader: {
            fontSize: 40,
            fontFamily: 'Snell Roundhand',
            alignSelf: 'center'
        }
    },
    // styling for add advertisement page
    add: {
        text: {
            textAlign: 'center',
            fontSize: 20
        },
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
        textInput: {
            borderWidth: 1,
            padding: 5,
            height: 75
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
        button1: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center',
            marginBottom: 15,
            marginTop: 5,
        },
        button2: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center',
            marginBottom: 100
        },
        img: {
            width: 340,
            height: 400,
            alignSelf: "center",
            margin: 10
        }
    },
    // styling for the detailed advertisemetn page
    details: {
        container: { flex: 1, justifyContent: 'flex-start' },
        row: {
            margin: 5,
            padding: 5,
            flexDirection: 'row',
        },
        label: { width: 150, fontWeight: 'bold' },
        value: { flex: 1 },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center'
        },
        img: {
            width: '97%', height: '50%', alignSelf: "center"
        }
    },
    // styling for the liost of advertisements page
    list: {
        view: {
            backgroundColor: '#d9825f',
            height: '100%',
            width: '100%',
        },
        container: {
            flex: 1,
            borderWidth: 2,
            borderRadius: 25,
            margin: 5,
            padding: 5,
            height: 475,
            justifyContent: 'center',
            backgroundColor: '#fac8b4'
        },
        label: { fontWeight: 'bold' },
        text1: {
            fontWeight: 'bold',
            fontSize: 35,
            textAlign: 'left',
            fontFamily: 'Snell Roundhand',
            borderWidth: 3,
            borderColor: 'transparent',
            borderBottomWidth: 8,
            backgroundColor: 'transparent',
            marginLeft: '22%'
        },
        text2: {
            textAlign: 'center'

        },
        text3: {
            textAlign: 'center',
            borderLeftWidth: 20,
            borderColor: "transparent",
            fontWeight: "bold"
        },
        text4: {
            textAlign: 'left',
            borderLeftWidth: 20,
            borderColor: "transparent",
        },
        BigButtonContainer: {
            flex: 1,
            flexDirection: 'row',
        },
        buttonContainer: {
            flex: 1,
        },
        text: {
            textAlign: 'center', fontSize: 20
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: 40,
            marginLeft: '10%',
            height: 40,
            marginTop: 10
        },
        img: {
            width: '90%', height: 300, alignSelf: 'center'
        }
    },
    // styling for the map page
    map: {
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
        img: {
            width: 250,
            height: 200,
            alignSelf: 'center'
        }
    },
    // styling for the profile page
    profile: {
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: '5%',
            backgroundColor: '#e2e1de',
            padding: 8,
        },
        text: {
            textAlign: 'center', fontSize: 20
        },
        img: {
            width: '80%', height: '8%', alignSelf: 'center'
        },
        text1: {
            borderTopWidth: 75, borderBottomWidth: 55, alignSelf: 'center', fontWeight: 'bold'
        },
        text2: {
            alignSelf: 'center', fontWeight: '100'
        },
        text3: {
            borderBottomWidth: 100, alignSelf: 'center', fontWeight: '100'
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
        }
    },
    // styling for the sign up page
    signUp: {
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center'
        },
        button2: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center',
            marginBottom: 350
        },
        error: {
            color: 'red',
        },
        inputField: {
            borderWidth: 1,
            margin: 10,
            padding: 10,
        },
        header: {
            fontSize: 40,
        },
    },
    // styling for the infoboxes on the add advertisements page
    infoBox: {
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
    },
    // styling for buttons
    btn: {
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: '#fac8b4',
            width: '96%',
            alignSelf: 'center',
            marginBottom: 10
        },
        img: {
            width: '90%', height: 250, alignSelf: 'center', borderRadius: 25
        },
        text: {
            fontSize: 25,
            alignSelf: 'center',
            padding: 50
        },
    }
})

export default GlobalStyles