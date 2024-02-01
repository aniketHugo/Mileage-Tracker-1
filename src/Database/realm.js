import { AuthenticationSchema, RefuelDataSchema, UserSchema, VehicleSchema } from './mySchema';

const Realm = require("realm");

const realmConfig = {
    schema: [ AuthenticationSchema, RefuelDataSchema, UserSchema, VehicleSchema],
    schemaVersion: 1,
};

const realm = new Realm(realmConfig);

export default realm; 