import {UserModel} from "@/api/user/user.response.ts";
import {create} from "zustand";

interface UserStore {
  user?: UserModel;
  setUser: (user: UserModel) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: function (user: UserModel) {
    set({user: user});
  },
  resetUser: function () {
    set({user: undefined});
  }
}));