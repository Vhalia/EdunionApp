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
    title:{
        marginLeft: 3
    },
    photo: {
        width: 150,
        height: 150
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.purpleMainColor,
        padding: 10,
        width: 295,
        marginTop: 20,
        marginBottom: 70
    },
    dropDown: {
        color: ColorConstants.whiteMainColor,
        backgroundColor: ColorConstants.blackMainColor,
        borderRadius: 14,
        borderWidth: 4,
        borderColor: ColorConstants.transparent,
        width: '90%'
    }
})

export default styles;