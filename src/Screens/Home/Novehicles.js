import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { useRealm } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { SvgXml } from 'react-native-svg';
import { DrawerIcon, GoArrow, MilageTrackerHomeIcon } from '../../assets/IconsSvg';
import LinearGradient from 'react-native-linear-gradient';

const NoVehicles = () => {
    const navigation = useNavigation();
    const mystore = UseUserStore();

    return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flexGrow: 1 }}
    >
        <View style={styles.noVehicleContent}>
            <Pressable style={styles.sidebarBtn} onPress={() => { navigation.openDrawer() }} >
                <SvgXml xml={DrawerIcon} width="32" height="32" />
            </Pressable>
            <View style={styles.Top}>

                <SvgXml xml={MilageTrackerHomeIcon} width="32" height="32" />
                <Text style={{ color: '#EB655F', fontSize: 20, marginTop: 20 }}> Hi {mystore.selectedUserName}  </Text>
                <Text style={{ color: '#0B3C58' ,textAlign : 'center',fontSize : 15, marginTop : 10,}}>Track your miles towards a prosperous {'\n'} financial journey!</Text>

            </View>
            <View style={styles.Bottom}>

                <Image source={require('../../assets/Maskgroup.png')} style={styles.image2} />
                <Text style={styles.heading2} > Add a vehicle to start tracking its {'\n'} refuelling & performance </Text>
                <Pressable onPress={() => navigation.navigate("VehicleStack", { screen: 'addVehicle' })} style={styles.btn3} >
                    <Text style={styles.btnName}>
                        Add Vehicle  
                    </Text>
                    <SvgXml xml={GoArrow} />
                </Pressable>
            </View>
        </View>
        </LinearGradient>

    );
};

const styles = StyleSheet.create({

    noVehicleContent: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
    },
    Top: {
        alignItems: 'center',
    },
    Bottom: {
        alignItems: 'center',
        height: '80%',
        justifyContent: 'center',
    },
    heading2: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 20,
        color: '#0B3C58',
    },
    image3: {
        backgroundColor: '#95C3BB',
        borderRadius: 180
    },
    image2: {
        backgroundColor: '#95C3BB',
        borderRadius: 100,
    },
    sidebarBtn: {
        position: 'absolute',
        marginLeft: 20,
        left: 0,
        zIndex: 2,
    },
    btn3: {
        backgroundColor: '#0B3C58',
        padding: 10,
        width: '100%',
        color: 'blue',
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        flexDirection : 'row',
    },
    btnName: {
        color: 'white',
    }

});

export default NoVehicles;
