import EPostType from "../enums/EPostType";
import { Tag } from "../Tag";

export default interface AddEditPostDto{
    id: number,
    title: string,
    description: string,
    price: number,
    type: EPostType,
    tags: Tag[]
}