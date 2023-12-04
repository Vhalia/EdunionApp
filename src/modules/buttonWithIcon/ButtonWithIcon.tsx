import { Button, TouchableHighlight, View } from "react-native";
import ButtonWithIconProps from "./props/buttonWithIconProps";
import Search from "../../../images/search.svg";
import MainText from "../text/MainText";
import { Svg, SvgUri } from "react-native-svg";


const ButtonWithIcon = (props : ButtonWithIconProps) => {
    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={props.style}>
                {props.children}
            </View>
        </TouchableHighlight>
    );
}

export default ButtonWithIcon