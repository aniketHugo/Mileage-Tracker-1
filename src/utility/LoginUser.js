import Realm from "realm";
const LoginUser = async (realm, navigation, userId, passCode, mystore) => {
    try {
        console.log("login  = ",userId, typeof(userId))
        const user = realm.objectForPrimaryKey('User', userId);
        const auth = realm.objects('Authentication')[0];


        if (user.passCode != passCode) {
            console.log("wrong passcode entered , correct = ", user.passCode);
            return "wrong passcode entered";
        }
        else[
            console.log("correct")
        ]


        realm.write(() => {
            if (auth) {
                auth.name = user.name;
                auth.userId = user.id;
                auth.email = user.email;
                auth.nickName = user.nickName;
                auth.passCode = user.passCode;

                console.log(`User with ID ${userId} LoggedIn (updated)`);
                console.log('Auth updated')
            } else {
                const AuthId = new Realm.BSON.ObjectId();
                const newAuth = {
                    id: AuthId,
                    name: user.name,
                    userId: user.id,
                    email: user.email,
                    nickName: user.nickName,
                    passCode: user.passCode,
                };
                // Add the new vehicle to the Vehicle schema
                realm.create('Authentication', newAuth);
                console.log('Auth created')
            }
        });
        mystore.setSelectedUserId(user.id);
        mystore.setSelectedUserName(user.name);

        const vehicles = realm.objects('Vehicle').filtered('userId == $0', (userId).toString());



        if(vehicles.length > 0){
            mystore.setRefuelSelectedVehicleId(vehicles[0].id)
            mystore.setVehicleLength(vehicles.length)
            mystore.setSelectedVehicleImage(vehicles[0].vehicleImage)
            mystore.setRefuelSelectedVehicle(vehicles[0].name)
          }
          else{
            mystore.setRefuelSelectedVehicleId(null)
            mystore.setVehicleLength(vehicles.length)
            mystore.setSelectedVehicleImage(null)
            mystore.setRefuelSelectedVehicle(null)
          }


        navigation.navigate('TabNav');

    } catch (error) {
        console.error('Error updating user login status:', error);
    }
};


export default LoginUser;
