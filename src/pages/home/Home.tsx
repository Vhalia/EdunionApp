import { ScrollView, Text, View } from "react-native"
import styles from "./style/style"
import MainText from "../../modules/text/MainText"
import SearchBar from "../../components/searchBar/SearchBar"

const Home = () => {
    return (
        <ScrollView
            style={styles.mainView}
            contentContainerStyle={styles.mainContainerChildProps}>
            
            {/*Seach bar*/}
            <View style={styles.searchBarContainer}>
                <MainText
                    weight={'700'}
                    fontSize={25}
                    text="Qu'est ce que tu cherches ?"
                    style={styles.searchBarTitle}/>
                <SearchBar style={styles.searchBar}/>
            </View>

            {/*Recent posts*/}
            <View style={styles.recentPostsContainer}>
                <MainText weight={'700'} fontSize={20} text="Livres mis récemment en vente" />

            </View>

            {/*New posts suggestion*/}
            <View style={styles.newPostsContainer}>
                <MainText weight={'700'} fontSize={20} text="Nouvelles propositions de cours" />

            </View>

        </ScrollView>
    )
}

export default Home;