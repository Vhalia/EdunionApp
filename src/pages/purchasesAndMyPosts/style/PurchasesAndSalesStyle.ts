import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const style = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConstants.blackSecondaryColor,
        height: 100,
        width: "100%",
    },
    contentContainer : {
        display: 'flex',
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor,
    },
    content: {
        marginLeft: 10,
        marginRight: 10,
        display : "flex",
        flex :1
    },
    gap : {
        marginTop: 10 
    },
    bigGap : {
        marginTop: 20
    }
})

export default style;