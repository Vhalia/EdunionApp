import { View } from "react-native";
import SettingProps from "./props/settingProps";
import styles from "./style/settingStyle";

const Setting = (props : SettingProps) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
               {props.renderContent()} 
            </View>
        </View>
    );
}

export default Setting;