import { Text, View } from "react-native"
import styles from "./style/style"
import MainText from "../../modules/text/MainText"

const Home = () => {
    return (
        <View style={styles.mainView}>
            <MainText weight={'700'} fontSize={20} text="Qu'est ce que tu cherches ?" />
        </View>
    )
}

export default Home;