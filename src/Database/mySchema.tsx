import Realm from "realm";
import { BSON } from 'realm';


export class User extends Realm.Object<User> {
  id!: BSON.ObjectId;
  static schema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
      id: 'objectId',
      name: 'string',
      email: 'string',
      nickName: 'string',
      passCode: { type: 'string', default: '' },
    },
    primaryKey: 'id',
  };
}


export class Vehicle extends Realm.Object<Vehicle> {
  id!: BSON.ObjectId;
  static schema: Realm.ObjectSchema = {
    name: 'Vehicle',
    properties: {
      userId: 'string',
      id: 'objectId',
      name: 'string',
      vehicleType: 'string',
      engineCC: 'int',
      vehicleImage: 'string',
    },
    primaryKey: 'id',
  };
}


export class Refuel extends Realm.Object<Refuel> {
  id!: BSON.ObjectId;
  static schema: Realm.ObjectSchema = {
    name: 'Refuel',
    properties: {
      id: 'objectId',
      refuelDate: 'date',
      refuelAddDate: 'date',
      vehicleName : 'string',
      startReading: 'double',
      endReading: 'double',
      price: 'double',
      consumed: 'double',
      vehicleId: 'string',
      userId: 'string',
    },
    primaryKey: 'id',
  };
}


export class Authentication extends Realm.Object<Authentication> {
  id!: BSON.ObjectId;
  static schema: Realm.ObjectSchema = {
    name: 'Authentication',
    properties: {
      id: 'objectId',
      userId: 'objectId',
      name: 'string',
      nickName: 'string',
      passCode: 'string',
      email: 'string',
    },
    primaryKey: 'id',
  };
}


