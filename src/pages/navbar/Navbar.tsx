import { View } from "react-native";
import styles from "./style/style";
import MainText from "../../modules/text/MainText";
import ButtonWithIcon from "../../modules/buttonWithIcon/ButtonWithIcon";
import Search from "../../../images/search.svg"
import Home from "../../../images/home.svg"
import Profile from "../../../images/profile.svg"
import Add from "../../../images/add.svg"
import Chat from "../../../images/chat.svg"

const Navbar = () => {
    

    return (
        <View style={styles.mainView}>
            <ButtonWithIcon
                icon={Home}
                iconStyle={{color : "#6D0FF2", opacity: 1}}
                onPress={() => {}}
                text="Accueil"
                style={styles.button}/>
            <ButtonWithIcon
                icon={Search}
                onPress={() => {}}
                text="Chercher"
                style={styles.button}/>
            <ButtonWithIcon
                icon={Add}
                onPress={() => {}}
                text="Ajouter"
                style={styles.button}/>
            <ButtonWithIcon
                icon={Chat}
                onPress={() => {}}
                text="Messages"
                style={styles.button}/>
            <ButtonWithIcon
                icon={Profile}
                onPress={() => {}}
                text="Profile"
                style={styles.button}/>
        </View>
    );
}

export default Navbar