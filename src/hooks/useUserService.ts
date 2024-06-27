import { useContext } from "react";
import User from "../models/User";
import HttpClient from "../services/httpClient/HttpClient";
import Context from "../contexts/AuthContext/AuthContext";
import UpdateProfileDto from "../models/DTO/UpdateProfileDto";

const useUserService = () => {

    const authContext = useContext(Context);

    return {
        get: () => {
            return HttpClient.get<User>("/api/user", authContext?.token)
        },
        update: (updateProfileDto: UpdateProfileDto) => {
            return HttpClient.put("/api/user/profile", updateProfileDto, authContext?.token)
        }
    }
}

export default useUserService;