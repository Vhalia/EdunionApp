import { View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Post from "../../../../models/Post";
import style from "./style/myPostsSettingStyle";
import { ColorConstants } from "../../../../constants/ThemeConstants";
import PostList from "../../../../components/postList/PostList";
import usePostService from "../../../../hooks/usePostService";
import Loading from "../../../../modules/Loading/Loading";
import daysjs from "dayjs";
import MainText from "../../../../modules/text/MainText";

const MyPostsSetting = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation<any>();

    const postService = usePostService();

    useFocusEffect(
        useCallback(() => {
            getOwnPosts()
        }, [])
    )
    
    const getOwnPosts = () => {
        setIsLoading(true)
        postService.getOwn().then(posts => {
            setIsLoading(false)
            setPosts(posts.sort((a, b) => daysjs(b.lastModificationDate).diff(daysjs(a.lastModificationDate))))
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    const onPressPost = (post: Post) => {
        navigation.navigate("PostEdit", {post: post});
    }

    return (
        <View style={{flex:1}}>
            <View style={style.container}>
                {isLoading
                    ? <Loading />
                    :
                        posts?.length > 0 ? (
                            <PostList
                                posts={posts}
                                style={{backgroundColor: ColorConstants.greyMainColor}}
                                itemStyle={{backgroundColor: ColorConstants.blackMainColor}}
                                onPress={onPressPost}/>)
                            : (
                                <MainText
                                    text="Vous n'avez pas de post..."
                                    fontSize={18}
                                    style={{alignSelf: "center", marginTop: 50}}/>
                            )
                }
            </View>
        </View>
    )
}

export default MyPostsSetting;