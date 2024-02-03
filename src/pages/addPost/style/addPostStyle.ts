import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "red"
    },
    gap: {
        marginTop: 20
    },
    minorGap: {
        marginTop: 5
    },
    header : {
        display: 'flex',
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConstants.blackSecondaryColor
    },
    contentContainer : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoUploaderContainer : {
        display: 'flex',
        flex: 1,
    },
    informationsContainer : {
        display: 'flex',
        flex : 2,
        justifyContent: 'center',
    },
    informations : {
        display: 'flex',
        flex : 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: ColorConstants.blackSecondaryColor,
        borderRadius: 14
    },
    addTitleContainer : {

    },
    inputs : {
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 14,
        color: ColorConstants.whiteMainColor,
    }
});

export default styles;