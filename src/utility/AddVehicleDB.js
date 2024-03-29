import Realm from 'realm';
import RNFS from 'react-native-fs';

const AddVehicleDB = async (realm, userId, name, type, cc, uri,mystore) => {
  try {
    const existingUser = realm.objectForPrimaryKey('User', userId);
    
    if (!existingUser) {
      console.error(`User with ID ${userId} does not exist.`);
      return { msg: "User Not exists" };
    }
    
    let fileContent = "";
    if (uri && uri.length > 3) {
      fileContent = await RNFS.readFile(uri, 'base64');
    }
    // console.log("File content =  ", fileContent , fileContent.length)

    const vehicleId = new Realm.BSON.ObjectId();
    let status = 0;
    
    const uid = userId.toString();

    realm.write(() => {
      const newVehicle = {
        id: vehicleId,
        userId: uid,
        name: name,
        vehicleType: type,
        engineCC: parseInt(cc, 10),
        vehicleImage: fileContent,
      };


        realm.create('Vehicle', newVehicle);
        status = 1;


    }); 

    const vehicles = realm.objects('Vehicle').filtered('userId = $0', userId.toString())

    if (status == 1) {
      mystore.setRefuelSelectedVehicle(name)
      mystore.setRefuelSelectedVehicleId(vehicleId) 
      mystore.setVehicleLength(vehicles.length)  
      mystore.setSelectedVehicleImage(fileContent);
      mystore.setVehicleType(type)

      return { status: 1, id: (vehicleId).toString, len: vehicles.length };
    }
    return { status: 0 };

    // console.log('Vehicle added to database:', { userId, name, type, cc });
  } catch (error) {
    console.error('Error adding vehicle to database:', error);
    return {status : 0};
  }
};

// Example function to generate a unique ID (you can implement your logic)
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export default AddVehicleDB;
