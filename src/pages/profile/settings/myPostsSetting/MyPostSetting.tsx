import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Post from "../../../../models/Post";
import style from "./style/myPostsSettingStyle";
import { ColorConstants } from "../../../../constants/ThemeConstants";
import PostList from "../../../../components/postList/PostList";
import usePostService from "../../../../hooks/usePostService";
import Loading from "../../../../modules/Loading/Loading";

const MyPostsSetting = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation<any>();

    const postService = usePostService();

    useEffect(() => {
        setIsLoading(true)

        postService.getOwn().then(posts => {
            setIsLoading(false)
            setPosts(posts)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }, [])

    const onPressPost = (post: Post) => {
        console.log(post)
        navigation.navigate("PostEdit", {post: post});
    }

    return (
        <View style={{flex:1}}>
            <View style={style.container}>
                {isLoading
                    ? <Loading />
                    :
                        <PostList
                            posts={posts}
                            style={{backgroundColor: ColorConstants.greyMainColor}}
                            itemStyle={{backgroundColor: ColorConstants.blackMainColor}}
                            onPress={onPressPost}/>}
            </View>
        </View>
    )
}

export default MyPostsSetting;