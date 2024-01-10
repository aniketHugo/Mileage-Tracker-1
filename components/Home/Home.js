import React from 'react';
import { View, Image,Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';
import VehicleList from './VehicleList';
import Sidebar from '../Common/Sidebar';
const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* <Sidebar/> */}
      <View style={styles.content}>
      <Image source={require('../../sources/Union.png')} style={styles.image} />
        <Text style={{color:'#EB655F' , fontSize : 20 , marginTop : 20}}> This is the Home Screen </Text>

      <Image  source={require('../../sources/Maskgroup.png')} style={styles.image2} />
      {/* or this */}
      <ScrollView>

      <Image  source={require('../../sources/image1.png')} style={styles.image2} />
      <Image  source={require('../../sources/image1.png')} style={styles.image2} />
      <Image  source={require('../../sources/image1.png')} style={styles.image2} />
      <Image  source={require('../../sources/image1.png')} style={styles.image2} />
      <Image  source={require('../../sources/image1.png')} style={styles.image2} />
      <Image  source={require('../../sources/image1.png')} style={styles.image2} />
      </ScrollView>
        <VehicleList/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5E3DC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
