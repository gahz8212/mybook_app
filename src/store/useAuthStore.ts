import { create } from "zustand";
// import { persist } from "zustand/middleware";
import api from "../lib/axios";

interface UserState {
  userName: string | null;
  roles: string[];
  isLoggedIn: boolean;
  setLogin: (data: { userName: string; roles: string[] }) => void;
  setLogout: () => void;
}

export const useAuthStore = create<UserState>()(
  // persist(
  // ),
  (set) => ({
   
    userName: null,
    roles: [],
    isLoggedIn: false,
    
    setLogin: (data) => {
      const { userName, roles } = data;
      set({
        userName,
        roles,
        isLoggedIn: true,
      });
    },
    setLogout: async () => {
      try {
        await api.post("/api/logout");
      } catch (e) {
        console.error("로그아웃 서버 통신 실패", e);
      } finally {
        set({
          userName: null,
          roles: [],
          isLoggedIn: false,
        });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    },
  }),
);

export default useAuthStore;
