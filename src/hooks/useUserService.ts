import { useContext } from "react";
import User from "../models/User";
import HttpClient from "../services/httpClient/HttpClient";
import Context from "../contexts/AuthContext/AuthContext";
import UpdateProfileDto from "../models/DTO/UpdateProfileDto";
import File from "../models/File";

const useUserService = () => {

    const authContext = useContext(Context);

    return {
        get: () => {
            return HttpClient.get<User>("/api/user", authContext?.token)
        },
        getById: (id: number) => {
            return HttpClient.get<User>("/api/user/"+id, authContext?.token)
        },
        getAll: () => {
            return HttpClient.get<User[]>("/api/user/all", authContext?.token)
        },
        ban : (id: number) => {
            return HttpClient.put("/api/user/ban/"+id, {}, authContext?.token)
        },
        unban : (id: number) => {
            return HttpClient.put("/api/user/unban/"+id, {}, authContext?.token)
        },
        update: (updateProfileDto: UpdateProfileDto) => {
            return HttpClient.put("/api/user/profile", updateProfileDto, authContext?.token)
        },
        updateProfilePicture: (picture?: File) => {
            return HttpClient.putMultipartFormData(
                "/api/user/profile/picture",
                [{key: "File", value: picture}],
                authContext?.token)
        }
    }
}

export default useUserService;