import HttpClient from "../services/httpClient/HttpClient";

const useEmailService = () => {
    return {
        verify: (email: string, code: string) => {
            return HttpClient.post<boolean>("/api/email/verify", {
                email: email,
                guid: code
            })
        },
        sendVerify: (email: string) => {
            return HttpClient.get<boolean>("/api/email/sendVerify?" + (new URLSearchParams({ email: email })).toString())
        },
        sendResetPassword : (email: string) => {
            return HttpClient.post<boolean>("/api/email/sendResetPassword", {
                email: email
            })
        }
    }
}

export default useEmailService;