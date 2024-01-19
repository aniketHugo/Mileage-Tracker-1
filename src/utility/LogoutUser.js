import Realm from 'realm';
import UseUserStore from '../ZustandStore/ZuStore';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from '../Database/mySchema';
const LogoutUser = async (realm) => {
    try {
        const selectedUserId = UseUserStore((state) => state.selectedUserId);
        const user = await realm.objectForPrimaryKey('User', selectedUserId);

        // const selectedUserName = UseUserStore((state) => state.selectedUserName);
        const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
        const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);
        realm.write(() => {
            if (user) {
                user.isLoggedIn = false;
                console.log(`User with ID ${selectedUserId} logged out (updated)`);

            } else {
                console.error(`User with ID ${userId} not found.`);
            }
        });
        setSelectedUserId(null);
        setSelectedUserName(null);
        return 1;

    } catch (error) {
        console.error('Error updating user logout status:', error);
        return 0;
    }
};


export default LogoutUser;
