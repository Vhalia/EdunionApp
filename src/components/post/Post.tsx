import { Dimensions, FlatList, Image, ImageBackground, ScrollView, View } from "react-native";
import PostProps from "./props/postProps";
import styles from "./style/postStyle";
import CarouselV2 from "../carousel-v2/CarouselV2";
import LinearGradient from "react-native-linear-gradient";
import { useCallback, useContext, useEffect, useState } from "react";
import {default as PostModel} from "../../models/Post";
import EPostType from "../../models/enums/EPostType";
import { StackActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
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
import EUserState from "../../models/enums/EUserState";
import Toast from "react-native-toast-message";
import BookSVG from "../../../images/book.svg"
import CourseSVG from "../../../images/course.svg"
import CalendarSVG from "../../../images/calendar.svg"
import TimeSVG from "../../../images/time.svg"
import dayjs from "dayjs"
import Warning from "../../modules/warning/Warning";
import useUserService from "../../hooks/useUserService";
import User from "../../models/User";

const Post = (props : PostProps) => {
    const [post, setPost] = useState<PostModel | undefined>(undefined);
    const [owner, setOwner] = useState<User|undefined>(post?.user)
    
    const route = useRoute();
    const navigation = useNavigation<any>();
    const postService = usePostService();
    const chatService = useChatService();
    const userService = useUserService();
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

    useFocusEffect(
        useCallback(() => {
            getPost()
        }, [])
    )

    useEffect(() => {
        if (!post?.user?.id)
            return;

        userService.getById(post.user.id)
            .then(setOwner)
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getPost = () => {
        if (!postId){
            return;
        }
        
        postService.get(postId).then((response) => {
            setPost(response);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getPost()
    }, [postId])

    const onPressContact = () => {
        if (!post?.id){
            return;
        }

        if (authContext?.currentUser?.state !== EUserState.ACTIVE){
            Toast.show({
                type: 'info',
                text1: 'Votre école n\'a pas été verifiée',
                text2: 'Votre école doit d\'abord être vérifiée avant de pouvoir contacter un utilisateur'
            })
            return;
        }

        chatService.create(post.id).then((chatId) => {
            navigation.navigate('Chat', {chatId: chatId})
        }).catch((err) => {
            console.log(err)
        })
    }
    
    const onPressModify = () => {
        navigation.navigate("PostEdit", {post: post})
    }
 
    useEffect(() => {
        navigation.addListener('beforeRemove', (e: any) => {
            if (routeParams.previousScreenName === 'AddPost') {
                e.preventDefault();
                navigation.navigate('Home')
            }
        })
    }, [navigation]);

    const displayBooks = () => {
        return (
            <View style={[styles.midGap, styles.booksContainer]}>
                {post?.books?.map((book, index) => {
                    return (
                        <View key={index} style={[styles.horizontalSpacing, styles.booksMainContainer]}>
                            <View>
                                <BookSVG width={22} height={22} color={ColorConstants.whiteMainColor} style={{marginTop: 5}}/>
                            </View>
                            <View style={styles.bookContainer}>
                                <View style={styles.bookLine}>
                                    <MainText
                                        text={book.title}
                                        fontSize={15}
                                        weight="bold"/> 
                                    {book.author && <MainText
                                        text="·"
                                        fontSize={16}
                                        weight="bold"/>}
                                    <MainText
                                        text={book.author ?? ""}
                                        fontSize={14}/>
                                </View>
                                <View style={styles.bookLine}>
                                    <MainText
                                        text={book.publicationDate?.toString() ?? ""}
                                        fontSize={13}
                                        fontColor={ColorConstants.white70PercentColor}/>
                                    {book.editor && <MainText
                                        text="·"
                                        fontSize={14}
                                        fontColor={ColorConstants.white70PercentColor}
                                        weight="bold"/>}
                                    <MainText
                                        text={book.editor ?? ""}
                                        fontSize={13}
                                        fontColor={ColorConstants.white70PercentColor}/>
                                    {book.isbn && <MainText
                                        text="·"
                                        fontSize={14}
                                        fontColor={ColorConstants.white70PercentColor}
                                        weight="bold"/>}
                                    <MainText
                                        text={book.isbn ?? ""}
                                        fontSize={13}
                                        fontColor={ColorConstants.white70PercentColor}/>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    const displaySchedules = () => {
        return (
            <View style={[styles.midGap, styles.schedulesContainer]}>
                {post?.schedules?.map((book, index) => {
                    return (
                        <View key={index} style={[styles.horizontalSpacing, styles.schedulesMainContainer]}>
                            <View style={styles.scheduleContainer}>
                                <View style={styles.scheduleLine}>
                                    <CalendarSVG
                                        width={22}
                                        height={22}
                                        color={ColorConstants.whiteMainColor}
                                        fill={ColorConstants.whiteMainColor}/>
                                    <MainText
                                        text={dayjs(book.startDate).format("dddd, DD MMMM YYYY") ?? ""}
                                        fontSize={14}/> 
                                </View>
                                <View style={styles.scheduleLine}>
                                    <TimeSVG
                                        width={22}
                                        height={22}
                                        color={ColorConstants.white70PercentColor}
                                        fill={ColorConstants.white70PercentColor}/>
                                    <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                        <MainText
                                            text={dayjs(book.startDate).format("HH:mm") ?? ""}
                                            fontColor={ColorConstants.white70PercentColor}
                                            fontSize={14}/>
                                        <MainText
                                            text="-"
                                            fontSize={14}
                                            fontColor={ColorConstants.white70PercentColor}
                                            weight="bold"/>
                                        <MainText
                                            text={dayjs(book.endDate).format("HH:mm") ?? ""}
                                            fontColor={ColorConstants.white70PercentColor}
                                            fontSize={14}/> 
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
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
                        ? [noImageGradientColors[0][0]]
                        : post.blobPaths
                    }
                    paginationPosition="bottom"
                    loop
                    renderItem={(image, index) => {
                        return (
                            <View>
                            {(image.startsWith("http")) ?
                                <Image
                                    source={{uri: image}}
                                    style={{width: windowWidth, height: windowHeight/2}}
                                    resizeMode="cover"
                                />
                            :
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
                            <View style={styles.titleContainer}>
                                <MainText
                                    text={post.title}
                                    fontSize={20}
                                    weight="bold"/>
                                {post.type == EPostType.COURSE &&
                                    <CourseSVG
                                        width={20}
                                        height={20}
                                        color={ColorConstants.whiteMainColor}
                                        style={styles.gap}/>}
                                {post.type == EPostType.BOOK &&
                                    <BookSVG
                                        width={20}
                                        height={20}
                                        color={ColorConstants.whiteMainColor}
                                        style={styles.gap}/>}
                            </View>
                            {post.shortDescription &&<MainText
                                text={post.shortDescription}
                                fontSize={14}
                                fontColor={ColorConstants.white70PercentColor}
                                style={styles.gap}/>}
                        </View>
                        <View style={[styles.gap, styles.horizontalSpacing]}>
                            <MainText
                                text={"Gratuit"}
                                fontSize={16}/>
                        </View>
                        <View style={[styles.bigGap, styles.horizontalSpacing]}>
                            <MainText
                                text={post.description}
                                fontSize={14}
                                fontColor={ColorConstants.white70PercentColor}/>
                        </View>
                    </View>

                    <View style={[styles.content, styles.gap, styles.bigGapDown, {paddingBottom: 10}]}>
                        {post.type == EPostType.BOOK && displayBooks()}
                        {post.type == EPostType.COURSE && displaySchedules()}
                    </View>

                    {(post.type == EPostType.BOOK && owner?.paymentInformation?.iban) &&
                        <View style={[styles.content, styles.gap, styles.bigGapDown, {padding: 10}]}>
                            <View>
                                <MainText
                                    text="IBAN"
                                    fontSize={16}
                                    weight="bold"/>
                                <MainText
                                    text={owner?.paymentInformation?.iban ?? ""}
                                    fontSize={14}/>
                            </View>
                            <Warning
                                text="Les posts sont à donation libre. Vous pouvez donner ce que vous voulez pour remercier l'utilsateur."
                                type="warning"/>
                        </View>
                    }

                    {post.user.id !== authContext?.currentUser?.id
                    ?
                        <View style={[styles.bigGap, styles.horizontalSpacing, {marginBottom: 20}]}>
                            <MainButton
                                text="Contactez"
                                onPress={onPressContact}
                                style={styles.button}/>
                        </View>
                        : 
                        <View style={[styles.bigGap, styles.horizontalSpacing, {marginBottom: 20}]}>
                            <MainButton
                                text="Modifier"
                                onPress={onPressModify}
                                style={styles.button}/>
                        </View>
                    }
                </View>
            </ScrollView>
           }
        </>
    )
}

export default Post;