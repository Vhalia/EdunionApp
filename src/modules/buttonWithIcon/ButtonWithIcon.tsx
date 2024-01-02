import { TouchableHighlight, View } from "react-native";
import ButtonWithIconProps from "./props/buttonWithIconProps";

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