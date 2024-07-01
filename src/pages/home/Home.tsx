import { PanResponder, ScrollView, View } from "react-native"
import styles from "./style/style"
import MainText from "../../modules/text/MainText"
import SearchBar from "../../components/searchBar/SearchBar"
import Carousels from "../../components/carousel/Carousel"
import Post from "../../models/Post"
import EPostType from "../../models/enums/EPostType"
import { useContext, useEffect, useRef, useState } from "react"
import FoldHeader from "../../components/foldHeader/FoldHeader"
import Animated, { useSharedValue } from "react-native-reanimated"
import Logo from '../../../images/logo.svg'
import { useNavigation } from "@react-navigation/native"
import EPostStatus from "../../models/enums/EPostStatus"
import Context from "../../contexts/AuthContext/AuthContext";
import useUserService from "../../hooks/useUserService"
import Toast from "react-native-toast-message"
import EUserState from "../../models/enums/EUserState"

const Home = () => {
    console.log("---------------------------------")
    const swipeProgress = useSharedValue<number>(0);
    const [isScrollEnabled, enableScroll] = useState(true)
    const navigation = useNavigation<any>();
    const authContext = useContext(Context);
    const userService = useUserService();

    useEffect(() => {
        if (!authContext!.token)
            return;
        
        userService.get()
             .then(res => {
                authContext!.setCurrentUser(res)
                console.log(res)

                if (res.state === EUserState.INACTIVE){
                    Toast.show({
                        type: "info",
                        text1: "Appuyez ici pour valider votre école",
                        text2: "Certaines fonctionnalitées sont désactivées tant que ce n'est pas fait.",
                        swipeable: true,
                        visibilityTime: 30000,
                        onPress: () => navigation.navigate("Profile")
                    })
                }
             })
             .catch(err => {
                console.log(err)
            })
    }, [authContext!.token])

    const onPressSearch = (value: string) => {
        //TODO: redirect to seach page with result of text input
    }

    const onPostCardPress = (postId: number) => {
        navigation.navigate("Post", {postId: postId});
    }

    const getRecentPosts = (): Post[] => {
        return [
            {
                id: 1,
                title: "Post 1",
                description: "description 1",
                shortDescription: "short description 1",
                type: EPostType.BOOK,
                price: 5,
                user : {
                    id: 1,
                    firstName: "Mathieu",
                    lastName: "test",
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
                    firstName: "John",
                    lastName: "test",
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
                    firstName: "Bob",
                    lastName: "test",
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
                    firstName: "Maria",
                    lastName: "test",
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
    }


    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder : () => true,
        onPanResponderMove: (_, gestureState) => {
          if (Math.abs(gestureState.dy) > 4){
            enableScroll(true)
          }else{
            enableScroll(false)
          }
        }
      })).current;

    const onScroll = (event: any) => {
        swipeProgress.value = event.nativeEvent.contentOffset.y
    }

    return (
        <Animated.View
            style={styles.mainContainer}>

            <FoldHeader
                baseHeight={150}
                minHeight={60}
                swipeProgress={swipeProgress}
                style={styles.headerContainer}>

                <Logo style={styles.logo} width={117} height={23} />

            </FoldHeader>
            <Animated.ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.mainContainerChildProps}
                onScroll={onScroll}
                showsVerticalScrollIndicator={false}
                scrollEnabled={isScrollEnabled}
                {...panResponder.panHandlers}
                >
                
                {/*Seach bar*/}
                <Animated.View style={styles.searchBarContainer}>
                    <MainText
                        weight={'700'}
                        fontSize={25}
                        text="Qu'est ce que tu cherches ?"
                        style={styles.searchBarTitle}/>
                    <SearchBar
                        style={styles.searchBar}
                        onPressSearch={onPressSearch}/>
                </Animated.View>

                {/*new book posts*/}
                <Animated.View style={styles.newBookPostsContainer}>
                    <MainText weight={'700'} fontSize={20} text="Livres mis récemment en vente" />
                    <Carousels
                        items={getRecentPosts()}
                        onPressItem={(item, index) => onPostCardPress(item.id)}/>
                </Animated.View>

                {/*new course posts*/}
                <Animated.View style={styles.newCoursePostsContainer}>
                    <MainText weight={'700'} fontSize={20} text="Nouvelles propositions de cours" />
                    <Carousels
                        items={getRecentPosts()}
                        onPressItem={(item, index) => onPostCardPress(item.id)}/>
                </Animated.View>

            </Animated.ScrollView>
        </Animated.View>
    )
}

export default Home;