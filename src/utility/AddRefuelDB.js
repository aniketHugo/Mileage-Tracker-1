
const AddRefuelDB = async (
  realm,
  userId,
  vehicleId,
  refuelDate,
  startReading,
  endReading,
  consumed,
  price) =>  {
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

      realm.write(() => {
        // Assume you have the following data
        const refuelData = {
          id: generateUniqueId(), // Replace with the actual refuel data ID
          refuelDate: refuelDate, // Replace with the actual refuel date
          startReading: parseFloat(startReading),
          endReading: parseFloat(endReading),
          consumed: parseFloat(consumed),
          price: parseFloat(price),
        };
      
        // Get the vehicle object by ID
        const vehicle = realm.objectForPrimaryKey('Vehicle', vehicleId);
      
        if (vehicle) {
          // Add the refuel data to the RefuelData schema
          realm.create('RefuelData', {
            ...refuelData,
            vehicle,
          });
      
          // Update the linkingObjects property in the Vehicle schema
          // vehicle.refuelData.push(refuelData);
        } else {
          console.error(`Vehicle with ID ${vehicleId} not found.`);
        }
      });
      

    console.log('Refuel added to database:');
  } catch (error) {
    console.error('Error adding Refuel to database:', error);
  }
};

// Example function to generate a unique ID (you can implement your logic)
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}; 

export default AddRefuelDB;
