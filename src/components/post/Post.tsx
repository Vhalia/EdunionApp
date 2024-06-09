import { Dimensions, Image, ImageBackground, ScrollView, View } from "react-native";
import PostProps from "./props/postProps";
import styles from "./style/postStyle";
import CarouselV2 from "../carousel-v2/CarouselV2";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useState } from "react";
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

const Post = (props : PostProps) => {
    const [post, setPost] = useState<PostModel | undefined>(undefined);
    
    const route = useRoute();
    const navigation = useNavigation();
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
        const post: PostModel = {
            id: postId!,
            description: "description",
            price: 10,
            shortDescription: "short description",
            title: "title",
            type: EPostType.BOOK,
            user : {
                id: 1,
                name: "test",
                lastname: "test",
                email: "test@exemple.com",
                school: {
                    id: 1,
                    name: "IPL"
                },
                contacts: [
                    {
                        id: 1,
                        type: EContactType.MESSENGER,
                        value: "Max Le Grelle"
                    },
                    {
                        id: 2,
                        type: EContactType.INSTAGRAM,
                        value: "max.lgrl"
                    },
                    {
                        id: 3,
                        type: EContactType.WHATSAPP,
                        value: "0475757575"
                    },
                    {
                        id: 4,
                        type: EContactType.EMAIL,
                        value: "maxlegrelle@gmail.com"
                    },
                    {
                        id: 5,
                        type: EContactType.PHONE,
                        value: "0475757575"
                    },
                ]
            },
            blobPaths: [
                require("../../../images/postImageExample.png"),
                require("../../../images/ppExample.png"),
                require("../../../images/defaultProfilePicture.png"),
            ],
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
        }
        
        setPost(post);
    }, [])
    
    return (
        <>
           {!post ? 
            <LoadingScreen />
           :
            <ScrollView style={styles.container}>
                <CarouselV2
                    style={{flex: 0.5}}
                    data={post.blobPaths??
                        [noImageGradientColors[0],
                        noImageGradientColors[1],
                        noImageGradientColors[2]]}
                    paginationPosition="bottom"
                    loop
                    renderItem={(image, index) => {
                        return (
                            <View>
                            {(!noImageGradientColors.includes(image)) ?
                                <Image
                                    source={image}
                                    style={{width: windowWidth, height: windowHeight/2}}
                                    resizeMode="cover"
                                />
                            :
                            <LinearGradient
                                colors={image}>
                                <View
                                    style={{width: windowWidth, height: windowHeight/2}}>
                                        <MainText text={index.toString()} fontSize={100}/>
                                </View>
                            </LinearGradient>}
                            </View>
                        )
                    }}
                />
                <View style={{flex: 0.5}}>
                    <UserWithPicture
                        userName={post.user.name + " " + post.user.lastname}
                        picture={post.user?.picture}
                        style={[styles.content, styles.bigGap, styles.bigGapDown]}
                        userNameFontSize={14}/>

                    <View style={[styles.content, styles.status, styles.bigGap]}>
                        <EllipseFilledSVG color={PostStatusToColor(post.status)} width={20} height={20} />
                        <MainText text={PostStatusToString(post.status)} fontSize={14}/>
                    </View>

                    <View style={[styles.content, styles.bigGap, styles.bigGapDown]}>
                        <View style={[styles.bigGap, styles.horizontalSpacing]}>
                            <MainText
                                text={post.title}
                                fontSize={20}
                                weight="bold"/>
                            <MainText
                                text={post.shortDescription}
                                fontSize={14}
                                fontColor={ColorConstants.white70PercentColor}
                                style={styles.gap}/>
                        </View>
                        <View style={[styles.bigGap, styles.horizontalSpacing]}>
                            <MainText
                                text={post.price.toString() + "€"}
                                fontSize={20}
                                weight="bold"/>
                        </View>
                        <View style={[styles.bigGap, styles.horizontalSpacing]}>
                            <MainText
                                text={post.description}
                                fontSize={14}
                                fontColor={ColorConstants.white70PercentColor}/>
                        </View>
                        <View style={[styles.bigGap, styles.horizontalSpacing, {width: 200, marginBottom: 20}]}>
                            {post.user.contacts && 
                                <UserContact
                                    contacts={post.user.contacts}/>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
           }
        </>
    )
}

const LoadingScreen = () => {
    return (
        <View>
            <MainText text="Loading..." fontSize={25} weight="bold"/>
        </View>
    )
}

export default Post;