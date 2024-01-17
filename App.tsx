import React, { useEffect } from 'react';
import { RealmProvider } from '@realm/react';
import Footer from './src/Navigation/Footer';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from './src/Database/mySchema';

const SCHEMA_VERSION = 1;

const App = () => {
  return (
    <RealmProvider schema={[PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema]}>
      <Footer />
    </RealmProvider>
  );
};

export default App;
