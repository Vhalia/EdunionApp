import { ScrollView, TouchableHighlight, View } from "react-native";
import PostEditProps from "./props/PostEditProps";
import styles from "./style/PostEditStyle";
import { useState } from "react";
import { Tag as TagType } from "../../models/Tag";
import MainText from "../../modules/text/MainText";
import PhotoUploader from "../photoUploader/PhotoUploader";
import MainInput from "../mainInput/MainInput";
import { ColorConstants } from "../../constants/ThemeConstants";
import BookSVG from "../../../images/book.svg";
import CourseSVG from "../../../images/course.svg";
import Tags from "../tags/Tags";
import EPostType from "../../models/enums/EPostType";
import { useRoute } from "@react-navigation/native";
import SelectList from "../../modules/SelectList/SelectList";
import EPostStatus, { PostStatusToString } from "../../models/enums/EPostStatus";
import { getEnumValue } from "../../utils/utils";

const PostEdit = (props: PostEditProps) => {
    const route = useRoute();
    const routeParams = route.params as PostEditProps;
    const post = props.post ?? routeParams?.post;

    const [categoryButtonSelected, setCategoryButtonSelected] = useState<EPostType>(post?.type ?? EPostType.BOOK);
    const [title, setTitle] = useState(post?.title ?? "");
    const [description, setDescription] = useState(post?.description ?? "");
    const [photos, setPhotos] = useState<string[]>(post?.blobPaths ?? []);
    const status : string[] = Object.values(EPostStatus)
        .filter(value => value != EPostStatus.CREATED)
        .map(value => PostStatusToString(value))

    const onTitleInputTextChange = (value: string) => {
        setTitle(value);
    }

    const onDescriptionInputTextChange = (value: string) => {
        setDescription(value);
    }

    const onAddPhoto = (photoUri: string) => {
       setPhotos([...photos, photoUri]); 
    }

    const onCategoryButtonPress = (category: EPostType) => {
        setCategoryButtonSelected(category);
    }

    const onAddButtonPress = () => {
    }

    const applyCategoryButtonStyle = (category: EPostType) => {
        if (categoryButtonSelected === category) {
            return styles.activeCategoryButton;
        }
        return styles.inactiveCategoryButton;
    }

    const getTags = () : TagType[] => {
        return [
            {
                name: "Mathématiques",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Physique",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Chimie",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Informatique",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Histoire",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Géographie",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Anglais",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Néerlandais",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Mauvais",
                category: {
                    name: "État"
                }
            },
            {
                name: "Neuf",
                category: {
                    name: "État"
                }
            },
            {
                name: "ok tier",
                category: {
                    name: "État"
                }
            },
            {
                name: "Français",
                category: {
                    name: "Langue"
                }
            },
            {
                name: "Néerlandais",
                category: {
                    name: "Langue"
                }
            },
            {
                name: "Anglais",
                category: {
                    name: "Langue"
                }
            },
        ]
    }

    const onSelectStatus = (value: string) => {
        if (!post)
            return;

        post.status = getEnumValue(EPostStatus, value)
    }

    return (
        
        <ScrollView
            style={styles.mainContainer}>

            <View style={styles.contentContainer}>
                <View style={[styles.informationsContainer, styles.gap]}>

                    <MainText weight="700" fontSize={18} text="Status"/>

                    <SelectList
                        data={status}
                        initialSelected={post?.status ?? EPostStatus.CREATED}
                        onSelect={onSelectStatus}
                        orientation="horizontal"
                        elementStyle={{backgroundColor: "rgba(0,0,0,0)"}}
                        ellipseColor={ColorConstants.white70PercentColor}
                        ellipseSelectedColor={ColorConstants.purpleMainColor}
                        style={[styles.informations, styles.minorGap]}/>

                </View>
                <View style={[styles.informationsContainer, styles.gap]}>

                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Photos"/>

                    <PhotoUploader
                        style={[styles.minorGap, {width: "100%"}]}
                        photos={photos}
                        OnAddPhoto={onAddPhoto} />

                </View>

                <View
                    style={[styles.informationsContainer, styles.gap]}>

                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Informations"/>

                    <View
                        style={[styles.informations, styles.minorGap]}>

                        <View>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Titre"/>
                            <MainInput
                                placeholder="Par exemple: livre de mathématiques"
                                placeholderColor={ColorConstants.white70PercentColor}
                                inputMode="text"
                                onChange={onTitleInputTextChange}
                                style={[styles.inputs, styles.minorGap]}
                                value={title}/>
                        </View>

                        <View style={[styles.gap]}>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Description"/>  
                            <MainInput
                                placeholder="Par exemple: Utilisé une année entière, comme neuf"
                                placeholderColor={ColorConstants.white70PercentColor}
                                inputMode="text"
                                multiline
                                numberOfLines={4}
                                onChange={onDescriptionInputTextChange}
                                style={[styles.inputs, styles.minorGap, styles.descriptionInput]}
                                value={description}/>
                        </View>

                        <View style={[styles.gap]}>
                            
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Catégorie"/> 

                            <View style={[styles.categoryButtonsContainer, styles.minorGap]}>
                                
                                <TouchableHighlight
                                    onPress={() => onCategoryButtonPress(EPostType.BOOK)}>
                                    <View
                                        style={[styles.categoryButton, applyCategoryButtonStyle(EPostType.BOOK)]}>
                                        <BookSVG color={applyCategoryButtonStyle(EPostType.BOOK).color} />
                                        <MainText
                                            weight={'700'}
                                            fontSize={12}
                                            text="Livre"
                                            style={[styles.categoyButtonText, applyCategoryButtonStyle(EPostType.BOOK)]}/> 
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => onCategoryButtonPress(EPostType.COURSE)}>
                                    <View
                                        style={[styles.categoryButton, applyCategoryButtonStyle(EPostType.COURSE)]}>
                                        <CourseSVG color={applyCategoryButtonStyle(EPostType.COURSE).color} />
                                        <MainText
                                            weight={'700'}
                                            fontSize={12}
                                            text="Cours"
                                            style={[styles.categoyButtonText, applyCategoryButtonStyle(EPostType.COURSE)]}/> 
                                    </View>
                                </TouchableHighlight>

                            </View>
                        </View>

                        <View style={[styles.gap]}>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Tags"/> 
                            <Tags tags={getTags()} selectedTags={post?.tags} multipleSelect={false}/>
                        </View>
                    </View>
                </View>

                <TouchableHighlight
                    style={styles.gap}
                    onPress={onAddButtonPress}>

                    <View
                        style={[styles.addButton]}>
                        <MainText
                            weight={'700'}
                            fontSize={15}
                            text={post ? "Modifier" : "Ajouter"}/>
                    </View>

                </TouchableHighlight>
            </View>

            

        </ScrollView>
    );
}

export default PostEdit;