import useHttpClient from "./useHttpClient";

const useUserDeviceService = () => {
    const httpClient = useHttpClient()

    return {
        register: (token: string) => {
            return httpClient.post("/api/userDevice/register", {
                deviceToken: token
            },
            true)
        },
    }
}

export default useUserDeviceService;