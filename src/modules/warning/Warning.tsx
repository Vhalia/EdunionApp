import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { ColorConstants } from "../../constants/ThemeConstants"
import MainText from "../text/MainText"

const Warning = (props: WarningProps) => {
    let titleTextColor = ColorConstants.blue
    if (props.type === 'error') {
        titleTextColor = ColorConstants.red
    }else if (props.type === 'warning') {
        titleTextColor = ColorConstants.orangeColor
    }

    let titleText = "Info"
    if (props.type === 'error') {
        titleText = "Erreur !"
    }else if (props.type === 'warning') {
        titleText = "Attention !"
    }

    return (
        <View style={[styles.mainContainer, props.style]}>
            <MainText
                text={titleText}
                fontSize={14}
                fontColor={titleTextColor}/>
            <MainText
                text={props.text}
                fontSize={14}
                fontColor={ColorConstants.greyLighterColor}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 14,
        padding: 10,
        marginTop: 10,
        backgroundColor: ColorConstants.blackMainColor
    }
})

interface WarningProps {
    text: string,
    type: 'error' | 'warning' | 'normal'
    style?: StyleProp<ViewStyle>
}

export type {WarningProps}

export default Warning