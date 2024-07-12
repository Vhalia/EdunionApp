import { TouchableHighlight, View } from "react-native";
import ButtonWithIconProps from "./props/buttonWithIconProps";

const ButtonWithIcon = (props : ButtonWithIconProps) => {
    return (
        <TouchableHighlight style={props.containerStyle} onPress={props.onPress} underlayColor={props.underlayColor}>
            <View style={props.style}>
                {props.children}
            </View>
        </TouchableHighlight>
    );
}

export default ButtonWithIcon