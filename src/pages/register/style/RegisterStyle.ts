import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer : {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor
    },
    inputContainer: {
        display: "flex",
        gap: 10
    },
    input: {
        color: ColorConstants.whiteMainColor,
        backgroundColor: ColorConstants.blackSecondaryColor,
        width: "100%"
    },
    dropDown: {
        color: ColorConstants.whiteMainColor,
        backgroundColor: ColorConstants.blackSecondaryColor,
        borderRadius: 14,
        borderWidth: 4
    },
    chooseSchoolTitle: {
        marginTop: 30,
        marginLeft: 10
    }
})

export default styles;