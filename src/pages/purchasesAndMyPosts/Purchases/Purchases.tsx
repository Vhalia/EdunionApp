import { FlatList, TouchableOpacity, View } from "react-native";
import PurchasesProps from "./props/PurchasesProps";
import Header from "../../../components/header/Header";
import MainText from "../../../modules/text/MainText";
import style from "./style/PurchasesStyle";
import PostCard from "../../../components/postCard/PostCard";
import { useEffect, useState } from "react";
import Post from "../../../models/Post";
import EPostType from "../../../models/enums/EPostType";
import EPostStatus from "../../../models/enums/EPostStatus";
import { useNavigation } from "@react-navigation/native";
import PostCardsList from "../../../components/postCardsList/PostCardsList";

const Purchases = (props : PurchasesProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const posts = [
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
                status: EPostStatus.AVAILABLE,
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
                status: EPostStatus.UNAVAILABLE,
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
        ]

        setPosts(posts)
    }, [])

    const onPostCardPress = (postId: number) => {
        navigation.navigate("Post", {postId: postId});
    }

    return(
        <View style={{flex:1}}>
            <View style={style.container}>
                <PostCardsList
                    posts={posts}
                    onPostCardPress={(post) => onPostCardPress(post.id)}
                    numberOfColumns={1}
                    estimatedItemSize={300}
                    itemWidth={300}
                    overScrollMode="never"/>
            </View>
        </View>
    )
}

export default Purchases