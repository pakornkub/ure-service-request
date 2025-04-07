import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

type SettingState = {
  setting: Record<string, any>;
  setSetting: (payload: Record<string, any>) => void;
};

const storage: StateStorage = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    return str ? JSON.parse(str) : {};
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      setting: {},
      setSetting: (payload) =>
        set((state) => ({
          setting: { ...state.setting, ...payload },
        })),
    }),
    {
      name: `${import.meta.env.VITE_KEY_STORAGE}`,
      storage: createJSONStorage(() => storage),
    }
  )
);

// Usage: const { setting, setSetting } = useSettingStore()
