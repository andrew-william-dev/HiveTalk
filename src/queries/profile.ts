import axios from "axios";
import { UPDATE_PROFILE, GET_PROFILE } from "../constants/api/endpoints";

export const useUpdateProfile = (args : FormData) => {
    return axios.put(import.meta.env.VITE_APP_BACKEND_URL+UPDATE_PROFILE,
        args,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    )
}

export const useGetProfile = (arg: string) => {
    return axios.get(import.meta.env.VITE_APP_BACKEND_URL+GET_PROFILE,
        {
           params: 
           {
            username: arg
           }
        }
    )
}
