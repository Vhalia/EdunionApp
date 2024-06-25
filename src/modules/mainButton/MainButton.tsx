import { TouchableHighlight, View } from "react-native";
import MainButtonProps from "./props/MainButtonProps";
import styles from "./style/MainButtonStyle";
import MainText from "../text/MainText";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const MainButton = (props : MainButtonProps) => {
    const [isLoading, setIsLoading] = useState(props.isLoading ?? false)

    useEffect(() => {
        if (props.isLoading === undefined)
            return

        setIsLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <TouchableHighlight
            style={[styles.container, props.style]}
            onPress={props.onPress}
            disabled={props.disabled ?? isLoading}>
            
            {isLoading
                ? <Loading radius={10} strokeWidth={2} />
                : <MainText
                    weight={props.fontWeight ?? '700'}
                    fontSize={props.fontSize ?? 15}
                    text={props.text}
                    fontColor={props.fontColor ?? ColorConstants.whiteMainColor}/>
            }

        </TouchableHighlight>
    )    
}

export default MainButton