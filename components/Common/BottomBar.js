import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomBar = () => {
  const handleHomePress = () => {
    console.log('Home button pressed');
    // Handle logic for Home button press
  };

  const handleRefuelPress = () => {
    console.log('Refuel button pressed');
    // Handle logic for Refuel button press
  };

  const handlePerformancePress = () => {
    console.log('Performance button pressed');
    // Handle logic for Performance button press
  };

  const handleVehiclePress = () => {
    console.log('Vehicle button pressed');
    // Handle logic for Vehicle button press
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={handleHomePress} style={styles.tabButton}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRefuelPress} style={styles.tabButton}>
        <Text>Refuel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePerformancePress} style={styles.tabButton}>
        <Text>Performance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleVehiclePress} style={styles.tabButton}>
        <Text>Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomBar;
