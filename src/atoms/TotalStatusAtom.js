import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localstorage-totalStatus",
  storage: localStorage,
});

export const totalStatusAtom = atom({
  key: "totalStatusAtom",
  default: [],
  effects: [persistAtom],
});
