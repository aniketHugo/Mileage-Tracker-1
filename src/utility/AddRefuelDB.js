
const AddRefuelDB = async (
  realm,
  userId,
  vehicleId,
  vehicleName,
  refuelDate,
  addDate,
  startReading,
  endReading,
  consumed,
  price) => {
  try {

    const existingUser = realm.objectForPrimaryKey('User', userId);
    const existingVehicle = realm.objectForPrimaryKey('Vehicle', vehicleId,);

    if (!existingUser) {
      console.error(`User with ID ${userId} does not exist.`);
      return;
    }
    if (!existingVehicle) {
      console.error(`Vehicle with ID ${vehicleId} does not exist.`);
      return;
    }
    const refuelId = new Realm.BSON.ObjectId();

    const vid = vehicleId.toString();
    const uid = userId.toString();
    realm.write(() => {
      realm.create('Refuel', {
        id: refuelId,
        refuelDate: refuelDate,
        refuelAddDate: addDate,
        startReading: parseFloat(startReading),
        endReading: parseFloat(endReading),
        consumed: parseFloat(consumed),
        price: parseFloat(price),
        vehicleId: vid,
        vehicleName : vehicleName,
        userId : uid
      });
    });
   
    console.log('Refuel added to database:');
    return {status : 1}
  } catch (error) {
    console.error('Error adding Refuel to database:', error);
    
  }
};

// Example function to generate a unique ID (you can implement your logic)


export default AddRefuelDB;
