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
import File from "../../models/File";
import MainButton from "../../modules/mainButton/MainButton";

const PostEdit = (props: PostEditProps) => {
    const route = useRoute();
    const routeParams = route.params as PostEditProps;
    const post = props.post ?? routeParams?.post;
    
    const [categoryButtonSelected, setCategoryButtonSelected] = useState<EPostType>(post?.type ?? EPostType.BOOK);
    const [title, setTitle] = useState(post?.title ?? "");
    const [description, setDescription] = useState(post?.description ?? "");
    const photoFiles = post?.blobPaths?.map(p => { return {uri: p} as File}) ?? [];
    const [photos, setPhotos] = useState<File[]>(photoFiles);
    const [price, setPrice] = useState(post?.price ?? 0);
    const [postStatus, setPostStatus] = useState<EPostStatus>(post?.status ?? EPostStatus.CREATED);
    const [activeTags, setActiveTags] = useState<TagType[]>(post?.tags ?? []);

    const status : string[] = Object.values(EPostStatus)
        .filter(value => value != EPostStatus.CREATED)
        .map(value => PostStatusToString(value))

    const onTitleInputTextChange = (value: string) => {
        setTitle(value);
    }

    const onDescriptionInputTextChange = (value: string) => {
        setDescription(value);
    }

    const onAddPhoto = (photo: File) => {
       setPhotos([...photos, photo]); 
    }

    const onCategoryButtonPress = (category: EPostType) => {
        setCategoryButtonSelected(category);
    }

    const applyCategoryButtonStyle = (category: EPostType) => {
        if (categoryButtonSelected === category) {
            return styles.activeCategoryButton;
        }
        return styles.inactiveCategoryButton;
    }
    
    const onSelectStatus = (value: string) => {
        if (!post)
            return;
        
        setPostStatus(getEnumValue(EPostStatus, value))
    }

    const onAddButtonPress = () => {
        props.onAddButtonPress && props.onAddButtonPress({
            id: 0,
            title: title,
            description: description,
            price: price,
            type: categoryButtonSelected,
            tags: activeTags
        },
        photos);
    }

    const onModifyButtonPress = () => {
        props.onModifyButtonPress && props.onModifyButtonPress({
            id: post!.id,
            title: title,
            description: description,
            price: price,
            type: categoryButtonSelected,
            tags: activeTags
        },
        photos);
    }
    
    return (
        
        <ScrollView
            style={styles.mainContainer}>

            <View style={styles.contentContainer}>
                {!props.disableEditStatus && <View style={[styles.informationsContainer, styles.gap]}>

                    <MainText style={styles.titles} weight="700" fontSize={18} text="Status"/>

                    <SelectList
                        data={status}
                        initialSelected={post?.status ?? postStatus}
                        onSelect={onSelectStatus}
                        orientation="horizontal"
                        elementStyle={{backgroundColor: "rgba(0,0,0,0)"}}
                        ellipseColor={ColorConstants.white70PercentColor}
                        ellipseSelectedColor={ColorConstants.purpleMainColor}
                        style={[styles.informations, styles.minorGap]}/>

                </View>}
                <View style={[styles.informationsContainer, styles.gap]}>

                    <MainText
                        style={styles.titles}
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
                        style={styles.titles}
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
                                text="Prix"/>            
                            <MainInput
                                inputMode="numeric"
                                value={price?.toString()+" €"}
                                style={[styles.inputs, styles.minorGap, styles.priceInput]}
                                onChange={(value) => setPrice(parseInt(value.substring(0, value.length - 2)))}/>
                        </View>

                        <View style={[styles.gap]}>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Tags"/> 
                            <Tags
                                selectedTags={activeTags}
                                multipleSelect={false}
                                onChange={(tags) => setActiveTags(tags)}/>
                        </View>
                    </View>
                </View>

            {categoryButtonSelected === EPostType.BOOK &&
                <View style={[styles.gap, styles.informationsContainer]}>
                    <MainText
                        text="Livre"
                        fontSize={18}
                        weight="700"/>
                    <View style={styles.informations}>
                        <MainText
                            text="Titre"
                            fontSize={16}
                            weight="700"/>
                        <MainInput
                            placeholder="Par exemple: livre de mathématiques"
                            placeholderColor={ColorConstants.white70PercentColor}
                            inputMode="text"
                            onChange={onTitleInputTextChange}
                            style={[styles.inputs, styles.minorGap]}
                            value={title}/>
                    </View>
                </View>
            }

                <MainButton
                    style={[styles.gap, styles.addButton]}
                    text={post ? "Modifier" : "Ajouter"}
                    fontSize={15}
                    fontWeight="700"
                    onPress={post ? onModifyButtonPress : onAddButtonPress}
                    isLoading={props.isLoading}/>
            </View>

        </ScrollView>
    );
}

export default PostEdit;