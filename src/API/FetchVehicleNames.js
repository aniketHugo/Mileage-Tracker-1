const FetchVehicleNames = (realm,mystore) => {
    try {
        if (mystore.selectedUserId) {
            const vehicles = realm.objects('Vehicle').filtered('userId = $0', (mystore.selectedUserId).toString());
            // mystore.setVehicleData(Array.from(vehicles));
            return (Array.from(vehicles)).map((vehicle)=>{return vehicle.name});
          }
    } catch (error) {
      console.log('Oh! Error fetching refuel data:', error);
    }
  };

export default FetchVehicleNames;