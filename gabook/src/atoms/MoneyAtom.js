import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'localstorage-money',
  storage: localStorage,
});

export const moneyAtom = atom({
  key: 'moneyAtom',
  default: '',
  effects: [persistAtom],
});
