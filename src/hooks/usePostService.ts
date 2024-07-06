import { useContext } from "react";
import HttpClient from "../services/httpClient/HttpClient";
import Context from "../contexts/AuthContext/AuthContext";
import AddEditPostDto from "../models/DTO/AddEditPostDto";
import File from "../models/File";

const usePostService = () => {

    const authContext = useContext(Context);

    return {
        post: (post: AddEditPostDto) => {
            return HttpClient.post<number>("/api/post", post, authContext?.token);
        },
        addPhotos: (id: number, photos: File[]) => {
            return HttpClient.postMultipartFormData(
                "/api/post/"+id+"/blob",
                [{key: "Files", value: photos}],
                authContext?.token)
        }
    }
}

export default usePostService;