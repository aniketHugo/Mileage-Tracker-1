const OpenApp = async (realm,UseUserStore) => {
    try {
        const selectedUserId = UseUserStore((state) => state.selectedUserId);
        const selectedUserName = UseUserStore((state) => state.selectedUserName);
        const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
        const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);
        const user = realm.objects('Authentication')[0];
        console.log('Auth status user :- ',user);
        if(user){
            const wt = await setSelectedUserId(user.userId)
            const wt2 = await setSelectedUserName(user.name)
            return user;
        }
        else{
            console.warn('No user found')
            return false;
        }

    } catch (error) {
        console.error('Error getting users', error);
    }
};


export default OpenApp;
