import useHttpClient from "./useHttpClient"

const useEmailService = () => {
    const httpClient = useHttpClient()

    return {
        verify: (email: string, code: string) => {
            return httpClient.post<boolean>("/api/email/verify", {
                email: email,
                guid: code
            })
        },
        sendVerify: (email: string) => {
            return httpClient.get<boolean>("/api/email/sendVerify?" + (new URLSearchParams({ email: email })).toString())
        },
        sendResetPassword : (email: string) => {
            return httpClient.post<boolean>("/api/email/sendResetPassword", {
                email: email
            })
        }
    }
}

export default useEmailService;