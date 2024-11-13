import Proof from "../models/Proof";
import File from "../models/File";
import SchoolProof from "../models/SchoolProof";
import VerifySchoolProofDto from "../models/DTO/VerifySchoolProofDto";
import useHttpClient from "./useHttpClient";

const useSchoolProofService = () => {
    
    const httpClient = useHttpClient()

    return {
        postSchoolProof: (schoolId: number, proof: File|undefined) => {
            return httpClient.postMultipartFormData("/api/schoolProof/send", [
                {
                    key: "SchoolId",
                    value: schoolId
                },
                {
                    key: "Files",
                    value: proof ? [proof] : undefined
                }
            ], true)
        },
        getOwn: () => {
            return httpClient.get<Proof[]>("/api/schoolProof/own", true)
        },
        getAll: () => {
            return httpClient.get<SchoolProof[]>("/api/schoolProof", true)
        },
        verify: (verifySchoolProof: VerifySchoolProofDto) => {
            return httpClient.post("/api/schoolProof/verify", verifySchoolProof, true)
        }
    }
}

export default useSchoolProofService