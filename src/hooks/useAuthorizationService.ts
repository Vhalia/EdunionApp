import RegisterDto from "../models/DTO/RegisterDto";
import LoginResponseDto from "../models/DTO/LoginResponseDto";
import useHttpClient from "./useHttpClient";

const useAuthorizationService = () => {

    const httpClient = useHttpClient()

    return {
        login: (email: string, password: string) => {
            return httpClient.post<LoginResponseDto>("/api/auth/login", {
                email: email,
                password: password
            })
        },
        register: (registerDto: RegisterDto) => {
            return httpClient.post<boolean>("/api/auth/register", registerDto)
        },
        resetPassword: (email: string, password: string, guid: string) => {
            return httpClient.post<boolean>("/api/auth/resetPassword", {
                email : email,
                password: password,
                guid: guid
            })
        }
    }
}

export default useAuthorizationService;