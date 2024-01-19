

const DeleteRefuel = async (realm,refuelId, vehicleId) => {
  try {
    console.log("here ",refuelId, vehicleId);
  
    realm.write(() => {
      // Find the specific Vehicle
      const vehicle = realm.objectForPrimaryKey('Vehicle', vehicleId);

      if (vehicle) {
        // Find the RefuelData entry in the vehicle's refuelData linkingObjects
        const refuelDataToDelete = vehicle.refuelData.find((refuelData) => refuelData.id === refuelId);

        if (refuelDataToDelete) {
          // Delete the RefuelData entry
          realm.delete(refuelDataToDelete);
          console.log(`RefuelData with id ${refuelId} deleted successfully.`);
        } else {
          console.log(`RefuelData with id ${refuelId} not found for vehicle with id ${vehicleId}.`);
        }
      } else {
        console.log(`Vehicle with id ${vehicleId} not found.`);
      }
    });
  }
  catch (err){
    console.error("PP ",err)
  }
};

export default DeleteRefuel;
