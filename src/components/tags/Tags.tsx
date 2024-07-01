import { useEffect, useState } from "react";
import TagsProps from "./props/TagsProps";
import { Tag as TagType } from "../../models/Tag";
import { View } from "react-native";
import style from "./style/TagsStyle";
import MainText from "../../modules/text/MainText";
import Tag from "../tag/Tag";
import useTagService from "../../hooks/useTagService";
import Loading from "../../modules/Loading/Loading";

const Tags = (props : TagsProps) => {
    const [activeTags, setActiveTags] = useState<TagType[]>(props.selectedTags ?? []);
    const [tags, setTags] = useState<TagType[]>(props.tags ?? []);
    const [tagsByCategory, setTagsByCategory] = useState(new Map<string, TagType[]>());
    const [isLoading, setIsLoading] = useState(false);

    const tagService = useTagService();

    const multipleSelect = props.multipleSelect ?? true

    useEffect(() => {
        setIsLoading(true)
        
        tagService.get()
            .then((tags) => {
                setTags([...tags, ...(props.tags??[])])
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [props.tags])
    
    useEffect(() => {
        setTagsByCategory(orderTagsByCategory())
        setIsLoading(false)
    }, [tags])
    
    const orderTagsByCategory = () : Map<string, TagType[]> => {
        const tagsByCategory = new Map<string, TagType[]>();
        
        console.log(tags)
        for (const tag of tags) {
            if (tagsByCategory.has(tag.category.name)) {
                tagsByCategory.get(tag.category.name)?.push(tag);
            } else {
                tagsByCategory.set(tag.category.name, [tag]);
            }
        }
        
        return tagsByCategory;
    }

    const onPressTag = (tag : TagType) => {
        if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
        }else {
            if (!multipleSelect) {
                setActiveTags([...activeTags.filter(activeTag => activeTag.category.name != tag.category.name), tag]);
            }else{
                setActiveTags([...activeTags, tag]);
            }
        }
    }

    const displayTags = (categoy: string, tags: TagType[], index: number) : React.JSX.Element => {
        return (
            <View
                key={index}
                style={[style.tagCategoryContainer, style.minorGap]}>
                <MainText
                    weight={'500'}
                    fontSize={15}
                    text={categoy}/>
                <View style={[style.tagsContainer, style.minorGap]}>
                    {tags.map((tag, index) => {
                        return (
                            <Tag
                                key={index}
                                tag={tag.name}
                                active={activeTags.some(t => t.name == tag.name && t.category.name == tag.category.name)}
                                onPress={() => onPressTag(tag)}/>
                        )
                    
                    })
                    }
                </View>
            </View>
        )
    }

    return(
        <View style={[style.tagsContainer, style.minorGap]}>
            {isLoading
            ?
                <Loading/>
            :
                Array.from(tagsByCategory.keys()).map((category, index) => {
                    return displayTags(category, tagsByCategory!.get(category) as TagType[], index);
                })
            }
        </View>
    );
}

export default Tags