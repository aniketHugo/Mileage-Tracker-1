
export const UserSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      nickName: 'string',
      email: 'string',
      isLoggedIn: { type: 'bool', default: false }, 
      vehicles: { type: 'linkingObjects', objectType: 'Vehicle', property: 'user' },
    },
  };
  
  export const VehicleSchema = {
    name: 'Vehicle',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      vehicleType: 'string',
      engineCC: 'int',
      user: 'User',
      refuelData: { type: 'linkingObjects', objectType: 'RefuelData', property: 'vehicle' },
      performanceData: { type: 'linkingObjects', objectType: 'PerformanceData', property: 'vehicle' },
    },
  };
  
  export const RefuelDataSchema = {
    name: 'RefuelData',
    primaryKey: 'id',
    properties: {
      id: 'string',
      refuelDate: 'string',      // Change 'date' to the actual type for refuelDate
      startReading: 'float',   // Change 'float' to the actual type for startReading
      endReading: 'float',     // Change 'float' to the actual type for endReading
      consumed: 'float',       // Change 'float' to the actual type for consumed
      price: 'float',          // Change 'float' to the actual type for price
      vehicle: 'Vehicle',
    },
  };
  export const PerformanceDataSchema = {
    name: 'PerformanceData',
    primaryKey: 'id',
    properties: {
      id: 'string',
      date: 'date',
      mileage: 'float',
      vehicle: 'Vehicle',
    },
  };
  

  export const AuthenticationSchema = {
    name: 'Authentication',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      userId : 'string',
      nickName: 'string',
      passCode : 'string',
      email: 'string',
      isLoggedIn: { type: 'bool', default: false }, 
    },
  };