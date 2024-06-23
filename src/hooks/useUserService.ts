import { useContext } from "react";
import User from "../models/User";
import HttpClient from "../services/httpClient/HttpClient";
import Context from "../contexts/AuthContext/AuthContext";

const useUserService = () => {

    const authContext = useContext(Context);

    return {
        get: () => {
            return HttpClient.get<User>("/api/user", authContext?.token)
        }
    }
}

export default useUserService;