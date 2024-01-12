import React from 'react';
import { View, Button, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';
import { useNavigation } from '@react-navigation/native';

const VehiclesData = () => {
    return (

        <View style={{ flex: 1 }}>
            {/* <Text> Fuel Insights</Text> */}
            <ScrollView contentContainerStyle={styles.fuelData}>
                <View style={styles.rowCard}>
                    <Image source={require('../../sources/image1.png')} style={styles.image2} />
                    <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Yamaha FZ</Text>
                    <Text style={styles.text}>155 CC</Text>
                </View>
                <View style={styles.rowCard}>
                    <Image source={require('../../sources/image1.png')} style={styles.image2} />
                    <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Yamaha FZ</Text>
                    <Text style={styles.text}>155 CC</Text>
                </View>
                <View style={styles.rowCard}>
                    <Image source={require('../../sources/image1.png')} style={styles.image2} />
                    <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Yamaha FZ</Text>
                    <Text style={styles.text}>155 CC</Text>
                </View>
                <View style={styles.rowCard}>
                    <Image source={require('../../sources/image1.png')} style={styles.image2} />
                    <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Yamaha FZ</Text>
                    <Text style={styles.text}>155 CC</Text>
                </View>

            </ScrollView>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5E3DC',
    },
    fuelData: {
        flexGrow: 1,
        flexDirection: 'column', // Arrange items horizontally
        justifyContent: 'space-around', // Adjust spacing between cards
        alignItems: 'center', // Align items vertically
        marginTop: 50, // Adjust margin as needed
    },
    rowCard: {
        backgroundColor: '#ffffff', // Card background color
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        // minWidth: 370, // Card width
    },
    text: {
        fontSize: 16,
        marginBottom: 10, // Spacing between texts
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default VehiclesData;
