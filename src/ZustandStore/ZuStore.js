// userStore.js
import {create} from 'zustand';
import Realm from 'realm';
const UseUserStore = create((set) => ({
  selectedUserId: null,
  selectedUserName : null,
  refuelData : [],
  vehicleData : [],
  
  refuelSelectedVehicle : 'select',
  refuelSelectedVehicleId : null,
  vehicleType : '2 Wheeler',
  
  vehicleLength : 0,
  // refuelLength : 0,
  selectedVehicleImage : null,

  
//////////////////////////////////////////////////////
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  setRefuelData: (data) => set({ refuelData: data }),
  setVehicleData: (data) => set({ vehicleData: data }),
  
  setSelectedUserName: (name) => set({ selectedUserName: name }),

  setRefuelSelectedVehicle: (name) => set({ refuelSelectedVehicle: name }),
  setRefuelSelectedVehicleId: (id) => set({ refuelSelectedVehicleId: id }),

  setVehicleLength: (len) => set({ vehicleLength: len }),
  setRefuelLength: (len) => set({ refuelLength: len }),
  setVehicleType: (len) => set({ vehicleType: len }),
  setSelectedVehicleImage: (img) => set({ selectedVehicleImage: img }),
}));

export default UseUserStore;


/*
user
vehicle
all Vehicle Array
Refuel Data Array

*/