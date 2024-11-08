import { Text } from "react-native";
import MainTextProps from "./props/props";
import { ColorConstants } from "../../constants/ThemeConstants";

const MainText = (props : MainTextProps) => {
    let fontColor = props.fontColor ?? ColorConstants.whiteMainColor
    return (
        <Text style={[{
            fontSize: props.fontSize,
            fontWeight: props.weight ? props.weight : '400',
            color : fontColor,
            fontFamily: 'inter'
        }, props.style]}>
            {props.text}
        </Text>
    )
}

export default MainText;