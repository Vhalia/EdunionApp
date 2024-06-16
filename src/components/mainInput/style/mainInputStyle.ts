import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderRadius: 14,
        width: "100%"
    },
    container: {
        borderRadius: 14,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputs : {
        padding: 10,
        borderRadius: 14,
        color: ColorConstants.whiteMainColor,
        width: "90%"
    },
    eyeIcon: {
        marginRight: 10
    },
    error: {
        borderColor: ColorConstants.red70PercentColor,
        borderWidth: 2
    }
})

export default styles;