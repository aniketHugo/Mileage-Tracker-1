// CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PrimaryColor } from './Theme';
const CustomText = (props) => {
  return <Text {...props} style={[styles.text, props.style]} />;
};

const styles = StyleSheet.create({
  text: {
    // fontFamily: 'YourCustomFontFamily', // Replace with your custom font family,
    color :  PrimaryColor,
    // color : 'green',
    // fontFamily: 'Arial' ,
    // fontFamily: 'Helvetica' ,
    // fontFamily: 'Roboto' ,
    // fontFamily: 'Roboto Condensed' ,
    // fontFamily: 'Roboto Mono' ,
    // fontFamily: 'sans-serif' ,
  },
});

export default CustomText;
