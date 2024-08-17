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
        put: (post: AddEditPostDto) => {
            return HttpClient.put<number>("/api/post", post, authContext?.token);
        },
        addPhotos: (id: number, photos: File[]) => {
            return HttpClient.postMultipartFormData(
                "/api/post/"+id+"/blob",
                [{key: "Files", value: photos}],
                authContext?.token)
        },
        updatePhotos: (id: number, photos: File[]) => {
            return HttpClient.putMultipartFormData(
                "/api/post/"+id+"/blob",
                [{key: "Files", value: photos}],
                authContext?.token)
        },
        deletePhotos: (id: number, paths: string[]) => {
            return HttpClient.delete("/api/post/"+id+"/blob", {paths: paths}, authContext?.token)
        },
        getDetailed: (
            postType?: EPostType,
            count: number = 0,
            startIndex: number = 0,
            search?: string,
            tagIds?: number[]) => {

            return HttpClient.get<PagedResponseDto<Post>>(
                "/api/post/detailed?count="+count+"&startIndex="+startIndex
                    +(postType ? "&posttype="+postType : "")
                    +(search ? "&search="+search : "")
                    +((tagIds && tagIds.length > 0) ? "&tagIds="+tagIds.join("%2B") : ""),
                authContext?.token);
        },
        get: (id: number) => {
            return HttpClient.get<Post>("/api/post/" + id, authContext?.token);
        },
        getOwn: () => {
            return HttpClient.get<Post[]>("/api/post/own", authContext?.token);
        }
    }
}

export default usePostService;