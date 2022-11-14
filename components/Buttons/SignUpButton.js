import React from 'react';
import { Pressable, Text } from "react-native";

const SignUpButton = ({
    navigation
}) => {
    return <Pressable style={{
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
    }} onPress={() => navigation.navigate("Sign Up")} title="Log ind">
        <Text>
            Opret profil
        </Text>
    </Pressable>
};

export default SignUpButton