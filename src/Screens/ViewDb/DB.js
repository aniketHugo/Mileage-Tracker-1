import Realm from 'realm';
import { useRealm } from '@realm/react';
const logRefuelData = async (selectedUserId, selectedVehicleId) => {
  const realm = useRealm();
  console.log("temp ", selectedUserId,selectedVehicleId)
  try {
    // Find the user by ID
    const user = realm.objectForPrimaryKey('User', selectedUserId);

    if (user) {
      
      // Find the vehicle by ID
      const vehicle = realm.objectForPrimaryKey('Vehicle', selectedVehicleId);

      if (vehicle) {
        // Get refuel data for the selected user and vehicle
        const refuelData = vehicle.refuelData;

        // Log the refuel data
        console.log('Refuel Data for User:', user.name, 'and Vehicle:', vehicle.name);
        console.log(refuelData);
      } else {
        console.error('Vehicle not found with ID:', selectedVehicleId);
      }
    } else {
      console.error('User not found with ID:', selectedUserId);
    }
  } catch (error) {
    console.error('Error fetching and logging refuel data:', error);
  }
};



export default logRefuelData;