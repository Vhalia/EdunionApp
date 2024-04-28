import { View } from "react-native";
import HeaderProps from "./props/HeaderProps";
import styles from "./style/HeaderStyle";

const Header = (props : HeaderProps) =>{
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    );
}

export default Header;