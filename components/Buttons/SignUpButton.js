import React from 'react';
import { Pressable, Text } from "react-native";
import GlobalStyles from '../../globalStyling/GlobalStyles';

const SignUpButton = ({
    navigation
}) => {
    return <Pressable style={GlobalStyles.signUp.button2} onPress={() => navigation.navigate("Sign Up")} title="Log ind">
        <Text>
            Opret profil
        </Text>
    </Pressable>
};

export default SignUpButton