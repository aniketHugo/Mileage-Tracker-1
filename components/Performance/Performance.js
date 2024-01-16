import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';
import App from '../../App';
const Performance = () => {
  return (
    // Add vehicle button + (image + details) list of all vehicles
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text> performance Page </Text>
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

export default Performance;
