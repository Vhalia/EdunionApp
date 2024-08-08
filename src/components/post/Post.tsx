import { Dimensions, Image, ImageBackground, ScrollView, View } from "react-native";
import PostProps from "./props/postProps";
import styles from "./style/postStyle";
import CarouselV2 from "../carousel-v2/CarouselV2";
import LinearGradient from "react-native-linear-gradient";
import { useContext, useEffect, useState } from "react";
import {default as PostModel} from "../../models/Post";
import EPostType from "../../models/enums/EPostType";
import { useNavigation, useRoute } from "@react-navigation/native";
import MainText from "../../modules/text/MainText";
import UserWithPicture from "../userWithPicture/UserWithPicture";
import { ColorConstants } from "../../constants/ThemeConstants";
import UserContact from "../userContacts/UserContact";
import EContactType from "../../models/enums/EContactType";
import EPostStatus, { PostStatusToColor, PostStatusToString } from "../../models/enums/EPostStatus";
import EllipseFilledSVG from "../../../images/ellipseFilled.svg" 
import usePostService from "../../hooks/usePostService";
import Loading from "../../modules/Loading/Loading";
import MainButton from "../../modules/mainButton/MainButton";
import useChatService from "../../hooks/useChatService";
import Context from "../../contexts/AuthContext/AuthContext";

const Post = (props : PostProps) => {
    const [post, setPost] = useState<PostModel | undefined>(undefined);
    
    const route = useRoute();
    const navigation = useNavigation<any>();
    const postService = usePostService();
    const chatService = useChatService();
    const authContext = useContext(Context);
    const routeParams = route.params as PostProps;
    
    const postId = props.postId ?? routeParams.postId;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const noImageGradientColors = [
        ['#4b75e1', '#7a9cf4'],
        ['#f47a22', '#f98c3d'],
        ['#e04b4b', '#e85e5e'],
    ]

    useEffect(() => {
        if (!postId){
            return;
        }
        
        postService.get(postId).then((response) => {
            setPost(response);
        }).catch((err) => {
            console.log(err)
        })
    }, [postId])

    const onPressContact = () => {
        if (!post?.id){
            return;
        }
        chatService.create(post.id).then((chatId) => {
            console.log('CREATE CHAT', chatId)
            navigation.navigate('Chat', {chatId: chatId})
        }).catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <>
           {!post ? 
            <Loading />
           :
            <ScrollView style={styles.container}>
                <CarouselV2
                    style={{flex: 0.5}}
                    data={(!post.blobPaths || post.blobPaths.length == 0)
                        ? [noImageGradientColors[0]]
                        : post.blobPaths
                    }
                    paginationPosition="bottom"
                    loop
                    renderItem={(image, index) => {
                        return (
                            <View>
                            {(!noImageGradientColors.includes(image)) ?
                                <Image
                                    source={{uri: image}}
                                    style={{width: windowWidth, height: windowHeight/2}}
                                    resizeMode="cover"
                                />
                            :
                            // <LinearGradient
                            //     colors={image}>
                            //     <View
                            //         style={{width: windowWidth, height: windowHeight/2}}>
                            //     </View>
                            // </LinearGradient>
                            <View style={{flex: 1, height: 50}}></View>}
                            </View>
                        )
                    }}
                />
                <View style={{flex: 0.5}}>
                    <UserWithPicture
                        userName={post.user.firstName + " " + post.user.lastName}
                        picture={post.user?.picturePath}
                        style={[styles.content, styles.bigGap, styles.bigGapDown]}
                        userNameFontSize={14}/>

                    <View style={[styles.content, styles.status, styles.gap]}>
                        <EllipseFilledSVG color={PostStatusToColor(post.status)} width={20} height={20} />
                        <MainText text={PostStatusToString(post.status)} fontSize={14}/>
                    </View>

                    <View style={[styles.content, styles.bigGap, styles.bigGapDown, {paddingBottom: 10}]}>
                        <View style={[styles.midGap, styles.horizontalSpacing]}>
                            <MainText
                                text={post.title}
                                fontSize={20}
                                weight="bold"/>
                            {post.shortDescription &&<MainText
                                text={post.shortDescription}
                                fontSize={14}
                                fontColor={ColorConstants.white70PercentColor}
                                style={styles.gap}/>}
                        </View>
                        <View style={[styles.gap, styles.horizontalSpacing]}>
                            <MainText
                                text={post.description}
                                fontSize={14}
                                fontColor={ColorConstants.white70PercentColor}/>
                        </View>
                        <View style={[styles.bigGap, styles.horizontalSpacing]}>
                            <MainText
                                text={post.price.toString() + "€"}
                                fontSize={20}
                                weight="bold"/>
                        </View>
                    </View>
                    {post.user.id !== authContext?.currentUser?.id && <View style={[styles.bigGap, styles.horizontalSpacing, {marginBottom: 20}]}>
                        <MainButton
                            text="Contactez"
                            onPress={onPressContact}
                            style={styles.button}/>
                    </View>}
                </View>
            </ScrollView>
           }
        </>
    )
}

export default Post;