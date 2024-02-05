import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BackHeader = () => {


    const navigation = useNavigation();

    return (
        <View style={styles.header1}>
            <Pressable onPress={() => navigation.goBack()} >
                <Image source={require('../assets/BackArrow2.png')} style={styles.back}></Image>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header1: {
        paddingVertical: 12,
    },
    back : {
        marginHorizontal : 10,
    }
});

export default BackHeader;
