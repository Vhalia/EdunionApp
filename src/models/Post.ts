import { Tag } from "./Tag";
import User from "./User";
import EPostStatus from "./enums/EPostStatus";
import EPostType from "./enums/EPostType";

export default interface Post {
    id: number,
    title: string,
    description: string,
    shortDescription: string,
    blobPaths? : string[],
    price: number,
    user: User,
    type : EPostType,
    status: EPostStatus,
    tags: Tag[]
}