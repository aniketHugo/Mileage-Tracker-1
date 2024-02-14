import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import UseUserStore from '../../ZustandStore/ZuStore';
import { SvgXml } from 'react-native-svg';
import { VehicleCelebration } from '../../assets/IconsSvg';

const VehicleSuccessPage = ({route}) => {
    const navigation = useNavigation();


    console.log("Hey == ",route.params)
    useEffect(()=>{
        const delayNavigation = setTimeout(() => {
          // Replace 'OtherScreen' with the name of the screen you want to navigate to
          navigation.navigate("Vehicle")
        }, 5000); 
        return () => clearTimeout(delayNavigation);
      },[])

    return (
        <LinearGradient
            colors={['#ACDADB', '#F0F0E0']}
            style={{ flex: 1 }}
        >
            <View style={styles.Page}>
                <View style={styles.Top}>
                    <SvgXml xml={VehicleCelebration} style={styles.image1}/>
                    {route.params.img == null ?

                        (
                            route.params.type == "2 Wheeler" ?
                            <View style={styles.vehicleImage}>
                                <Image source={require('../../assets/bikeDefaultImg.png')} style={styles.image4} />
                            </View>
                            :
                            <View style={styles.vehicleImage}>
                                <Image source={require('../../assets/NoVehicle.png')} style={styles.image4} />
                            </View>
                        )
                            :
                            <View style={styles.vehicleImage}>
                                <Image source={{ uri: route.params.img }} style={styles.image4} />
                            </View>
                    
                    }
                    <Text style={styles.secHeading}>{route.params.name}</Text>
                    <Text style={styles.mainHeading} >  Vehicle Added!</Text>

                </View>

                <View style={styles.Bottom}>
                    <Image source={require('../../assets/img3.png')} style={styles.image2} />
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: 40,
    },
    vehicleImage: {
        height: 120,
        width: 120,
        overflow: 'hidden',
        borderRadius: 100,
        marginTop: 100,
        marginBottom: 30,

    },
    image4: {
        height: 120,
        width: 120,
    },
    image1: {
        position: 'absolute',
        top: 40,
    },
    Top: {
        alignItems: 'center',
    },
    mainHeading: {
        fontSize: 35,
        color: '#0B3C58'
    },
    secHeading: {
        marginVertical: 30,
        fontSize: 25,
        color: '#0B3C58',
    },
    image2: {
        width: 430,
        height: 280,
        // flexShrink: 0,
    }
});

export default VehicleSuccessPage;
