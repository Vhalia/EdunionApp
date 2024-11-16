import { Modal, Platform, StyleSheet, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from "./style/searchStyle"
import SearchBar from "../../components/searchBar/SearchBar";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useCallback, useEffect, useState } from "react";
import Post from "../../models/Post";
import Header from "../../components/header/Header";
import Animated from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PostCardsList from "../../components/postCardsList/PostCardsList";
import usePostService from "../../hooks/usePostService";
import MainText from "../../modules/text/MainText";
import Loading from "../../modules/Loading/Loading";
import EPostType from "../../models/enums/EPostType";
import Tags from "../../components/tags/Tags";
import { Tag } from "../../models/Tag";
import useTagService from "../../hooks/useTagService";
import MainButton from "../../modules/mainButton/MainButton";
import PostTypeSelector from "../../components/postTypeSelector/PostTypeSelector";
import SearchProps from "./props/searchProps";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = (props: SearchProps) => {
    const routeProps: SearchProps = props.route.params

    const [searchInputText, setSearchInputText] = useState(props.search ?? routeProps?.search ?? "");
    const [isAdvancedSearchShown, showAdvancedSearch] = useState(props.openAdvancedSearch ?? routeProps?.openAdvancedSearch ?? false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tagsIsLoading, setTagsIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTags, setActiveTags] = useState<Tag[]>([]);
    const [postType, setPostType] = useState<EPostType|undefined>(undefined);

    const defaultSearchCount = 6
    const onEndSearchCount = 2

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const postService = usePostService()
    const tagService = useTagService()

    const refreshContent = () => {
        setIsLoading(true)
        getPosts(postType, defaultSearchCount, 0, searchInputText, activeTags.map((tag) => tag.id)).then((posts) => {
            setIsLoading(false)
            setIsRefreshing(false)
            setPosts(posts ?? []);
        }).catch((err) => {
            setIsLoading(false)
            setIsRefreshing(false)
        })
        
        setTagsIsLoading(true)
        tagService.get().then((tags) => {
            setTags([...tags])
            setTagsIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setTagsIsLoading(false)
        })
    }

    useFocusEffect(
        useCallback(() => {
            refreshContent();
        }, []) 
    )

    useEffect(() => {
        if (!isRefreshing)
            return;
        refreshContent();
    }, [isRefreshing])

    useEffect(() => {
        showAdvancedSearch(routeProps?.openAdvancedSearch ?? false)
        setSearchInputText(routeProps?.search ?? "")
        onPressSearch(routeProps?.search ?? "")
    }, [routeProps])

    const getPosts = async (
        postType?: EPostType,
        count?: number,
        startIndex?: number,
        search?: string,
        tagIds?: number[]) => {
        try {
            const response = await postService.getDetailed(postType, count, startIndex, search, tagIds)
            if (response.result.length === 0)
                return;
            
            setCurrentIndex(response.nextIndex);

            return response.result;
        }catch(err) {
            console.log(err)
            throw err;
        }
    }

    const onPostCardPress = (postId: number) => {
        navigation.navigate("Post", {postId: postId});
    }

    const onRefresh = () => {
        setCurrentIndex(0)
        setIsRefreshing(true)
    }

    const onEndReached = async () => {
        if (!isLoading){
            const newPosts = await getPosts(postType, onEndSearchCount, currentIndex, searchInputText, activeTags.map((tag) => tag.id))
            if (newPosts) {
                setPosts([...posts, ...newPosts])
            }
        }
    }

    const onPressSearch = async (value: string) => {
        if (value === searchInputText)
            return;

        setSearchInputText(value)
        const searchedPosts = await getPosts(postType, defaultSearchCount, 0, value, activeTags.map((tag) => tag.id))
        if (searchedPosts) {
            setPosts([...searchedPosts])
        }else {
            setPosts([])
        }
    }

    const onPressAdvancedSearchConfirmed = async () => {
        showAdvancedSearch(false);

        const searchedPosts = await getPosts(postType, defaultSearchCount, 0, searchInputText, activeTags.map((tag) => tag.id))
        if (searchedPosts) {
            setPosts([...searchedPosts])
        }else {
            setPosts([])
        }
    }

    const discardAdvancedSearch = () => {
        showAdvancedSearch(false);
        setActiveTags([]);
    }

    const onChangeTags = (tags: []) => {
        setActiveTags([...tags])
    }

    const onChangePostType = (postType?: EPostType) => {
        setPostType(postType)
    }

    return(
        <View style={styles.mainContainer}>
            <SafeAreaView style={[{backgroundColor: ColorConstants.blackSecondaryColor}, Platform.OS == "android" ? {padding: 20} : {}]}>
                {/*header*/}
                <Header style={{height:100}}>
                    <Animated.View style={[styles.seachBarStyleContainer]}>
                        <SearchBar
                            onPressSearch={onPressSearch}
                            dropDownStyle={{backgroundColor: ColorConstants.blackMainColor}}
                            style={[styles.seachBarStyle]}
                            sideButtonMode="button"
                            onPressSideButton={() => showAdvancedSearch(true)}
                            search={searchInputText}/>
                        
                    </Animated.View>
                </Header>
            </SafeAreaView>

            {/* Advanced search modal */}
            <Modal
                visible={isAdvancedSearchShown}
                onRequestClose={() => showAdvancedSearch(false)}
                transparent
                animationType="fade">
                <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                        onPress={discardAdvancedSearch}
                        activeOpacity={1}/>

                    <View style={{backgroundColor: ColorConstants.greyMainColor, borderRadius: 8, padding: 15}}>
                        <MainText
                            text="Recherche avancée"
                            weight={'700'}
                            fontSize={20}
                            style={{marginBottom: 15}}/>
                        <Tags
                            multipleSelect={true}
                            fetchTagOnLoad={false}
                            tags={tags}
                            selectedTags={activeTags}
                            onChange={onChangeTags}
                            isLoading={tagsIsLoading}/>

                        <PostTypeSelector
                            inactiveTypeBackgroundColor={ColorConstants.blackMainColor}
                            inactiveTypeColor={ColorConstants.whiteMainColor}
                            style={{marginTop: 20}}
                            canSelectNone
                            onChange={onChangePostType}
                            postType={postType}/>

                        <MainButton
                            text="Rechercher"
                            onPress={onPressAdvancedSearchConfirmed}
                            style={{backgroundColor: ColorConstants.purpleMainColor, marginTop: 20}}/>
                    </View>
                </View>
            </Modal>

            {/*Search*/}
            <Animated.View style={[styles.gap, styles.contentContainer]}>
                {/*Posts*/}
                {isLoading
                    ?
                        <Loading />
                    :
                        !posts || posts.length === 0 ?
                            <MainText
                                text="Il n'y a pas de posts correspondant à votre recherche."
                                weight={'700'}
                                fontSize={20}
                                style={{marginTop: 100, flexWrap: 'wrap', width: 300}}/>
                        : 
                            <PostCardsList
                                posts={posts}
                                itemWidth={185}
                                estimatedItemSize={150}
                                numberOfColumns={2}
                                onPostCardPress={(post) => onPostCardPress(post.id)}
                                onRefresh={onRefresh}
                                isRefreshing={isRefreshing && isLoading}
                                onEndReached={onEndReached}/>}
            </Animated.View>
        </View>
    );
}

export default Search