import React, { ReactElement } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import {IIconDropdownElementProps} from "./props/props";
import MainText from "../../text/MainText";

const IconDropdownElement = (props : IIconDropdownElementProps) : ReactElement<IIconDropdownElementProps> => {

    return(
        <View
            style={props.containerStyle}>

            {props.icon}
            <MainText
                style={props.textStyle}
                fontSize={11}
                text={props.text ?? ""}
            />

        </View>
    )
}

export default IconDropdownElement;