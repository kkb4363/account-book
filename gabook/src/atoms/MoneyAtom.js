import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'local_money',
  storage: localStorage,
});

export const moneyAtom = atom({
  key: 'moneyAtomKey',
  default: '',
  effects: [persistAtom],
});
