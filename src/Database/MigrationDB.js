import Realm from 'realm';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from '../Database/mySchema';

const SCHEMA_VERSION = 3; // Update the version number whenever you make changes to the schema

export const MigrationDB = async () => {
  const realmConfig = {
    path: 'default.realm',
    schema: [PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema],
    schemaVersion: SCHEMA_VERSION,
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion < 2) {
        // Perform migration steps for version 1 to version 2
        const oldObjects = oldRealm.objects('RefuelData');
        const newObjects = newRealm.objects('RefuelData');

        for (let i = 0; i < oldObjects.length; i++) {
          const oldObject = oldObjects[i];
          const newObject = newObjects[i];

          newObject.refuelDate = new Date(); // Replace with actual migration logic for refuelDate
          newObject.startReading = 0; // Replace with actual migration logic for startReading
          newObject.endReading = 0; // Replace with actual migration logic for endReading
          newObject.consumed = 0; // Replace with actual migration logic for consumed
          newObject.price = 0; // Replace with actual migration logic for price
        }
      }
    },
  };

  // Open the realm with the specified configuration
  const realm = await Realm.open(realmConfig);
  
  // Perform any additional logic after opening the realm if needed

  // Close the realm
  realm.close();
};

// Call the migration function when the app starts
MigrationDB();
