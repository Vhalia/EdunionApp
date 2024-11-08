import Book from "../Book";
import EPostStatus from "../enums/EPostStatus";
import EPostType from "../enums/EPostType";
import Schedule from "../Schedule";

export default interface AddEditPostDto{
    id: number,
    title: string,
    shortDescription: string,
    description: string,
    price: number,
    type: EPostType,
    tags: number[],
    books? : Book[],
    schedules? : Schedule[],
    status? : EPostStatus
}