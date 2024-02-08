import React from 'react';
import { RealmProvider } from '@realm/react';
import Footer from './src/Navigation/Footer';
// import { AuthenticationSchema, RefuelDataSchema, UserSchema, VehicleSchema } from './src/Database/mySchema';
import Realm from 'realm';

import { User , Refuel , Vehicle,Authentication} from './src/Database/mySchema'

const SCHEMA_VERSION = 1; // Increment the schema version
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
const migrationFunction = (oldRealm, newRealm) => {
  // if (oldRealm.schemaVersion <= 2) {
  //   // Add the new field 'isLoggedIn' to the User schema
  //   const oldUsers = oldRealm.objects('User');
  //   const newUsers = newRealm.objects('User');

  //   for (let i = 0; i < oldUsers.length; i++) {
  //     newUsers[i].passCode = "skip"; // You can set a default value here
  //   }
  // }
  // if (oldRealm.schemaVersion <= 4) {
  //   // Add the new field 'isLoggedIn' to the User schema
  //   const oldUsers = oldRealm.objects('Vehicle');
  //   const newUsers = newRealm.objects('Vehicle');

  //   for (let i = 0; i < oldUsers.length; i++) {
  //     newUsers[i].vehicleImage = ""; // You can set a default value here
  //   }
  // }


  // if (oldRealm.schemaVersion < 4) {
  //   // Add the new field 'isLoggedIn' to the User schema
  //   const oldUsers = oldRealm.objects('Authentication');
  //   const newUsers = newRealm.objects('Authentication');

  //   for (let i = 0; i < oldUsers.length; i++) {
  //     newUsers[i].userId = false; // You can set a default value here
  //   }
  // }

};

const App = () => {
  return (

    <RealmProvider
      schema={[ User , Refuel , Vehicle,Authentication]}
      schemaVersion={SCHEMA_VERSION}
      // migration={migrationFunction}
    >
      <SafeAreaProvider>
      <Footer />
      </SafeAreaProvider>
    </RealmProvider>
  );
};

export default App;
