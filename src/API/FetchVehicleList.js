const FetchVehicleData = (realm,mystore) => {
    try {
        if (mystore.selectedUserId) {
            console.log("Vehicle selected user = ",typeof(mystore.selectedUserId), " | ",mystore.selectedUserId)
            const vehicles = realm.objects('Vehicle').filtered('userId = $0', (mystore.selectedUserId).toString());
            console.log("Vehi data = ",vehicles.length)
            mystore.setVehicleData(Array.from(vehicles));
          }
    } catch (error) {
      console.log('Oh! Error fetching refuel data:', error);
    }
  };

export default FetchVehicleData;