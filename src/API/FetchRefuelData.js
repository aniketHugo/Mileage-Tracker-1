const FetchRefuelData = (realm,selectedUserId,refuelSelectedVehicleId,mystore) => {
    try {
      if(!refuelSelectedVehicleId || !selectedUserId){
        return [];
      }
        const refuel = realm
        .objects('Refuel')
        .filtered('vehicleId == $0', (refuelSelectedVehicleId).toString());
        const refuelDataArray = refuel;
        // console.log("User aand vehicle ok = ",refuelDataArray)
        
        // Convert the Realm refuelDataArray to a plain JavaScript array
        // const refuelDataPlainArray = Array.from(refuelDataArray);
        mystore.setRefuelData(refuel);

        return refuelDataArray;
    } catch (error) {
      console.log('Oh! Error fetching refuel data:', error);
    }
  };

export default FetchRefuelData;