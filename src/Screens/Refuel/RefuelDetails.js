import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Realm from 'realm';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useRealm } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import DeleteRefuel from '../../utility/DeleteRefuel';
const RefuelDetails = ({ route }) => {
    const { refuelItem } = route.params;
    const [refuelData, setRefuelData] = useState([]);
    const selectedUserId = UseUserStore((state) => state.selectedUserId)
    const refuelSelectedVehicleId = UseUserStore((state) => state.refuelSelectedVehicleId);
    const realm = useRealm();
    const navigation = useNavigation();
    useEffect(() => {
        // Add your code here that depends on refuelItem
        console.log("props ", refuelItem)
        console.log('RefuelDetails component mounted with refuelItem:', refuelItem);

        // Example: If you need to use refuelItem in state or other logic
        // setSomeState(refuelItem.someValue);
    }, [refuelItem]);

    const handleDelete = (rid,vid) =>{
        DeleteRefuel(realm,rid,vid)
        navigation.goBack();
    }

    return (

        <View style={{ flex: 1 }}>


            <View style={styles.headingContainer}>
                <View style={styles.subHeadingContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/BackIcon.png')} ></Image>
                    </Pressable>
                    <Text style={styles.bigHeading}>{refuelItem.refuelDate}</Text>
                    <Pressable onPress={() => handleDelete(refuelItem.id,refuelItem.vehicleId)}>
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

    );
};


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 10,
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