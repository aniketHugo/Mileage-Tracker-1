import React from 'react';
import { View, Image, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { SvgXml } from 'react-native-svg';
import { ClowdImg, DrawerIcon, GoArrow, MilageTrackerHomeIcon } from '../../assets/IconsSvg';
import VehicleList from '../Refuel/VehicleList';
import GoButton from '../../Components/Buttons/GoButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../Components/CustomText';

const NoRefuel = () => {
    const navigation = useNavigation();
    const mystore = UseUserStore();
    const getUri = (image) => {
        const uri = `data:image/png;base64,${image}`;
        return uri;
    }
    return (
        //     <LinearGradient
        //     colors={['#C5E3DC', '#F6F6EC']}
        //     style={styles.gradient}
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 0, y: 1 }}
        // >
        <ScrollView contentContainerStyle={styles.noRefuelContent}>
            <Pressable style={styles.sidebarBtn} onPress={() => { navigation.openDrawer() }} >
                <SvgXml xml={DrawerIcon} width="32" height="32" />
            </Pressable>
            <View style={styles.Top}>

                <SvgXml xml={MilageTrackerHomeIcon} width="32" height="32" />
                <CustomText style={{ color: '#EB655F', fontSize: 20, marginTop: 20 }}> Hi {mystore.selectedUserName}  </CustomText>
                <CustomText style={{ textAlign: 'center', fontSize: 15, marginTop: 10, }}>Here is everything about your</CustomText>
                <VehicleList />

                {mystore.selectedVehicleImage != null &&
                    (

                        mystore.selectedVehicleImage == "" ? (
                            mystore.vehicleType == "2 Wheeler" ?
                                <View style={styles.vehicleImage}>
                                    <Image source={require('../../assets/bikeDefaultImg.png')} style={styles.image4} />
                                </View>
                                :
                                <View style={styles.vehicleImage}>
                                    <Image source={require('../../assets/NoVehicle.png')} style={styles.image4} />
                                </View>)
                            :
                            <View style={styles.vehicleImage}>
                                <Image source={{ uri: getUri(mystore.selectedVehicleImage) }} style={styles.image4} />
                            </View>
                    )
                }

            </View>
            <View style={styles.Bottom}>
                <View style={styles.content3}>
                    <SvgXml xml={ClowdImg} />
                    <CustomText style={styles.heading4}>It’s time to add the refuelling details to get more insights</CustomText>
                </View>
                {/* <View style={styles.btn2}> */}
                {/* <Pressable onPress={() => navigation.navigate('RefuelStack', { screen: 'addRefuel' })} style={styles.btn} >
                            <CustomText style={styles.btnName}>Add Refuelling</CustomText>
                            <SvgXml xml={GoArrow} />
                        </Pressable> */}
                <GoButton
                    destination="addRefuel"
                    navigation={navigation}
                    Heading="Add Refuel"
                />
                {/* </View> */}
            </View>
        </ScrollView>


    );
};

const styles = StyleSheet.create({

    HomeContainer: {
        flexGrow: 1,
        // paddingTop : 20,
    },
    gradient: {
        position: 'absolute',
        // flexGrow  :1,
        left: 0,
        right: 0,
        top: 0,
        bottom: '60%', // Adjust the value to control the height of the gradient
    },
    noRefuelContent: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
    },
    mainContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Top: {
        alignItems: 'center',
    },
    Bottom: {
        alignItems: 'center',
        // height: '80%',
        flex: 1,
        justifyContent: 'center',
    },
    other: {
        backgroundColor: '#E4EBEF',
        alignItems: 'center',
    },
    image4: {
        width: 300,
        height: 200,
        borderRadius: 10,
    },
    sidebarBtn: {
        position: 'absolute',
        marginLeft: 20,
        left: 0,
        zIndex: 2,
    },
    heading4: {
        textAlign: 'center',
        margin: 20,
        fontSize : 20,
        // color: '#0B3C58',
    },
    content3: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading2: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 20,
        // color: '#0B3C58',
    },
    image3: {
        backgroundColor: '#95C3BB',
        borderRadius: 180
    },
    heading: {
        // backgroundColor : 'red',
        alignSelf: 'flex-start',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        // color: '#0B3C58',
    },
    vehicleImage: {
        marginTop: 20,
        borderWidth: 8,
        borderColor: 'white',
        borderRadius: 10,
        // elevation : 5,
    },
    btn3: {
        // backgroundColor: '#0B3C58',
        padding: 10,
        width: 100,
        color: 'blue',
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    btn: {
        alignSelf: 'center',
        alignItems: 'center',
        margin: 10,
        // backgroundColor: '#0B3C58',
        padding: 10,
        width: 150,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnName: {
        color: 'white',
    },
    fuelText: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: '#0B3C58',
    },
    fuelText2: {
        fontSize: 20,
        // fontWeight : 'bold',
        // color: '#0B3C58',

    },
    fuelDataContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F0F2F2',
        marginTop: 30,
    },
    fuelHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        // color: '#0B3C58',
    },
    image3: {
        backgroundColor: '#95C3BB',
        borderRadius: 180,
    },
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
        // color: '#0B3C58',
    },

});

export default NoRefuel;
