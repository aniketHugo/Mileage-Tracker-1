import React from 'react';
import { View,Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';
import BottomBar from '../Common/BottomBar';
import { useNavigation } from '@react-navigation/native';
import AddRefuel from './AddRefuel';
const Refule = () => {
  const navigation = useNavigation();
  return (
    // if no vehicle :- add vehiclee
    // else  :- show the data of vehicel selected in home
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text> Refule Screen </Text>
        <Button title="Add Refule" onPress={() => navigation.navigate('AddRefuel')} ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Refule;
