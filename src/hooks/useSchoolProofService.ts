import { useContext } from "react"
import Context from "../contexts/AuthContext/AuthContext";
import HttpClient from "../services/httpClient/HttpClient";
import SchoolProof from "../models/SchoolProof";

const useSchoolProofService = () => {
    const authContext = useContext(Context);
    
    return {
        postSchoolProof: (schoolId: number, proof: string) => {
            return HttpClient.postMultipartFormData("/api/schoolProof/send", [
                {
                    key: "SchoolId",
                    value: schoolId
                },
                {
                    key: "Files",
                    value: proof
                }
            ], authContext?.token)
        },
        getOwn: () => {
            return HttpClient.get<SchoolProof[]>("/api/schoolProof/own", authContext?.token)
        }
    }
}

export default useSchoolProofService