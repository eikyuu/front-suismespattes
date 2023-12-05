import { create } from 'zustand'

export const useHandleAuth = create<{
    isAuth: boolean;
    toggle: () => void;
}>((set) => ({
    isAuth: false,
    toggle: () => set((state) => ({
        isAuth: !state.isAuth
    }))
}))