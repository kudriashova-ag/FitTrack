import { create } from 'zustand'

type UIStore = {
    isAddWorkoutModalOpen: boolean,
    openAddWorkoutModal: () => void,
    closeAddWorkoutModal: () => void,
}


export const useUIStore = create<UIStore>((set) => ({
    isAddWorkoutModalOpen: false,
    openAddWorkoutModal: () => set({ isAddWorkoutModalOpen: true }),
    closeAddWorkoutModal: () => set({ isAddWorkoutModalOpen: false }),
}) )