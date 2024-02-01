

const DeleteRefuel = async (realm, refuelId, vehicleId,mystore) => {
  try {
    console.log("here ", refuelId, vehicleId);

    
    // Find the RefuelData entry in the vehicle's refuelData linkingObjects
    const refuelDataToDelete = realm.objectForPrimaryKey('Refuel', refuelId);
    
    if (refuelDataToDelete) {
      // Delete the RefuelData entry
      realm.write(() => {
        realm.delete(refuelDataToDelete);
      });
      const refuel = realm
        .objects('Refuel')
        .filtered('vehicleId == $0', (refuelId).toString());

        mystore.setRefuelData(refuel)
        return refuel;
      } else {
        console.log(`RefuelData with id ${refuelId} not found for vehicle with id ${vehicleId}.`);
        return [];
      }

  }
  catch (err) {
    console.error("PP ", err)
  }
};

export default DeleteRefuel;
