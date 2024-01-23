import React, { useState } from 'react';
import { View, Button,TouchableOpacity, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Draw from './Draw';


const Header = () => {

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleButton1 = () => {
    console.log('Button 1 pressed');
  };

  const handleButton2 = () => {
    console.log('Button 2 pressed');
  };

  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.openDrawer()} >
        <Image source={require('../assets/userIcon2.png')}></Image>
        </Pressable>
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Text>Open Drawer</Text>
  </TouchableOpacity> */}
        {/* <Button title="=" onPress={toggleSidebar} /> */}
        {/* <Text style={styles.title}>Mileage Tracker</Text> */}
        {/* <Button title="Home" onPress={handleButton1} /> */}
      </View>

      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <Button title="Switch Profile" onPress={() => navigation.navigate('SignInStack')} />
          <Button title="Create Account" onPress={() => navigation.navigate('CreateAccount')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: 'grey', // Adjust the color as needed
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 60, // Adjust this value to place the sidebar properly
    left: 0,
    width: 150, // Adjust the width as needed
    backgroundColor: '#fff', // Adjust the color as needed
    elevation: 5,
    zIndex: 1000,
  },
});

export default Header;