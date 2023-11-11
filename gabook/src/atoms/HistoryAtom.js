import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'his_local',
  storage: localStorage,
});

export const historyAtom = atom({
  key: 'historyatom',
  default: [],
  effects: [persistAtom],
});
