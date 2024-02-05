import React, { useState } from 'react';
import { Pressable,View, Text, StyleSheet, Modal } from 'react-native';

const MyModal = ({ destination, navigation ,Heading}) => {
    const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
        <Pressable>
            text
        </Pressable>
        <Modal style={styles.modal} visible={isModalVisible} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.firstHeading}>Are you sure you want to delete your account?</Text>
            <Text style={styles.secondHeading}>Note that all your data will be lost permanently. </Text> 

                {/* Buttons for "Yes" and "No" */}
                <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.noButton]} onPress={() => toggleModal()}>
                    <Text style={styles.buttonText2}>No</Text>
                </Pressable>
                
                <Pressable style={[styles.button, styles.yesButton]} onPress={() => handleDelete()}>
                    <Text style={styles.buttonText}>Yes</Text>
                </Pressable>

                </View>

            </View>
            </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MyModal;
