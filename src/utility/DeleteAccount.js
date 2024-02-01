
const DeleteAccount = async (realm, mystore) => {
    try {
        console.log("Here")
        // Step 1: Query the user with the specified mystore.userId
        const user = realm.objectForPrimaryKey('User', mystore.selectedUserId);
        const vehicles = realm.objects('Vehicle').filtered('userId = $0', (mystore.selectedUserId).toString());
        const refuel = realm.objects('Refuel').filtered('userId = $0', (mystore.selectedUserId).toString());
        const auth = realm.objects('Authentication')[0];

        if (user) {
            realm.write(() => {
                realm.delete(vehicles);
                realm.delete(user);
                realm.delete(refuel);
            });
            if (auth) {
                realm.delete(auth);
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

        }
        return { msg: "Deleted" };
    } catch (error) {
        console.error('Error deleting user data:', error);
    }
};

export default DeleteAccount;
