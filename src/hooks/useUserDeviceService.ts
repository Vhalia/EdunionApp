import { useContext } from "react";
import Context from "../contexts/AuthContext/AuthContext";
import HttpClient from "../services/httpClient/HttpClient";

const useUserDeviceService = () => {

    const authContext = useContext(Context);

    return {
        register: (token: string) => {
            return HttpClient.post("/api/userDevice/register", {
                deviceToken: token
            },
            authContext?.token)
        },
    }
}

export default useUserDeviceService;