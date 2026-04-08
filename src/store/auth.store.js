import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
    persist((set) => ({

    user: null,
    isAuthenticated: false,

    login: ((user) => set({
        user,
        isAuthenticated: true
    })),

    logout: (() => set({
        user: null,
        isAuthenticated: false
    }))
}),
{
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
}))

export { useAuthStore };