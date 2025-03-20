import { deleteCookie, getCookie } from "cookies-next";
import { create } from "zustand";

export enum Status {
    AUTHENTICATED = 'authenticated',
    UNAUTHENTICATED = 'unauthenticated',
    CHECKING = 'checking'
}

export interface User {
    id: string;
    username: string;
    email: string
}

interface State {
    user: User | null;
    status: Status;
    setStatus: (status: Status) => void;
    setUserData: (user: User) => void;
    resetAuth: () => void;
    checkAuthStatus: () => void;
    logout: () => void;
}

export const useAuthStore = create<State>()((set) => ({
    user: null,
    status: Status.UNAUTHENTICATED,
    setStatus: (status: Status) => set({ status }),

    setUserData: (user: User) => set({ user, status: Status.AUTHENTICATED }),

    resetAuth: () => set({ user: null, status: Status.UNAUTHENTICATED }),

    checkAuthStatus: async () => {
        const userInfo = await getCookie("UserInfo");
        console.log(userInfo)

        if (userInfo) {
            try {
                const parsedUser: User = JSON.parse(userInfo.toString());
                set({ user: parsedUser, status: Status.AUTHENTICATED });
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                set({ user: null, status: Status.UNAUTHENTICATED });
            }
        } else {
            set({ user: null, status: Status.UNAUTHENTICATED });
        }
    },

    logout: async () => {
        const deleteUserCookiePromise = deleteCookie('UserInfo');
        const deleteAuthCookiePromise = deleteCookie('Authentication');

        await Promise.all([
            deleteUserCookiePromise,
            deleteAuthCookiePromise
        ]);

        set({ user: null, status: Status.UNAUTHENTICATED });
    }
}))