import { TouchableHighlight, View } from "react-native";
import MainButtonProps from "./props/MainButtonProps";
import styles from "./style/MainButtonStyle";
import MainText from "../text/MainText";
import { ColorConstants } from "../../constants/ThemeConstants";

const MainButton = (props : MainButtonProps) => {
    return (
        <TouchableHighlight
            style={[styles.container, props.style]}
            onPress={props.onPress}
            disabled={props.disabled}>

            <MainText
                weight={props.fontWeight ?? '700'}
                fontSize={props.fontSize ?? 15}
                text={props.text}
                fontColor={props.fontColor ?? ColorConstants.whiteMainColor}/>

        </TouchableHighlight>
    )    
}

export default MainButton