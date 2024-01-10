import { PanResponder, ScrollView, View } from "react-native"
import styles from "./style/style"
import MainText from "../../modules/text/MainText"
import SearchBar from "../../components/searchBar/SearchBar"
import Carousels from "../../components/carousel/Carousel"
import Post from "../../models/Post"
import EPostType from "../../models/enums/EPostType"
import { useRef, useState } from "react"

const Home = () => {

    const onPressSearch = (value: string) => {
        //TODO: redirect to seach page with result of text input
    }

    const getRecentPosts = (): Post[] => {
        return [
            {
                blobPaths: [require("../../../images/postImageExample.png")],
                title: "New Book 1",
                shortDescription: "Short desc 1",
                description: "Description 1",
                price: 9.99,
                type: EPostType.BOOK,
                user: {
                    id: 1,
                    name: "Mathéo",
                    picture: require("../../../images/ppExample.png")
                }
            },
            {
                blobPaths: [require("../../../images/postImageExample.png")],
                title: "Random Book 2",
                shortDescription: "Short desc 2",
                description: "Description 2",
                price: 12.99,
                type: EPostType.BOOK,
                user: {
                    id: 2,
                    name: "Nicolas"
                }
            },
            {
                blobPaths: [require("../../../images/postImageExample.png")],
                title: "Random Book 3",
                shortDescription: "Short desc 3",
                description: "Description 3",
                price: 15.99,
                type: EPostType.BOOK,
                user: {
                    id: 3,
                    name: "Max",
                    picture: require("../../../images/ppExample.png")
                }
            },
            {
                blobPaths: [require("../../../images/postImageExample.png")],
                title: "Random Book 4",
                shortDescription: "Short desc 4",
                description: "Description 4",
                price: 19.99,
                type: EPostType.BOOK,
                user: {
                    id: 4,
                    name: "Antoine",
                    picture: require("../../../images/ppExample.png")
                }
            },
            {
                blobPaths: [require("../../../images/postImageExample.png")],
                title: "Random Book 5",
                shortDescription: "Short desc 5",
                description: "Description 5",
                price: 22.99,
                type: EPostType.BOOK,
                user: {
                    id: 5,
                    name: "Sacha",
                    picture: require("../../../images/ppExample.png")
                }
            }
        ]
    }

    const [isScrollEnabled, enableScroll] = useState(true)

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


    return (
        <ScrollView
            style={styles.mainView}
            contentContainerStyle={styles.mainContainerChildProps}
            scrollEnabled={isScrollEnabled}
            {...panResponder.panHandlers}>
            
            {/*Seach bar*/}
            <View style={styles.searchBarContainer}>
                <MainText
                    weight={'700'}
                    fontSize={25}
                    text="Qu'est ce que tu cherches ?"
                    style={styles.searchBarTitle}/>
                <SearchBar
                    style={styles.searchBar}
                    onPressSearch={onPressSearch}/>
            </View>

            {/*new book posts*/}
            <View style={styles.newBookPostsContainer}>
                <MainText weight={'700'} fontSize={20} text="Livres mis récemment en vente" />
                <Carousels
                    items={getRecentPosts()}/>
            </View>

            {/*new course posts*/}
            <View style={styles.newCoursePostsContainer}>
                <MainText weight={'700'} fontSize={20} text="Nouvelles propositions de cours" />
                <Carousels
                    items={getRecentPosts()}/>
            </View>

        </ScrollView>
    )
}

export default Home;