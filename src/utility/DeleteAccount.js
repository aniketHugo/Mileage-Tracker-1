
const DeleteAccount = async (realm, userId) => {
    try { 
        console.log("Here")
        realm.write(() => {
            // Step 1: Query the user with the specified userId
            const user = realm.objectForPrimaryKey('User', userId);
            const auth = realm.objects('Authentication')[0];

            if (user) {
                // Step 2: Gather associated vehicles, refuel data, and performance data
                const vehicles = user.vehicles;
                // const refuelData = vehicles.flatMap((vehicle) => vehicle.refuelData);
                // const performanceData = vehicles.flatMap((vehicle) => vehicle.performanceData);

                // Step 3: Delete the user, vehicles, refuel data, and performance data
                // realm.delete(performanceData);
                // realm.delete(refuelData);
                realm.delete(vehicles);
                realm.delete(user);
                if (auth) {
                    realm.delete(auth);
                    console.log("Auth deleted");
                }
                else {
                    console.log("Auth does not exist")
                }
                console.log("Deleted ", userId);

            }
        });
        return {msg : "Deleted"};
    } catch (error) {
        console.error('Error deleting user data:', error);
    }
};

export default DeleteAccount;
