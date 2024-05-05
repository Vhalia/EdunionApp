import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor
    },
    contentContainer: {
        display: "flex",
        flex: 1,
        padding: 10,
        backgroundColor: ColorConstants.greyMainColor,
        marginTop: 30,
        marginRight: 10,
        marginLeft: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    backButtonContainer: {
        display: "flex",
        margin: 5,
        flexDirection: "row",
        width: 40,
        height: 40,
        //backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default styles;