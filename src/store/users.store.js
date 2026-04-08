import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";




const useUsersStore = create(
    persist((set) => ({

        users : [],


        addUser: (newUser) => set((state) => ({
            users: [...state.users, newUser]
        })),

        resetDatabase: () => set({
            users: []
        })

    }), {
        name: "users-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export { useUsersStore };