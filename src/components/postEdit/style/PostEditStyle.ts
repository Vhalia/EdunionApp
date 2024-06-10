import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: ColorConstants.blackMainColor,
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
        backgroundColor: ColorConstants.blackSecondaryColor,
        height: 100,
    },
    contentContainer : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 150,
        marginLeft: 15,
        marginRight:15 
    },
    photoUploaderContainer : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 2
    },
    informationsContainer : {
        display: 'flex',
        flex : 2,
        justifyContent: 'center',
        width: "100%",
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
        color: ColorConstants.whiteMainColor
    },
    descriptionInput : {
        textAlignVertical: "top",
    },
    categoryButtonsContainer : {
        display: 'flex',
        flexDirection: 'row',
        width: "80%",
        alignItems: 'center'
    },
    categoryButton : {
        padding: 10,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    activeCategoryButton : {
        backgroundColor: ColorConstants.purpleMainColor,
        color: ColorConstants.whiteMainColor,
    },
    inactiveCategoryButton : {
        backgroundColor: ColorConstants.greyMainColor,
        color: ColorConstants.white70PercentColor,
    },
    categoyButtonText : {
        marginLeft: 5,
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.purpleMainColor,
        padding: 10,
        borderRadius: 8,
        width: 350
    }
})

export default styles;