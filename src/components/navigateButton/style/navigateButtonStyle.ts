import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 14
    },
    button: {
        borderRadius: 14
    }
})


export default styles;