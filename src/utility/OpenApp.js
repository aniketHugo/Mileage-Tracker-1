import { Auth } from "realm";
import LoginUser from "./LoginUser";

const OpenApp = async (realm, navigation, mystore) => {
  console.log("Open App :- called")
  const authSchema = realm.objects('Authentication');
  if(authSchema && authSchema.length>0){
   const AuthUser = authSchema[0];
    // console.log("Auth found")
    const user = realm.objectForPrimaryKey('User', AuthUser.userId);
    if (user) {
      // console.log("User found")
      if (user.passCode == "") {
        // console.log("User passcode empty ",(user.id).toString())
        const vehicles = realm.objects('Vehicle').filtered('userId == $0',(user.id).toString());

        mystore.setSelectedUserId(AuthUser.userId);
        mystore.setSelectedUserName(AuthUser.name);
        if (vehicles.length > 0) {
          mystore.setRefuelSelectedVehicleId(vehicles[0].id)
          mystore.setVehicleLength(vehicles.length)
          mystore.setSelectedVehicleImage(vehicles[0].vehicleImage)
          mystore.setRefuelSelectedVehicle(vehicles[0].name)
          mystore.setVehicleType(vehicles[0].vehicleType)
        } 
        else {
          mystore.setRefuelSelectedVehicleId(null)
          mystore.setVehicleLength(vehicles.length)
          mystore.setSelectedVehicleImage(null)
          mystore.setRefuelSelectedVehicle(null)
        }
        navigation.replace('TabNav');
      }
      else {
        // console.log("User has passcode")
        navigation.replace('EnterPassCode', {
          data: {
            userId: AuthUser.userId,
            userName: AuthUser.name
          }
        });
      }
    }
    else {
      navigation.replace('LoginStack')
    }
    return;
  }
  else {
    const user = realm.objects('User');
    if(user && user.length == 0){
      navigation.replace('LoginStack' ,{screen : 'SignUp'})
    }
    else{
      navigation.replace('LoginStack')
    }
    return;
  }
};

export default OpenApp;