import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useRealm } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import DeleteRefuel from '../../utility/DeleteRefuel';



const RefuelDetails = ({ route }) => {
    const { refuelItem } = route.params;
    const realm = useRealm();
    const navigation = useNavigation();
    const mystore = UseUserStore();

    useEffect(() => {
        console.log('RefuelDetails component mounted with refuelItem:', refuelItem);
    }, [refuelItem]);


    const handleDelete = async (rid, vid) => {
        // Find the RefuelData entry in the vehicle's refuelData linkingObjects

        const res = await DeleteRefuel(realm, rid, vid, mystore);
        // console.log("res = ", res)
        // setRefuelData(res);
        navigation.navigate('Refuel');
    }

    return (
        <View style={styles.container}>
            <View>

                <View style={styles.headingContainer}>
                    <View style={styles.subHeadingContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={require('../../assets/BackIcon.png')} ></Image>
                        </Pressable>
                        <Text style={styles.bigHeading}>{refuelItem.refuelDate}</Text>
                        <Pressable onPress={() => handleDelete(refuelItem.id, refuelItem.vehicleId)}>
                            <Image style={styles.img} source={require('../../assets/DeleteIcon.png')} >
                            </Image>
                        </Pressable>
                    </View>
                    <Text style={styles.smallHeading}>{refuelItem.vehicleName}</Text>
                </View>

                <View style={styles.cardContainer}>

                    <View style={styles.rowContainer}>
                        <Text style={styles.heading}>Start Reading</Text>
                        <Text style={styles.value}>{refuelItem.startReading}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.heading}>End Reading</Text>
                        <Text style={styles.value}>{refuelItem.endReading}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.heading}>Consumed</Text>
                        <Text style={styles.value}>{refuelItem.consumed}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.heading}>Price</Text>
                        <Text style={styles.value}>{refuelItem.price}</Text>
                    </View>
                </View>
            </View>

            <Pressable style={styles.bottom} onPress={() => { navigation.navigate('editRefuel', { data: refuelItem }) }}>
                <Text style={styles.bottomText}>Edit</Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    bottom: {
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
        margin: 10,
        width: '70%',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: '#0B3C58',
    },
    bottomText: {
        fontWeight: 'bold',
        color: '#0B3C58'
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        elevation: 3,
    },
    headingContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    subHeadingContainer: {
        // backgroundColor : 'pink',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    bigHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        // backgroundColor : 'white',
    },

    deleteButton: {
        color: 'red',
        fontSize: 16,
    },
    smallHeading: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        color: '#555',
    },
});
export default RefuelDetails;