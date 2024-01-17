import Realm from 'realm';
import { PerformanceDataSchema, RefuelDataSchema,UserSchema, VehicleSchema } from '../Database/mySchema';
import { useRealm } from '@realm/react';
const AddVehicleDB = async (realm, userId, name, type, cc) => {
  try {

    const existingUser = realm.objectForPrimaryKey('User', userId);

    if (!existingUser) {
      console.error(`User with ID ${userId} does not exist.`);
      return;
    }

    realm.write(() => {
      const newVehicle = {
        id: generateUniqueId(),
        name: name,
        vehicleType: type,
        engineCC: parseInt(cc, 10),
        user: existingUser, // Use the existing user object
      };

      // Add the new vehicle to the Vehicle schema
      realm.create('Vehicle', newVehicle);
    });

    console.log('Vehicle added to database:', { userId, name, type, cc });
  } catch (error) {
    console.error('Error adding vehicle to database:', error);
  }
};

// Example function to generate a unique ID (you can implement your logic)
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export default AddVehicleDB;
