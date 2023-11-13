import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'localstorage-history',
  storage: localStorage,
});

export const historyAtom = atom({
  key: 'historyAtom',
  default: [],
  effects: [persistAtom],
});
