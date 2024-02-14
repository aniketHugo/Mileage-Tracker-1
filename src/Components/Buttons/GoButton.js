import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { GoArrow } from '../../assets/IconsSvg';
import { SvgXml } from 'react-native-svg';
import { PrimaryColor } from '../Theme';

const GoButton = ({ destination, navigation, Heading }) => {
    const handlePress = (destination) => {
        if(destination == "addVehicle")
            navigation.navigate("VehicleStack" , {screen : "addVehicle"});
        else{
         navigation.navigate("RefuelStack" , {screen : destination});
        }
    };

    return (
        <Pressable onPress={() => handlePress(destination)} style={styles.goButtonStyle} >
            <Text style={styles.btnHeading}>
                {Heading}
            </Text>
            <SvgXml xml={GoArrow} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    goButtonStyle: {
        backgroundColor: PrimaryColor,
        padding: 10,
        width: 150,
        color: 'blue',
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnHeading: {
        color: 'white',

    },
});

export default GoButton;
