import { Tag } from "../../../models/Tag";

export default interface TagsProps {
    tags ?: Tag[],
    selectedTags ? : Tag[],
    multipleSelect? : boolean,
    onChange? (tags: Tag[]) : void,
    categoryTagBackgroundColor? : string,
    tagBackgroundColor? : string,
    fetchTagOnLoad? : boolean,
    isLoading? : boolean
}