import { useContext } from "react";
import HttpClient from "../services/httpClient/HttpClient";
import Context from "../contexts/AuthContext/AuthContext";
import AddEditPostDto from "../models/DTO/AddEditPostDto";
import File from "../models/File";
import EPostType from "../models/enums/EPostType";
import { PagedResponseDto } from "../models/DTO/PagedResponseDto";
import Post from "../models/Post";

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
        },
        getDetailed: (
            postType?: EPostType,
            count: number = 0,
            startIndex: number = 0,
            search?: string,
            tagIds?: number[]) => {

            return HttpClient.get<PagedResponseDto<Post>>(
                "/api/post/detailed?count="+count+"&startIndex="+startIndex
                    +(postType ? "&type="+postType : "")
                    +(search ? "&search="+search : "")
                    +(tagIds ? "&tagIds="+tagIds.join("%2B") : ""),
                authContext?.token);
        }
    }
}

export default usePostService;