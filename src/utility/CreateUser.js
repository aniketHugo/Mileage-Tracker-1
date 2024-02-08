import Realm from "realm";
const CreateUser = async (realm, name, nickname, passCode, email,mystore) => {
  try {
    // console.log("Craete user fun props", name, nickname, passCode, email)
    const auth = realm.objects('Authentication')[0];
    const userId = new Realm.BSON.ObjectId();

    // console.log(typeof(userId))

    realm.write(() => {
      realm.create('User', {
        id: userId,
        name: name,
        nickName: nickname,
        passCode: passCode,
        email: email,
      });

      if (auth) {
        auth.name = name;
        auth.userId = userId;
        auth.email = email;
        auth.nickName = nickname;
        auth.passCode = passCode;
        // console.log(`User with ID ${userId} LoggedIn (updated)`);
        // console.log('Auth updated')
      } else {
        const AuthId = new Realm.BSON.ObjectId();
        const newAuth = {
          id: AuthId,
          userId: userId,
          name: name,
          email: email,
          nickName: nickname,
          passCode: passCode,
        };
        // Add the new vehicle to the Vehicle schema
        realm.create('Authentication', newAuth);
        console.log('Auth created')
      }
    });


      mystore.setSelectedUserId(userId)
      mystore.setSelectedUserName(name)
      mystore.setRefuelSelectedVehicleId(null)
      mystore.setRefuelSelectedVehicle('select')
      mystore.setSelectedVehicleImage(null)
      mystore.setVehicleLength(0);

    console.log("User created")
    const data = { msg : "User Created" };
    return data;
  } catch (error) {
    console.error('Error in creating users:', error);
  }
};


export default CreateUser;
