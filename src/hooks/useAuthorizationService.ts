import RegisterDto from "../models/DTO/RegisterDto";
import LoginResponseDto from "../models/DTO/LoginResponseDto";
import HttpClient from "../services/httpClient/HttpClient";

const useAuthorizationService = () => {

    return {
        login: (email: string, password: string) => {
            return HttpClient.post<LoginResponseDto>("/api/auth/login", {
                email: email,
                password: password
            }, undefined, false)
        },
        register: (registerDto: RegisterDto) => {
            return HttpClient.post<boolean>("/api/auth/register", registerDto)
        },
        resetPassword: (email: string, password: string, guid: string) => {
            return HttpClient.post<boolean>("/api/auth/resetPassword", {
                email : email,
                password: password,
                guid: guid
            })
        }
    }
}

export default useAuthorizationService;