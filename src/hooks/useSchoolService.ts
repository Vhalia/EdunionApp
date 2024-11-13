import School from "../models/School";
import useHttpClient from "./useHttpClient";

const useSchoolService = () => {
    const httpClient = useHttpClient()

    return {
        get: () => {
            return httpClient.get<School[]>("/api/school", true)
        },
        getById: (id: number) => {
            return httpClient.get<School>("/api/school/" + id, true)
        }
    }
}

export default useSchoolService;