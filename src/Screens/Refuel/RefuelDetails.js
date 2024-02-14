import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useRealm } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import DeleteRefuel from '../../utility/DeleteRefuel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { BlackBackArrow, DeleteIcon } from '../../assets/IconsSvg';
import CustomText from '../../Components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';



const RefuelDetails = ({ route }) => {
    const { refuelItem } = route.params;
    const realm = useRealm();
    const navigation = useNavigation();
    const mystore = UseUserStore();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' };

    // useEffect(() => {
    //     console.log("Here type = ", typeof (refuelItem.id))
    //     console.log('RefuelDetails component mounted with refuelItem:', refuelItem);
    // }, [refuelItem]);

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const handleDelete = async (rid, vid) => {
        // Find the RefuelData entry in the vehicle's refuelData linkingObjects

        const res = await DeleteRefuel(realm, rid, vid, mystore);
        // console.log("res = ", res)
        // setRefuelData(res);
        navigation.navigate('Refuel');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>

                <View style={styles.headingContainer}>

                    <View style={styles.subHeadingContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            {/* <Image source={require('../../assets/BackIcon.png')} ></Image> */}
                            <SvgXml xml={BlackBackArrow} width="32" height="32" />
                        </Pressable>
                        <CustomText style={styles.bigHeading}>{refuelItem.refuelDate.toLocaleString('en-US', options)}</CustomText>
                        <Pressable onPress={() => toggleModal()}>
                            <SvgXml xml={DeleteIcon} style={styles.img}/>
                        </Pressable>
                    </View>
                    <CustomText style={styles.smallHeading}>{refuelItem.vehicleName}</CustomText>
                    <CustomText style={styles.xsmallHeading}>Added on  {refuelItem.refuelAddDate.toLocaleString('en-US', options)}</CustomText>
                    <View style={styles.circle}>

                    </View>
                </View>

                <Modal style={styles.modal} visible={isModalVisible} animationType="fade" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <CustomText style={styles.firstHeading}>Are you sure you want to delete this refuelling record?</CustomText>
                            <View style={styles.buttonContainer}>
                                <Pressable style={[styles.button, styles.noButton]} onPress={() => toggleModal()}>
                                    <CustomText style={styles.buttonText2}>No</CustomText>
                                </Pressable>

                                <Pressable style={[styles.button, styles.yesButton]} onPress={() =>  handleDelete(refuelItem.id, refuelItem.vehicleId)}>
                                    <CustomText style={styles.buttonText}>Yes</CustomText>
                                </Pressable>

                            </View>

                        </View>
                    </View>
                </Modal>

                <View style={styles.secBox}>
                    <View style={styles.cardContainer}>

                        <View style={styles.rowContainer}>
                            <CustomText style={styles.heading}>Start Reading</CustomText>
                            <CustomText style={styles.value}>{refuelItem.startReading} kms</CustomText>
                        </View>
                        <View style={styles.rowContainer}>
                            <CustomText style={styles.heading}>End Reading</CustomText>
                            <CustomText style={styles.value}>{refuelItem.endReading} kms</CustomText>
                        </View>
                        <View style={styles.rowContainer}>
                            <CustomText style={styles.heading}>Consumed</CustomText>
                            <CustomText style={styles.value}>{refuelItem.consumed}L</CustomText>
                        </View>
                        <View style={styles.rowContainer}>
                            <CustomText style={styles.heading}>Price</CustomText>
                            <CustomText style={styles.value}>S$ {refuelItem.price}</CustomText>
                        </View>
                    </View>
                </View>
            </View>

            <Pressable style={styles.bottom} onPress={() => { navigation.navigate('editRefuel', { data: refuelItem }) }}>
                <CustomText style={styles.bottomText}>Edit</CustomText>
            </Pressable>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    circle: {
        backgroundColor: '#F0F2F2',
        height: 1000,
        width: 1000,
        borderRadius: 1000,
        zIndex: 1,
        alignSelf: 'center',
        marginTop: 20,
    },
    firstHeading : {
        // color: '#0B3C58',
    },
    headingContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 0,
        overflow: 'hidden',
        height: 200,
    },
    secBox: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    bottom: {
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        margin: 10,
        width: '70%',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: '#0B3C58',
    },
    bottomText: {
        // fontWeight: 'bold',
        // color: '#0B3C58'
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        elevation: 3,
    },
    subHeadingContainer: {
        // backgroundColor: 'pink',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        zIndex: 2,
    },
    bigHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        // color: '#0B3C58',
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
        // color: '#0B3C58',
    },
    xsmallHeading : {
        color : '#58798C',
        textAlign : 'center',

    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginHorizontal : 10,
    },
    heading: {
        // fontWeight: 'bold',
        fontSize: 16,
        // color : '#0B3C58'
    },
    value: {
        fontSize: 16,
        // color: '#555',
        // color : '#0B3C58'
    },



    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
      },
      modalContent: {
        margin : 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      },
      button: {
        padding: 10,
        marginHorizontal : 10,
        borderRadius: 8,
        width: 100,
        alignItems: 'center',
      },
      yesButton: {
        backgroundColor: '#0B3C58',
      },
      noButton: {
        // backgroundColor: 'red',
        borderWidth : 2,
        borderColor : "#0B3C58"
      },
      closeButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'blue',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
      },
      buttonText2 : {
        // color: '#0B3C58',
      }
});
export default RefuelDetails;