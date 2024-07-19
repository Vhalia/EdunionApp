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
    titles:{
        marginLeft: 5
    },
    inputs : {
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 14,
        color: ColorConstants.whiteMainColor
    },
    descriptionInput : {
        textAlignVertical: "top",
    },
    priceInput: {
        alignItems: "center",
        width: 60
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
    },
    booksMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    booksContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        flex: 1
    },
    bookButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.purpleDark,
        padding: 10,
        borderRadius: 8,
        width: 100
    },
    addBookButton: {
        backgroundColor: ColorConstants.purpleMainColor,
        width: 50
    },
    addBookModalContent: {
        display: 'flex',
        flex: 0.90,
        backgroundColor: ColorConstants.blackMainColor,
    },
    addBookModelCloseButton: {
        width: "100%",
        display: 'flex',
        flex: 0.1,
        backgroundColor: ColorConstants.blackMainColor,
        alignItems: 'flex-end',
    },
    modalInputs: {
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 14,
        color: ColorConstants.whiteMainColor,
        width: "100%",
    },
    scheduleMainContainer: {
        display: 'flex',
        gap: 10
    },
    scheduleContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 10 
    },
    schedule: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: ColorConstants.greyMainColor,
        padding: 10,
        borderRadius: 8,
        width: '100%'
    },
    scheduleDate: {
        width: 140,
    },
    scheduleTime: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})

export default styles;