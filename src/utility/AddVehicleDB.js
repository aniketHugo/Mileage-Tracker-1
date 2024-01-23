import Realm from 'realm';
import { PerformanceDataSchema, RefuelDataSchema,UserSchema, VehicleSchema } from '../Database/mySchema';
import { useRealm } from '@realm/react';
import UseUserStore from '../ZustandStore/ZuStore';
import RNFS from 'react-native-fs';

const AddVehicleDB = async (realm, userId, name, type, cc,uri) => {
  try {

    const existingUser = realm.objectForPrimaryKey('User', userId);
   let fileContent = "";
    if(uri){
       fileContent = await RNFS.readFile(uri, 'base64');
    }

    console.log("File content ",fileContent.length)
    if (!existingUser) {
      console.error(`User with ID ${userId} does not exist.`);
      return;
    }
    const geniD = generateUniqueId();
    realm.write(() => {
      const newVehicle = {
        id: geniD,
        name: name,
        vehicleType: type,
        engineCC: parseInt(cc, 10),
        vehicleImage : fileContent,
        user: existingUser, // Use the existing user object
      };

      if(!newVehicle.vehicleImage){
        console.log("No image exists")
      }
      else{
        realm.create('Vehicle', newVehicle);
      }

      // Add the new vehicle to the Vehicle schema
    });

    // const numVehicles = realm.objects('Vehicle').length;
    // console.log('Veh len = ',numVehicles)

    return geniD;
    console.log('Vehicle added to database:', { userId, name, type, cc });
  } catch (error) {
    console.error('Error adding vehicle to database:', error);
    return -1;
  }
};

// Example function to generate a unique ID (you can implement your logic)
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export default AddVehicleDB;
