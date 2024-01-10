import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';

const AddVehicle = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text> AddVehicle Page </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddVehicle;
