import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

type AuthState = {
  auth: Record<string, any>;
  setAuth: (payload: Record<string, any>) => void;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: {},
      setAuth: (payload) => {
        const authData = {
          ...(payload?.data ? jwtDecode(payload.data) : {}),
          status: payload?.status,
          message: payload?.message,
          error: payload?.error,
        };
        set({ auth: authData });
        localStorage.setItem('accessToken', JSON.stringify(payload?.data || ''));
      },
    }),
    {
      name: `auth`,
      storage: createJSONStorage(() => storage),
    }
  )
);

// Usage: const { auth, setAuth } = useAuthStore()
