import { View } from "react-native";
import styles from "./style/style";
import MainText from "../../modules/text/MainText";
import ButtonWithIcon from "../../modules/buttonWithIcon/ButtonWithIcon";
import Search from "../../../images/search.svg"
import Home from "../../../images/home.svg"
import Profile from "../../../images/profile.svg"
import Add from "../../../images/add.svg"
import Chat from "../../../images/chat.svg"
import NavbarProps from "./props/props";
import { useState } from "react";

const Navbar = (props : NavbarProps) => {
    const activeStyle = {
        icon : {color:"#6D0FF2", opacity:1}
    }
    const unactiveStyle = {
        icon : {color:"#ffff", opacity:0.6}
    }

    let [activeButton, setActiveButton] = useState([1, 0, 0, 0, 0])

    const onPressButton = (index: number, callback : () => void) => {
        let buttonState = [0, 0, 0, 0, 0]
        buttonState[index] = 1;
        setActiveButton(buttonState);

        callback()
    }

    return (
        <View style={styles.mainView}>
            <ButtonWithIcon
                onPress={() => onPressButton(0, props.onPressHome)}
                style={styles.button}>
                    <Home {... activeButton[0] == 1 ? activeStyle.icon : unactiveStyle.icon}/>
                    <MainText text={"Accueil"} fontSize={11} />
            </ButtonWithIcon>
            <ButtonWithIcon
                onPress={() => onPressButton(1, props.onPressSearch)}
                style={styles.button}>
                    <Search {... activeButton[1] == 1 ? activeStyle.icon : unactiveStyle.icon}/>
                    <MainText text={"Chercher"} fontSize={11} />
            </ButtonWithIcon>
            <ButtonWithIcon
                onPress={() => onPressButton(2, props.onPressAdd)}
                style={styles.button}>
                    <Add {...unactiveStyle.icon}/>
                    <MainText text={"Ajouter"} fontSize={11} />
            </ButtonWithIcon>
            <ButtonWithIcon
                onPress={() => onPressButton(3, props.onPressMessages)}
                style={styles.button}>
                    <Chat {... activeButton[3] == 1 ? activeStyle.icon : unactiveStyle.icon}/>
                    <MainText text={"Messages"} fontSize={11} />
            </ButtonWithIcon>
            <ButtonWithIcon
                onPress={() => onPressButton(4, props.onPressProfile)}
                style={styles.button}>
                    <Profile {... activeButton[4] == 1 ? activeStyle.icon : unactiveStyle.icon}/>
                    <MainText text={"Profile"} fontSize={11} />
            </ButtonWithIcon>
        </View>
    );
}

export default Navbar