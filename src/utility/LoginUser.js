
const LoginUser = async (realm, navigation, userId, passCode, mystore) => {
    try {
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
                auth.isLoggedIn = user.isLoggedIn;
                auth.nickName = user.nickName;
                auth.passCode = user.passCode;

                console.log(`User with ID ${userId} LoggedIn (updated)`);
                console.log('Auth updated')
            } else {
                const newAuth = {
                    id: generateUniqueId(),
                    name: user.name,
                    userId: user.id,
                    email: user.email,
                    isLoggedIn: user.isLoggedIn,
                    nickName: user.nickName,
                    passCode: '2222',
                };
                // Add the new vehicle to the Vehicle schema
                realm.create('Authentication', newAuth);
                console.log('Auth created')
            }
        });
        mystore.setSelectedUserId(user.id);
        mystore.setSelectedUserName(user.name);
        const vehicles = user.vehicles;


        if(vehicles.length > 0){
            mystore.setRefuelSelectedVehicleId(vehicles[0].id)
            mystore.setVehicleLength(vehicles.length)
            mystore.setSelectedVehicleImage(`data:image/png;base64,${vehicles[0].vehicleImage}`)
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
const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


export default LoginUser;
