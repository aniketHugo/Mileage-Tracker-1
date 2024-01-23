// userStore.js
import {create} from 'zustand';
import Realm from 'realm';
const UseUserStore = create((set) => ({
  selectedUserId: null,
  selectedUserName : null,
  vehicleLength : 0,
  refuelSelectedVehicle : 'select',
  refuelSelectedVehicleId : null,
  selectedVehicleImage : null,
  setRefuelSelectedVehicleId: (id) => set({ refuelSelectedVehicleId: id }),
  setSelectedVehicleImage: (img) => set({ selectedVehicleImage: img }),
  setRefuelSelectedVehicle: (name) => set({ refuelSelectedVehicle: name }),
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  setVehicleLength: (len) => set({ vehicleLength: len }),
  setSelectedUserName: (name) => set({ selectedUserName: name }),
}));

export default UseUserStore;
