import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        backgroundColor: ColorConstants.blackSecondaryColor,
        width : 350,
        // height : 150,
        borderRadius: 14,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    photo: {
        width: 70,
        height: 70,
        margin: 5,
        borderRadius: 8,
        backgroundColor: ColorConstants.greyMainColor,
        justifyContent: "center",
        alignItems: "center",
    },
    etcContainer: {
        width: 70,
        height: 70,
        margin: 5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;