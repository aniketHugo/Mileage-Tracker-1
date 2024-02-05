
const DeleteAccount = async (realm,navigation, mystore) => {
    try {
        const user = realm.objectForPrimaryKey('User', mystore.selectedUserId);
        const vehicles = realm.objects('Vehicle').filtered('userId = $0', (mystore.selectedUserId).toString());
        const refuel = realm.objects('Refuel').filtered('userId = $0', (mystore.selectedUserId).toString());
        const auth = realm.objects('Authentication')[0];

        if (user) {
            console.log("$$$ user found")
            realm.write(() => {
                realm.delete(vehicles);
                realm.delete(user);
                realm.delete(refuel);
            });
            console.log("$$$ user del")

            if (auth) {
                realm.write(() => {
                    realm.delete(auth);
                });
                console.log("Auth deleted");
            }
            else {
                console.log("Auth does not exist")
            }
            console.log("Deleted ", mystore.selectedUserId);

            mystore.setSelectedUserId(null)
            mystore.setSelectedUserName(null)
            mystore.setRefuelSelectedVehicleId(null)
            mystore.setRefuelSelectedVehicle('select')
            mystore.setRefuelData([]);
            mystore.setVehicleData([]);
            mystore.setVehicleLength(0);
            mystore.setRefuelLength(0);
            mystore.setSelectedVehicleImage(null);


            const len = realm.objects('User').length;
            console.log("Number of users remaining = ",len)
            if(len == 0){
                navigation.replace( "LoginStack" , {screen :  "SignUp"})
            }
            else{
                navigation.replace("LoginStack" , {screen :  "SignIn"})
            }

            return {msg : "Deleted"}
        }
    } catch (error) {
        console.error('Error deleting user data:', error);
        return {msg : "Not Deleted"}

    }
};

export default DeleteAccount;
