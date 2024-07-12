import Book from "../../../models/Book";
import AddEditPostDto from "../../../models/DTO/AddEditPostDto";
import File from "../../../models/File";
import Post from "../../../models/Post";
import Schedule from "../../../models/Schedule";

export default interface PostEditProps {
    post?: Post,
    disableEditStatus? : boolean,
    onAddButtonPress? : (value: AddEditPostDto, photos: File[]) => void,
    onModifyButtonPress? : (value: AddEditPostDto, photos: File[]) => void,
    isLoading?: boolean
    
}

interface PostSchedulesEditProps {
    schedules: Schedule[],
    onChange?: (schedules: Schedule[]) => void,
}

interface PostBooksEditProps {
    books?: Book[],
    onAddBook?: (book: Book) => void,
    onModifyBook?: (book: Book, index: number) => void
}

interface PostBookEditProps {
    book?: Book,
    onAddBook?: (book: Book) => void,
    onModifyBook?: (book: Book) => void
}

export type {PostSchedulesEditProps, PostBooksEditProps, PostBookEditProps}