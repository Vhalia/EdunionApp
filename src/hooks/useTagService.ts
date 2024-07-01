import { useContext } from "react";
import Context from "../contexts/AuthContext/AuthContext"
import HttpClient from "../services/httpClient/HttpClient";
import { Tag } from "../models/Tag";

const useTagService = () => {
    const authContext = useContext(Context);

    return {
        get: () => {
            return HttpClient.get<Tag[]>("/api/tag", authContext?.token)
        }
    }
}

export default useTagService