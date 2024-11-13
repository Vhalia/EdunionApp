import User from "../models/User";
import HttpClient from "../services/httpClient/HttpClient";
import UpdateProfileDto from "../models/DTO/UpdateProfileDto";
import File from "../models/File";
import useHttpClient from "./useHttpClient";

const useUserService = () => {
    const httpClient = useHttpClient()

    return {
        get: () => {
            return httpClient.get<User>("/api/user", true)
        },
        getById: (id: number) => {
            return httpClient.get<User>("/api/user/"+id, true)
        },
        getAll: () => {
            return httpClient.get<User[]>("/api/user/all", true)
        },
        ban : (id: number) => {
            return httpClient.put("/api/user/ban/"+id, {}, true)
        },
        unban : (id: number) => {
            return httpClient.put("/api/user/unban/"+id, {}, true)
        },
        update: (updateProfileDto: UpdateProfileDto) => {
            return httpClient.put("/api/user/profile", updateProfileDto, true)
        },
        updateProfilePicture: (picture?: File) => {
            return httpClient.putMultipartFormData(
                "/api/user/profile/picture",
                [{key: "File", value: picture}],
                true)
        }
    }
}

export default useUserService;