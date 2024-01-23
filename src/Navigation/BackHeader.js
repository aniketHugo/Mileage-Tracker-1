import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Draw from './Draw';


const BackHeader = () => {

    const handleButton1 = () => {
        console.log('Button 1 pressed');
    };


    const navigation = useNavigation();

    return (
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} >
                    <Image source={require('../assets/BackArrow.png')}></Image>
                </Pressable>
            </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 12,
    },
});

export default BackHeader;
