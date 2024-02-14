const FetchVehicleData = (realm, mystore) => {
  try {
    if (mystore.selectedUserId) {
      const vehicles = realm.objects('Vehicle').filtered('userId = $0', (mystore.selectedUserId).toString());
      mystore.setVehicleData(Array.from(vehicles));
      
      return Array.from(vehicles);
    }
  } catch (error) {
    console.log('Oh! Error fetching refuel data:', error);
  }
};

export default FetchVehicleData;