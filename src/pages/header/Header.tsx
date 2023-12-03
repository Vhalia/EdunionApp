import { View } from "react-native";
import styles from './style/style';
import Logo from '../../../images/logo.svg'

const Header = () => {
    return (
        <View style={styles.background}>
            <Logo style={styles.logo} width={117} height={23} />
        </View>
    );
}

export default Header;