import { TouchableHighlight, View } from "react-native"
import RightArrow from "../../../images/rightArrow.svg";
import NavigateButtonProps from "./props/navigateButtonProps";
import styles from "./style/navigateButtonStyle";
import { ColorConstants } from "../../constants/ThemeConstants";

const NavigateButton = (props : NavigateButtonProps) => {
    return (
        <View
            style={props.style}>
        
            <TouchableHighlight
                onPress={props.onPress}
                underlayColor={ColorConstants.greyMainColor}
                style={styles.button}>
                
                <View
                    style={styles.buttonContainer}>
                    {props.children}
                    <RightArrow color={'white'} />
                </View>

            </TouchableHighlight>

        </View>
    )
}

export default NavigateButton;
