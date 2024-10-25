import { UserType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: UserType;
  setUser: (user: UserType) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: {} as UserType,
      setUser: (user) => set(() => ({ user: user })),
    }),
    {
      name: "auth-storage",
    }
  )
);
