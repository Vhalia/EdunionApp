import { TouchableHighlight, View } from "react-native"
import RightArrowSVG from "../../../images/rightArrow.svg";
import NavigateButtonProps from "./props/navigateButtonProps";
import styles from "./style/navigateButtonStyle";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useNavigation } from "@react-navigation/native";

const NavigateButton = (props : NavigateButtonProps) => {
    const navigation = useNavigation<any>();
    
    const onPress = () => {
        navigation.navigate(props.redirectScreenName);
    }
    
    return (
        <View
            style={props.style}>
        
            <TouchableHighlight
                onPress={onPress}
                underlayColor={ColorConstants.greyMainColor}
                style={styles.button}>
                
                <View
                    style={styles.buttonContainer}>
                    {props.children}
                    <RightArrowSVG color={'white'} />
                </View>

            </TouchableHighlight>

        </View>
    )
}

export default NavigateButton;
