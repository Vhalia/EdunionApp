import {  TouchableOpacity, View } from "react-native";
import styles from "./style/searchStyle"
import SearchBar from "../../components/searchBar/SearchBar";
import { ColorConstants, noImageGradientColors } from "../../constants/ThemeConstants";
import { useEffect, useState } from "react";
import Post from "../../models/Post";
import EPostType from "../../models/enums/EPostType";
import PostCard from "../../components/postCard/PostCard";
import { FlashList } from "@shopify/flash-list";
import FoldHeader from "../../components/foldHeader/FoldHeader";
import Header from "../../components/header/Header";
import Animated, { clamp, useSharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EPostStatus from "../../models/enums/EPostStatus";
import PostCardsList from "../../components/postCardsList/PostCardsList";

const Search = () => {
    const [searchInputText, setSearchInputText] = useState("");
    const [isSearchBarDisplayed, DisplaySearchBar] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        let posts : Post[] = [
            {
                id: 1,
                title: "Post 1",
                description: "description 1",
                shortDescription: "short description 1",
                type: EPostType.BOOK,
                price: 5,
                user : {
                    id: 1,
                    name: "Mathieu",
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 2,
                title: "Post 2",
                description: "description 2",
                shortDescription: "short description 2",
                type: EPostType.BOOK,
                price: 6,
                user : {
                    id: 2,
                    name: "John",
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 3,
                title: "Post 3",
                description: "description 3",
                shortDescription: "short description 3",
                type: EPostType.BOOK,
                price: 7,
                user : {
                    id: 3,
                    name: "Bob",
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 4,
                title: "Post 4",
                description: "description 4",
                shortDescription: "short description 4",
                type: EPostType.BOOK,
                price: 8,
                user : {
                    id: 4,
                    name: "Maria",
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 5,
                title: "Post 5",
                description: "description 5",
                shortDescription: "short description 5",
                type: EPostType.COURSE,
                price: 9,
                user : {
                    id: 5,
                    name: "Alex",
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 6,
                title: "Post 6",
                description: "description 6",
                shortDescription: "short description 6",
                type: EPostType.COURSE,
                price: 10,
                user : {
                    id: 6,
                    name: "Samantha", 
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 7,
                title: "Post 7",
                description: "description 7",
                shortDescription: "short description 7",
                type: EPostType.COURSE,
                price: 11,
                user : {
                    id: 7,
                    name: "David", 
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 8,
                title: "Post 8",
                description: "description 8",
                shortDescription: "short description 8",
                type: EPostType.BOOK,
                price: 12,
                user : {
                    id: 8,
                    name: "Emma", 
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
            {
                id: 9,
                title: "Post 9",
                description: "description 9",
                shortDescription: "short description 9",
                type: EPostType.COURSE,
                price: 13,
                user : {
                    id: 9,
                    name: "Laura",
                    lastname: "test",
                    email: "test@exemple.com",
                    school: {
                        id: 1,
                        name: "IPL"
                    }
                },
                status: EPostStatus.CREATED,
                tags : [
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
                ]
            },
        ];

        setPosts([...posts]);
    }, [])

    const onPostCardPress = (postId: number) => {
        navigation.navigate("Post", {postId: postId});
    }

    return(
        <View style={styles.mainContainer}>
            {/*header*/}
            <Header>
                {isSearchBarDisplayed ?
                    <Animated.View style={[styles.seachBarStyleContainer]}>
                        <SearchBar
                            onPressSearch={(value) => {setSearchInputText(value)}}
                            dropDownStyle={{backgroundColor: ColorConstants.blackMainColor}}
                            style={[styles.seachBarStyle]} />
                    </Animated.View>
                : <></>}
            </Header>

            {/*Search*/}
            <Animated.View style={[styles.gap, styles.contentContainer]}>
                {/* <View style={[styles.gap]}>
                    <MainText
                        weight={'700'}
                        fontSize={20}
                        text={searchInputText ? "Résultat pour: " +searchInputText : ""} />
                </View> */}

                {/*Posts*/}
                <PostCardsList
                    posts={posts}
                    itemWidth={185}
                    estimatedItemSize={150}
                    numberOfColumns={2}
                    onPostCardPress={(post) => onPostCardPress(post.id)}/>
            </Animated.View>
        </View>
    );
}

export default Search