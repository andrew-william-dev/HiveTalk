import axios from "axios";
import type { LoginType, SignUpType } from "../constants/types/auth";
import { AUTH_LOGIN, AUTH_SIGNUP } from "../constants/api/endpoints";

export const useLogin = (args: LoginType) => {
    return axios.post(import.meta.env.VITE_APP_BACKEND_URL+AUTH_LOGIN,
        {
            ...args
        }
    )
}

export const useSignup = (args: SignUpType) => {
    return axios.post(import.meta.env.VITE_APP_BACKEND_URL+AUTH_SIGNUP,
        {
            ...args
        }
    )
}

