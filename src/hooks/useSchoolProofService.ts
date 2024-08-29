import { useContext } from "react"
import Context from "../contexts/AuthContext/AuthContext";
import HttpClient from "../services/httpClient/HttpClient";
import Proof from "../models/Proof";
import File from "../models/File";
import SchoolProof from "../models/SchoolProof";
import VerifySchoolProofDto from "../models/DTO/VerifySchoolProofDto";

const useSchoolProofService = () => {
    const authContext = useContext(Context);
    
    return {
        postSchoolProof: (schoolId: number, proof: File|undefined) => {
            return HttpClient.postMultipartFormData("/api/schoolProof/send", [
                {
                    key: "SchoolId",
                    value: schoolId
                },
                {
                    key: "Files",
                    value: proof ? [proof] : undefined
                }
            ], authContext?.token)
        },
        getOwn: () => {
            return HttpClient.get<Proof[]>("/api/schoolProof/own", authContext?.token)
        },
        getAll: () => {
            return HttpClient.get<SchoolProof[]>("/api/schoolProof", authContext?.token)
        },
        verify: (verifySchoolProof: VerifySchoolProofDto) => {
            return HttpClient.post("/api/schoolProof/verify", verifySchoolProof, authContext?.token)
        }
    }
}

export default useSchoolProofService