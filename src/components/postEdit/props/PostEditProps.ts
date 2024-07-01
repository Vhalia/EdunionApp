import Post from "../../../models/Post";

export default interface PostEditProps {
    post?: Post,
    disableEditStatus? : boolean
}