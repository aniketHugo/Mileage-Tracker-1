
const CreateUser = async (realm,name,nickname,passCode,email) => {
  try {
    console.log("Craete user fun props" , name,nickname,passCode,email)
    const auth = realm.objects('Authentication')[0];
    const userId = `${name}_${Date.now()}`; // You might want to generate a unique ID
    realm.write(() => {
      realm.create('User', {
        id: userId,
        name: name,
        nickName: nickname,
        passCode : passCode,
        email: email,
      });
    // }); 

    // realm.write(() => {
      if (auth) {
          auth.name = name;
          auth.userId = userId;
          auth.email = email;
          auth.isLoggedIn = false;
          auth.nickName = nickname;
          auth.passCode = passCode;
          console.log(`User with ID ${userId} LoggedIn (updated)`);
          console.log('Auth updated')
      } else {
              const newAuth = {
                  id: generateUniqueId(),
                  userId : userId,
                  name : name,
                  email : email,
                  isLoggedIn : false,
                  nickName : nickname,
                  passCode : passCode,
              };
              // Add the new vehicle to the Vehicle schema
              realm.create('Authentication', newAuth);
              console.log('Auth created')
      }
  });
    // const allUsers = realm.objects('User');
    // allUsers.forEach((user) => {
    //   console.log('User ID:', user.id);
    //   console.log('User Name:', user.name);
    //   console.log('User Nickname:', user.nickName);
    //   console.log('User Email:', user.email);
    //   // Add more properties as needed
    // });

//   Log the contents of the User schema
  // console.log('Users in Realm:', allUsers);
  console.log("User created")
    const data = {userId : userId, name : name};
    return data;
  } catch (error) {
    console.error('Error in creating users:', error);
  }
};

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
export default CreateUser;
