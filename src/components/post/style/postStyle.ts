import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    container : {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor
    },
    content: {
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 14,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    gap: {
        marginTop: 5
    },
    bigGap : {
        marginTop: 20
    },
    horizontalSpacing : {
        marginLeft: 10,
        marginRight: 10
    }
})

export default styles;