import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';

const FuelInsights = (props) => {
    const [refuelData, setRefuelData] = useState([]);
    const [avg, setAvg] = useState();
    const [lastAvg, setLastAvg] = useState();
    const mystore = UseUserStore();
    const realm = useRealm()
    const navigation = useNavigation();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' };

    useEffect(
        () => {
            const fetchRefuelData = async () => {
                try {
                    // const data = FetchRefuelData(realm, mystore.selectedUserId, ref_id);
                    // setRefuelData(data)
                    const data = props.refuelData;
                    let totalfuel = 0;
                    let totalDist = 0;
                    data.forEach((e) => {
                        console.log(e.endReading - e.startReading);
                        totalfuel += e.consumed;
                        totalDist += e.endReading - e.startReading;
                    })
                    if(totalfuel == 0) totalfuel = 1;
                    setAvg((totalDist / totalfuel).toFixed(2));
                    const lastRefuelData = data.length > 0 ? ((data[data.length - 1].endReading -  data[data.length - 1].startReading) / data[data.length - 1].consumed ) : 0;
                    setLastAvg(lastRefuelData.toFixed(2))
                    console.log(" val = ", totalDist, totalfuel)
                } catch (error) {
                    console.log('Error fetching refuel data:', error);
                }
            };
            fetchRefuelData();
        }, [props.refuelData])

        
    return (

        <View style={styles.fuelCard2}>
            <View style={styles.card2}>
                <Text style={styles.text}>Avg Fuel Consumption</Text>
                <Text style={styles.text}>{avg} km/l</Text>
            </View>
            <View style={styles.card2}>
                <Text style={styles.text}>Last Fuel Consumption</Text>
                <Text style={styles.text}>{lastAvg} km/l</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    fuelCard2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: '#F0F2F2',
        width: '100%',
        paddingVertical: 20,
    },
    card2: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        width: 150,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },

});
export default FuelInsights;