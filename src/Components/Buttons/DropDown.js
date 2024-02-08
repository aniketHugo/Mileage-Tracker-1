import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { SvgXml } from 'react-native-svg';
import { DeleteIcon, DropDown } from '../../assets/IconsSvg';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useQuery, useRealm } from '@realm/react';
import { Vehicle } from '../../Database/mySchema';
import FetchVehicleData from '../../API/FetchVehicleList';
import FetchVehicleNames from '../../API/FetchVehicleNames';
import RNPickerSelect from 'react-native-picker-select';

// import textStyle from '../../Text'
const DropDownComp = (props) => {
  const mystore = UseUserStore();
  const realm = useRealm();
  const vehiclenames = FetchVehicleNames(realm, mystore);


  return (
    <SelectDropdown
      data={vehiclenames}
      onSelect={props.onSelect}
      // buttonText = {mystore.refuelSelectedVehicle}
      defaultButtonText={mystore.refuelSelectedVehicle}
      buttonStyle={styles.btnStyle}
      dropdownStyle = {styles.dd}
      // renderDropdownIcon={Icon}
      // defaultValue={props.default}
      buttonTextStyle={styles.btnTextStyle}
      selectedRowStyle = {{backgroundColor : '#D9F0F1'}}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
  },
  btnTextStyle: {
    color: '#0B3C58'
  },
  dd: {
    borderRadius: 10,
    borderWidth: 0,
  }
})
export default DropDownComp;