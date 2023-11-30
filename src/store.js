import { create } from 'zustand';

const useStore = create((set) => ({
  heroes: [],
  setHeroes: (heroes) => set({ heroes }),
}));

export { useStore };

