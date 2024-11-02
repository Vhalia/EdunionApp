import { Text, View } from "react-native";
import styles from './style/headerStyle';
import Logo from '../../../images/logo.svg'
import HeaderProps from "./props/headerProps";
import FoldHeader from "../../components/foldHeader/FoldHeader";

const Header = (props : HeaderProps) => {
    return (
        <View style={[styles.background]}>

            <Logo style={styles.logo} width={117} height={23} />

        </View>
    );
}

export default Header;