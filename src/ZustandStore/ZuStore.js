// userStore.js
import {create} from 'zustand';
import Realm from 'realm';
const UseUserStore = create((set) => ({
  selectedUserId: null,
  selectedUserName : null,
  refuelData : [],
  
  refuelSelectedVehicle : 'select',
  refuelSelectedVehicleId : null,
  
  vehicleLength : 0,
  refuelLength : 0,
  selectedVehicleImage : null,
//////////////////////////////////////////////////////
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  setRefuelData: (data) => set({ refuelData: data }),
  setSelectedUserName: (name) => set({ selectedUserName: name }),

  setRefuelSelectedVehicle: (name) => set({ refuelSelectedVehicle: name }),
  setRefuelSelectedVehicleId: (id) => set({ refuelSelectedVehicleId: id }),

  setVehicleLength: (len) => set({ vehicleLength: len }),
  setRefuelLength: (len) => set({ refuelLength: len }),
  setSelectedVehicleImage: (img) => set({ selectedVehicleImage: img }),
}));

export default UseUserStore;
