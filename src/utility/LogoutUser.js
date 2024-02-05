
const LogoutUser = async (realm, navigation, mystore) => {
    try {
        const auth = realm.objects('Authentication')[0];

        if (auth) {
            realm.write(() => {
                realm.delete(auth);
            });
            console.log("Auth deleted");
        }
        else {
            console.log("Auth does not exist")
        }
        console.log("Logged Out ", mystore.selectedUserId);

        mystore.setSelectedUserId(null)
        mystore.setSelectedUserName(null)
        mystore.setRefuelSelectedVehicleId(null)
        mystore.setRefuelSelectedVehicle('select')
        mystore.setRefuelData([]);
        mystore.setVehicleData([]);
        mystore.setVehicleLength(0);
        mystore.setRefuelLength(0);
        mystore.setSelectedVehicleImage(null);

        navigation.replace("LoginStack", { screen: "SignIn" })

        return { msg: "Logged Out" }

    } catch (error) {
        console.error('Error Logging out user data:', error);
        return { msg: "Not Logged Out" }

    }
};

export default LogoutUser;
