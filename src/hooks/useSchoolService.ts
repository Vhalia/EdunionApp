import { useContext } from "react";
import HttpClient from "../services/httpClient/HttpClient";
import Context from "../contexts/AuthContext/AuthContext";
import School from "../models/School";

const useSchoolService = () => {
    const authContext = useContext(Context);

    return {
        get: () => {
            return HttpClient.get<School[]>("/api/school", authContext?.token)
        },
        getById: (id: number) => {
            return HttpClient.get<School>("/api/school/" + id, authContext?.token)
        }
    }
}

export default useSchoolService;