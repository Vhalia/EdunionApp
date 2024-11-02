import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConstants.blackSecondaryColor,
        height: 40,
        width: "100%",
    },
})

export default styles;