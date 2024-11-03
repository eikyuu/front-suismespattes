import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Définition du type pour l'état du store
interface AuthState {
  isAuth: boolean;
  toggle: () => void;
}

// Création du store avec le middleware `persist`
export const useHandleAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      toggle: () => set((state) => ({
        isAuth: !state.isAuth,
      })),
    }),
    {
      name: 'auth-storage', // clé dans le local storage
    }
  )
);
