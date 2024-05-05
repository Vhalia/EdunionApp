import { TouchableHighlight, View } from "react-native";
import SettingProps from "./props/settingProps";
import styles from "./style/settingStyle";
import LeftArrowSVG from "../../../../images/leftArrow.svg"
import { ColorConstants } from "../../../constants/ThemeConstants";

const Setting = (props : SettingProps) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableHighlight
                    onPress={() => props.navigation.goBack()}
                    underlayColor={ColorConstants.greyMainColor}
                    style={styles.backButtonContainer}>
                    <LeftArrowSVG color={ColorConstants.whiteMainColor}/>
                </TouchableHighlight>
               {props.renderContent()} 
            </View>
        </View>
    );
}

export default Setting;