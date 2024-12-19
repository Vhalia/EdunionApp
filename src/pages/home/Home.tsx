import { PanResponder, PermissionsAndroid, Platform, ScrollView, TouchableHighlight, View } from "react-native"
import styles from "./style/style"
import MainText from "../../modules/text/MainText"
import SearchBar from "../../components/searchBar/SearchBar"
import Carousels from "../../components/carousel/Carousel"
import Post from "../../models/Post"
import EPostType from "../../models/enums/EPostType"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import FoldHeader from "../../components/foldHeader/FoldHeader"
import Animated, { useSharedValue } from "react-native-reanimated"
import Logo from '../../../images/logo.svg'
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import EPostStatus from "../../models/enums/EPostStatus"
import Context from "../../contexts/AuthContext/AuthContext";
import useUserService from "../../hooks/useUserService"
import Toast from "react-native-toast-message"
import EUserState from "../../models/enums/EUserState"
import usePostService from "../../hooks/usePostService"
import Loading from "../../modules/Loading/Loading"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ColorConstants } from "../../constants/ThemeConstants"
import messaging from '@react-native-firebase/messaging';
import useUserDeviceService from "../../hooks/useUserDeviceService"

const Home = () => {
    console.log("---------------------------------")
    const swipeProgress = useSharedValue<number>(0);
    const [isScrollEnabled, enableScroll] = useState(true)
    const [bookPosts, setBookPosts] = useState<Post[]>([]);
    const [coursePosts, setCoursePosts] = useState<Post[]>([]);

    const [bookPostIsLoading, setBookPostIsLoading] = useState(false);
    const [coursePostIsLoading, setCoursePostIsLoading] = useState(false);

    const navigation = useNavigation<any>();
    const authContext = useContext(Context);
    const userService = useUserService();
    const postService = usePostService();
    const userDeviceService = useUserDeviceService();

    useEffect(() => {
        if (!authContext?.token)
            return;
        
        userService.get()
             .then(res => {
                authContext!.setCurrentUser(res)

                if (res.state === EUserState.INACTIVE){
                    Toast.show({
                        type: "info",
                        text1: "Veuillez valider votre école.",
                        text2: "Allez dans votre profile pour envoyer une preuve.",
                        visibilityTime: 30000,
                        onPress: () => navigation.navigate("Profile"),
                        swipeable: true
                    })
                }
             })
             .catch(err => {
                console.log(err)
                navigation.navigate("Login")
            })

        setBookPostIsLoading(true);
        setCoursePostIsLoading(true);
        
        postService.getDetailed(EPostType.BOOK, 5, 0).then((response) => {
            setBookPosts(response.result)
            setBookPostIsLoading(false);
        }).catch((err) => {
            console.log(err)
            setBookPostIsLoading(false);
        })

        postService.getDetailed(EPostType.COURSE, 5, 0).then((response) => {
            setCoursePosts(response.result)
            setCoursePostIsLoading(false);
        }).catch((err) => {
            console.log(err)
            setCoursePostIsLoading(false);
        })
    }, [authContext!.token])

    useEffect(() => {
        requestPnPermission()
        .then((enabled) => {
            if (!enabled) return;

            registerUserDevice()
        }).catch((err) => {
            console.log(err)
        })
        
    }, [])


    messaging().onTokenRefresh(async (token: string) => {
        registerUserDevice(token)
    })
    
    const requestPnPermission = async () => {
        let enabled = false;
        
        if (Platform.OS == "ios"){
            const permissionStatus = await messaging().requestPermission();
            enabled =
                permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;
            
            if (enabled && !messaging().isDeviceRegisteredForRemoteMessages)
                await messaging().registerDeviceForRemoteMessages();
        }else if (Platform.OS == "android"){
            const permissionStatus  = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            enabled = permissionStatus === 'granted' || permissionStatus === 'never_ask_again';
        }
    
        console.log('Push notification permission status:', enabled);

        return enabled;
    }

    const registerUserDevice = async (refreshedToken?: string) => {
        try{
            const token = refreshedToken ?? await messaging().getToken()
            if (!token)
                return;
            
            await userDeviceService.register(token)
        }catch(err){
            console.log(err)
        }
    }

    const onPressSearch = (value: string) => {
        navigation.navigate("Search", {search: value});
    }

    const onPressSideButtonSearchBar = () => {
        navigation.navigate("Search", {openAdvancedSearch: true});
    }

    const onPostCardPress = (postId: number) => {
        navigation.navigate("Post", {postId: postId});
    }

    const onScroll = (event: any) => {
        swipeProgress.set(event.nativeEvent.contentOffset.y)
    }

    return (
        //It fixes the conflict between carousel horizontal scroll view and whole page vertical scroll view
        <GestureHandlerRootView style={{flex: 1}}>
            <View
                style={styles.mainContainer}>

                <FoldHeader
                    baseHeight={100}
                    minHeight={60}
                    swipeProgress={swipeProgress}
                    style={styles.headerContainer}>

                    <Logo style={styles.logo} width={200} height={30} />

                </FoldHeader>
                
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.mainContainerChildProps}
                    onScroll={onScroll}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={isScrollEnabled}>
                    
                    <View style={styles.searchBarContainer}>
                        <MainText
                            weight={'700'}
                            fontSize={25}
                            text="Qu'est ce que tu cherches ?"
                            style={styles.searchBarTitle}/>
                        <SearchBar
                            style={styles.searchBar}
                            onPressSearch={onPressSearch}
                            sideButtonMode="button"
                            onPressSideButton={onPressSideButtonSearchBar}/>
                    </View>

                    <View style={styles.newBookPostsContainer}>
                        <MainText weight={'700'} fontSize={20} text="Livres mis récemment en vente" />
                        {bookPostIsLoading
                            ? <Loading />
                            : bookPosts?.length > 0 ? (
                                    <Carousels
                                        items={bookPosts}
                                        onPressItem={(item, index) => onPostCardPress(item.id)}/>)
                                : (
                                    <MainText
                                        text="Il n'y a rien ici..."
                                        fontSize={20}
                                        fontColor={ColorConstants.white70PercentColor}
                                        style={{margin: 10}}/>
                                )
                        }
                    </View>

                    <View style={styles.newCoursePostsContainer}>
                        <MainText weight={'700'} fontSize={20} text="Nouvelles propositions de cours" />
                        {coursePostIsLoading
                            ? <Loading />
                            : coursePosts?.length > 0 ? (
                                    <Carousels
                                        items={coursePosts}
                                        onPressItem={(item, index) => onPostCardPress(item.id)}/>)
                                : (
                                    <MainText
                                        text="Il n'y a rien ici..."
                                        fontSize={20}
                                        fontColor={ColorConstants.white70PercentColor}
                                        style={{margin: 10}}/>
                                )
                        }
                    </View>

                </ScrollView>
            </View>
        </GestureHandlerRootView>
    )
}

export default Home;