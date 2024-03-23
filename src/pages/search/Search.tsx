import MainText from "../../modules/text/MainText";
import { FlatList, View } from "react-native";
import styles from "./style/searchStyle"
import SearchBar from "../../components/searchBar/SearchBar";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useEffect, useState } from "react";
import Post from "../../models/Post";
import EPostType from "../../models/enums/EPostType";
import PostCard from "../../components/postCard/PostCard";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";

const Search = () => {
    const [searchInputText, setSearchInputText] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);

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
                    name: "Mathieu"
                }
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
                    name: "John"
                }
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
                    name: "Bob"
                }
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
                    name: "Maria"
                }
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
                    name: "Alex"
                }
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
                    name: "Samantha"
                }
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
                    name: "David"
                }
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
                    name: "Emma"
                }
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
                    name: "Laura"
                }
            },
        ];

        setPosts([...posts]);
    }, [])

    const noImageGradientColors = [
        ['#4b75e1', '#7a9cf4'],
        ['#f47a22', '#f98c3d'],
        ['#e04b4b', '#e85e5e'],
    ]

    return(
        <View style={styles.mainContainer}>
            {/*header*/}
            <View style={styles.header}>
                <SearchBar
                    onPressSearch={(value) => {setSearchInputText(value)}}
                    dropDownStyle={{backgroundColor: ColorConstants.blackMainColor}}
                    style={styles.seachBarStyle}>

                </SearchBar>
            </View>

            {/*Search*/}
            <View style={[styles.gap, styles.contentContainer]}>
                {/* <View style={[styles.gap]}>
                    <MainText
                        weight={'700'}
                        fontSize={20}
                        text={searchInputText ? "Résultat pour: " +searchInputText : ""} />
                </View> */}

                {/*Posts*/}
                <View style={[styles.postsListContainer]}>
                    <FlashList
                        data={posts}
                        estimatedItemSize={750}
                        ItemSeparatorComponent={() =>
                            <View style={{height: 20}}></View>}
                        renderItem={({item}) => {
                            return (
                                <PostCard
                                    style={styles.postElement}
                                    key={item.id}
                                    owner={item.user.name}
                                    ownerImage={item.user.picture}
                                    price={item.price}
                                    title={item.title}
                                    subtitle={item.shortDescription}
                                    image={item.blobPaths ? item.blobPaths[0] : undefined}
                                    gradientColors={noImageGradientColors[item.id%3]}/>
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

export default Search