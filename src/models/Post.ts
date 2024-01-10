import User from "./User";
import EPostType from "./enums/EPostType";

export default interface Post {
    title: string,
    description: string,
    shortDescription: string,
    blobPaths? : string[],
    price: number,
    user: User,
    type : EPostType
}