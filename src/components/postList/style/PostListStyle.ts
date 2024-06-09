import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const style = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor,
        gap: 10
    },
    post: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 14,
        marginBottom: 10,
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center"
    },
    status : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    }
})

export default style