import { View } from "react-native";
import MyPostsProps from "./props/MyPostsProps";
import Header from "../../../components/header/Header";
import MainText from "../../../modules/text/MainText";
import style from "./style/MyPostsStyle";
import PostList from "../../../components/postList/PostList";
import { useEffect, useState } from "react";
import Post from "../../../models/Post";
import EPostType from "../../../models/enums/EPostType";
import EPostStatus from "../../../models/enums/EPostStatus";
import { ColorConstants } from "../../../constants/ThemeConstants";
import { useNavigation } from "@react-navigation/native";

const MyPosts = (props : MyPostsProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const posts = [
            {
                id: 4,
                title: "Post 4",
                description: "description 4",
                shortDescription: "short description 4",
                type: EPostType.COURSE,
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
                blobPaths: [require("../../../../images/postImageExample.png")], 
                tags : [
                    {
                        name: "Mathématiques",
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
                ]
            },
        ]

        setPosts(posts)
    }, [])

    const onPressPost = (post: Post) => {
        navigation.navigate("PostEdit", {post: post});
    }

    return (
        <View style={{flex:1}}>
            <View style={style.container}>
                <PostList
                    posts={posts}
                    style={{backgroundColor: ColorConstants.greyMainColor}}
                    itemStyle={{backgroundColor: ColorConstants.blackMainColor}}
                    onPress={onPressPost}/>
            </View>
        </View>
    )
}

export default MyPosts;