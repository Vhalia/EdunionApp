import AddEditPostDto from "../models/DTO/AddEditPostDto";
import File from "../models/File";
import EPostType from "../models/enums/EPostType";
import { PagedResponseDto } from "../models/DTO/PagedResponseDto";
import Post from "../models/Post";
import useHttpClient from "./useHttpClient";
import Toast from "react-native-toast-message";
import ApiError from "../models/ApiError";

const usePostService = () => {
    const httpClient = useHttpClient()

    const handlePostUpdateError = (error: ApiError, fallback: () => void) => {
        if (error.error.includes("future date")){
            Toast.show({
                type: "error",
                text1: "Les horaires doivent être dans le futur."
            })
        }else{
            fallback()
        }
    }

    return {
        post: (post: AddEditPostDto) => {
            return httpClient.post<number>("/api/post", post, true, handlePostUpdateError);
        },
        put: (post: AddEditPostDto) => {
            return httpClient.put<number>("/api/post", post, true, handlePostUpdateError);
        },
        addPhotos: (id: number, photos: File[]) => {
            return httpClient.postMultipartFormData(
                "/api/post/"+id+"/blob",
                [{key: "Files", value: photos}],
                true)
        },
        updatePhotos: (id: number, photos: File[]) => {
            return httpClient.putMultipartFormData(
                "/api/post/"+id+"/blob",
                [{key: "Files", value: photos}],
                true)
        },
        deletePhotos: (id: number, paths: string[]) => {
            return httpClient.delete("/api/post/"+id+"/blob", {paths: paths}, true)
        },
        getDetailed: (
            postType?: EPostType,
            count: number = 0,
            startIndex: number = 0,
            search?: string,
            tagIds?: number[]) => {

            return httpClient.get<PagedResponseDto<Post>>(
                "/api/post/detailed?count="+count+"&startIndex="+startIndex
                    +(postType ? "&posttype="+postType : "")
                    +(search ? "&search="+search : "")
                    +((tagIds && tagIds.length > 0) ? "&tagIds="+tagIds.join("%2B") : ""),
                true);
        },
        get: (id: number) => {
            return httpClient.get("/api/post/" + id, true);
        },
        getOwn: () => {
            return httpClient.get<Post[]>("/api/post/own", true);
        }
    }
}

export default usePostService;