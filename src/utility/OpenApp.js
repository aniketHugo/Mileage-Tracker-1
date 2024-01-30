import LoginUser from "./LoginUser";

const OpenApp = async (realm, navigation, mystore) => {
  console.log("In open app")
  const AuthUser = realm.objects('Authentication')[0];
  if (AuthUser) {
    console.log("Auth found")
    const user = realm.objectForPrimaryKey('User', AuthUser.userId);
    if (user) {
      console.log("User found")
      if (user.passCode == "") {
        const temp = user.vehicles;
        console.log("Mytemp = ", temp.length)
        const vehicles = user.vehicles;
        console.log("User passcode empty")
        mystore.setSelectedUserId(AuthUser.userId);
        mystore.setSelectedUserName(AuthUser.name);
        if (vehicles.length > 0) {
          mystore.setRefuelSelectedVehicleId(vehicles[0].id)
          mystore.setVehicleLength(vehicles.length)
          mystore.setSelectedVehicleImage(`data:image/png;base64,${vehicles[0].vehicleImage}`)
          mystore.setRefuelSelectedVehicle(vehicles[0].name)
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
        console.log("User has passcode")
        navigation.navigate('EnterPassCode', {
          data: {
            userId: AuthUser.userId,
            userName: AuthUser.name
          }
        });
      }
    }
    else {
      navigation.navigate('LoginStack')
    }
    return;
  }
  else {
    // const user = realm.objects('User');
    navigation.navigate('LoginStack')
    return;
  }
};

export default OpenApp;