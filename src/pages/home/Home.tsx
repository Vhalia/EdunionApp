import { Text, View } from "react-native"
import styles from "./style/style"
import MainText from "../../modules/text/MainText"
import SearchBar from "../../components/searchBar/SearchBar"

const Home = () => {
    return (
        <View style={styles.mainView}>
            <View>
                <MainText weight={'700'} fontSize={20} text="Qu'est ce que tu cherches ?" />
                <SearchBar />
            </View>
        </View>
    )
}

export default Home;