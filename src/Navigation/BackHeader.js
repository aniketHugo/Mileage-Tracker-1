import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { BlackBackArrow, WhiteBackArrow } from '../assets/IconsSvg';


const BackHeader = () => {


    const navigation = useNavigation();

    return (
        <View style={styles.header1}>
            <Pressable onPress={() => navigation.goBack()} >
                <SvgXml xml={BlackBackArrow} width="32" height="32" />
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
