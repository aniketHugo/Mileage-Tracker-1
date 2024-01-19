import React from 'react';
import { RealmProvider } from '@realm/react';
import Footer from './src/Navigation/Footer';
import { AuthenticationSchema, PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from './src/Database/mySchema';
import Realm from 'realm';

const SCHEMA_VERSION = 1; // Increment the schema version

// const migrationFunction = (oldRealm, newRealm) => {
  // if (oldRealm.schemaVersion < 2) {
  //   // Add the new field 'isLoggedIn' to the User schema
  //   const oldUsers = oldRealm.objects('User');
  //   const newUsers = newRealm.objects('User');

  //   for (let i = 0; i < oldUsers.length; i++) {
  //     newUsers[i].isLoggedIn = false; // You can set a default value here
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

// };

const App = () => {
  return (
    <RealmProvider
      schema={[PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema,AuthenticationSchema]}
      schemaVersion={SCHEMA_VERSION}
      // migration={migrationFunction}
    >
      <Footer />
    </RealmProvider>
  );
};

export default App;
