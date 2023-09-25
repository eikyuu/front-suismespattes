import { create } from 'zustand'

export const useHandleModal = create<{
    isOpen: boolean;
    toggle: () => void;
}>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({
        isOpen: !state.isOpen
    }))
}))