import Realm from 'realm';
import { PerformanceDataSchema, RefuelDataSchema,UserSchema, VehicleSchema } from '../Database/mySchema';
const FetchUsers = async (realm) => {
  try {

    const users = await realm.objects('User');

    
    
    console.log('Fetched Users:', users);
    return users;
  } catch (error) {
    console.error('Error in fetching users:', error);
  }
};


export default FetchUsers;
