import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainContainer : {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        height: "70%",
        marginTop: 5,
        gap: 0
    },
    dropDownContainer: {
        position: "relative",
        backgroundColor: ColorConstants.blackSecondaryColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 11,
        borderBottomLeftRadius: 11,
        height: "100%",
        flex: 1,
    },
    dropdownButton: {
        backgroundColor: ColorConstants.purpleMainColor,
        paddingTop: 5,
        paddingBottom: 4,
        paddingRight: 5,
        paddingLeft: 5
    },
    searchBarContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent : "center",
        position: "relative",
        backgroundColor: ColorConstants.greyMainColor,
        flex: 3,
        borderTopRightRadius: 11,
        borderBottomRightRadius: 11,
        height: "100%",
    },
    searchBarInputContainer : {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "space-between",
        backgroundColor: "purple",
        width: "90%",
        height: "70%",
        borderRadius: 4,
    },
    searchBarInput: {
        backgroundColor: "red",
        color: "white",
        fontSize: 10,
        height: "80%"
    },
    searchButton : {
        backgroundColor: ColorConstants.purpleMainColor,
        borderRadius: 4,
        paddingLeft: 5,
        paddingRight: 5
    }
});

export default styles