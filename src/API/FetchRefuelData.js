const FetchRefuelData = (realm,selectedUserId,refuelSelectedVehicleId,mystore) => {
    try {
      if(!refuelSelectedVehicleId || !selectedUserId){
        return [];
      }
        const refuel = realm
        .objects('Refuel')
        .filtered('vehicleId == $0', (refuelSelectedVehicleId).toString());
        
        const refuelDataArray = refuel;
        mystore.setRefuelData(refuel);

        return refuelDataArray;
    } catch (error) {
      console.log('Oh! Error fetching refuel data:', error);
    }
  };

export default FetchRefuelData;