import AddEditPostDto from "../../../models/DTO/AddEditPostDto";
import File from "../../../models/File";
import Post from "../../../models/Post";

export default interface PostEditProps {
    post?: Post,
    disableEditStatus? : boolean,
    onAddButtonPress? : (value: AddEditPostDto, photos: File[]) => void,
    onModifyButtonPress? : (value: AddEditPostDto, photos: File[]) => void,
    isLoading?: boolean
    
}