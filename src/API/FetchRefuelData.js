const FetchRefuelData = (realm,selectedUserId,refuelSelectedVehicleId) => {
    try {
      if(!refuelSelectedVehicleId || !selectedUserId){
        return [];
      }
      const user = realm.objectForPrimaryKey('User', selectedUserId);
      const vehicle = realm.objectForPrimaryKey('Vehicle', refuelSelectedVehicleId);

      if (user && vehicle) {
        const refuelDataArray = vehicle.refuelData.filtered(`vehicle == $0`, vehicle);

        // Convert the Realm refuelDataArray to a plain JavaScript array
        const refuelDataPlainArray = Array.from(refuelDataArray);

        return refuelDataPlainArray;
      } else {
        console.log('User or Vehicle not found.');
        return [];
      }
    } catch (error) {
      console.log('Error fetching refuel data:', error);
    }
  };

export default FetchRefuelData;