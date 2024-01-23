const LoginUser = async (realm,navigation, userId,passCode,from) => {
    try {
        
        const user = realm.objectForPrimaryKey('User', userId);
        const auth = realm.objects('Authentication')[0];
        console.log("curren :- ",user )
        if(user.passCode != "" && from == "signIn"){
            navigation.navigate('EnterPassCode',{data : {
                userId : userId
            }});
            return "Navigate to enter Passcode";
        }
        else if(user.passCode != ""){
            console.log("Entered :- ",passCode)
            if(user.passCode != passCode){
                return "wrong passcode entered";
            }
            else[
                console.log("correct")
            ]
        }

        realm.write(() => {
            if (auth) {
                auth.name = user.name;
                auth.userId = user.id;
                auth.email = user.email; 
                auth.isLoggedIn = user.isLoggedIn;
                auth.nickName = user.nickName;
                auth.passCode = '2222';
                
                console.log(`User with ID ${userId} LoggedIn (updated)`);
                console.log('Auth updated')
            } else {
                    const newAuth = {
                        id: generateUniqueId(),
                        name : user.name,
                        userId : user.id,
                        email : user.email,
                        isLoggedIn : user.isLoggedIn,
                        nickName : user.nickName,
                        passCode : '2222',
                    };
                    // Add the new vehicle to the Vehicle schema
                    realm.create('Authentication', newAuth);
                    console.log('Auth created')
            }
        });
        return "Ok"
    } catch (error) {
        console.error('Error updating user login status:', error);
    }
};
const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


export default LoginUser;
