import { create } from 'zustand';
import { UserData } from '@/typings';
import { chromeStorage } from '@/services/chromeStorage';
import { SPOT_USER_DATA } from '@/utils/storageKeys';

interface UserState {
  user: UserData;
  isLoadingUser: boolean;
  fetchUser: () => void;
  updateUser: (user: UserData) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoadingUser: true,
  fetchUser: async () => {
    set({ isLoadingUser: true });

    const user = await chromeStorage.get<UserData>(SPOT_USER_DATA);
    if (user) {
      set({ user });
    }

    set({ isLoadingUser: false });
  },
  updateUser: async (user: UserData) => {
    await chromeStorage.set(SPOT_USER_DATA, user);
    set({ user });
  },
}));
