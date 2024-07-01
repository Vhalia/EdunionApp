import { Tag } from "../../../models/Tag";

export default interface TagsProps {
    tags ?: Tag[],
    selectedTags ? : Tag[],
    multipleSelect? : boolean
}