import { Tag } from "../models/Tag";
import useHttpClient from "./useHttpClient";

const useTagService = () => {
    const httpClient = useHttpClient()

    return {
        get: () => {
            return httpClient.get<Tag[]>("/api/tag", true)
        }
    }
}

export default useTagService