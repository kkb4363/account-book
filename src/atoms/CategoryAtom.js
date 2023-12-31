import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { defaultCategories } from '../components/category/\bcategories';

const { persistAtom } = recoilPersist({
  key: 'localstorage-category',
  storage: localStorage,
});

export const currentCategoriesAtom = atom({
  key: 'currentCategoriesAtom',
  default: defaultCategories,
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
