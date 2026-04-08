import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";




const useUsersStore = create(
    persist((set) => ({

        users: [
            {
                "id": 0,
                "fullName": "kinesh",
                "username": "kinesh",
                "email": "kinesh@yopmail.com",
                "password": "12345678",
                "confirmPassword": "12345678",
                "companyName": "test1",
                "organizationType": "startup",
                "industryType": "it",
                "teamSize": "1-10",
                "yearOfEst": "2003",
                "about": "Good Company, great culture",
                "location": "Mumbai, IN",
                "contact": "912423423432",
                "companyEmail": "kinesh2@yopmail.com",
                "setupCompleted": true
            }
        ],

        addUser: (newUser) => set((state) => ({
            users: [...state.users, newUser]
        })),

        updateUser: (user) => set((state) => ({
            users: state.users.map((u) => {
                if (u.id === user.id) {
                    return {
                        ...u,
                        ...user
                    }
                }
                return user
            })
        })),
        resetUsersDatabase: () => set({
            users: []
        })

    }), {
        name: "users-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export { useUsersStore };