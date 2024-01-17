import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const ReusableButton = ({ destination, navigation ,Heading}) => {
  const handlePress = () => {
    navigation.navigate(destination);
  };

  return (
    <Pressable onPress={handlePress} style={styles.btn}>
      <Text style={styles.btnName}>{Heading}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#0B3C58',
        padding: 10,
        width: 250,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
      },
      btnName: {
        color: 'white',
      },
});

export default ReusableButton;
