import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    inputs : {
        backgroundColor: ColorConstants.blackMainColor,
        borderRadius: 14,
        color: ColorConstants.whiteMainColor
    },
    gap : {
        marginTop: 5
    },
    bigGap : {
        marginTop: 20
    },
    photo: {
        width: 150,
        height: 150
    }
})

export default styles;