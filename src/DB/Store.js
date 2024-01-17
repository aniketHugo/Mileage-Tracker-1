// store.js
import {create} from 'zustand';
import Realm from 'realm';

const realm = new Realm({
  schema: [{ name: 'AppState', properties: { count: 'int' } }],
});

const useStore = create((set) => ({
  count: realm.objects('AppState')[0]?.count || 0,
  increment: () => {
    realm.write(() => {
      const appState = realm.objects('AppState')[0];
      if (appState) {
        appState.count += 1;
      } else {
        realm.create('AppState', { count: 1 });
      }
    });

    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    realm.write(() => {
      const appState = realm.objects('AppState')[0];
      if (appState && appState.count > 0) {
        appState.count -= 1;
      }
    });

    set((state) => ({ count: Math.max(state.count - 1, 0) }));
  },
}));

export default useStore;
