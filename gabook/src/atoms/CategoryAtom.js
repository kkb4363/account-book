import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'local',
  storage: localStorage,
});

export const currentCategoriesAtom = atom({
  key: 'currentCategoriesAtomkey',
  default: [],
  effects: [persistAtom],
});

export const currentCategoryAtom = atom({
  key: 'currentCategoryAtom',
  default: {
    icons: '',
    text: '',
  },
  effects: [persistAtom],
});
