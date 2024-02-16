import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: ColorConstants.blackMainColor,
        padding: 10,
        borderRadius: 14,
        marginRight: 5,
        marginBottom: 5
    },
    tagText: {
        color: 'white'
    }
})

export default styles;