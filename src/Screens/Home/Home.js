import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useRealm } from '@realm/react';
import { useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';
import NoVehicles from './Novehicles';

import NoRefuel from './NoRefuel';
import MainHome from './MainHome';
const Home = () => {
  const realm = useRealm();
  const mystore = UseUserStore();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    // setTimeout(() => {
    //   setRefreshing(false);
    //   const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId, mystore);
    // }, 1000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchRefuelData = async () => {
        try {
          const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId, mystore);
          console.log("Home :- FetchRefuelData Called")
        } catch (error) {
          console.log('Error fetching refuel data:', error);
        }
      };
      fetchRefuelData();
    }, [mystore.selectedUserId, mystore.selectedVehicleImage, mystore.refuelSelectedVehicleId])
  );

  return (

    // <LinearGradient
    //   colors={['#C5E3DC', '#F6F6EC']}
    //   style={{ flexGrow: 1 }}
    // >
      <SafeAreaView style={{flexGrow: 1,}}>

        {mystore.vehicleLength == 0 ? (
          <NoVehicles />
        )
          :
          (mystore.refuelData.length == 0 ?
            <NoRefuel/>
            : (
              <MainHome/>
            ))
        }
      </SafeAreaView>
    // </LinearGradient>
  );
};


export default Home;
