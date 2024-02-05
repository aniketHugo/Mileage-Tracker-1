const SwitchUser = async (realm, navigation, userId, mystore) => {
    try {
        const user = realm.objectForPrimaryKey('User', userId);
        console.log("User = ",user)
        if (user) {
            if (user.passCode == "") {
                // set auth
                const auth = realm.objects('Authentication')[0];
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
                // go to homes
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
                navigation.navigate("TabNav")
            }
            else {
                navigation.navigate('EnterPassCode', {
                    data: {
                        userId: userId,
                        userName: user.name
                    }
                });
                return "Navigated to enterPasscode";
            }
        }
        else {
            console.warn("This user does not exist")
            return;
        }

        return;


    } catch (error) {
        console.error('Error SwitchUser.Js:', error);
    }
};
const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


export default SwitchUser;
