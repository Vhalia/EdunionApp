import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainContainer : {
        position: "relative",
        display: "flex",
        flexDirection: "row",
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
        flex: 1
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
        flex: 4,
        borderTopRightRadius: 11,
        borderBottomRightRadius: 11,
    },
    searchBarInputContainer : {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "space-between",
        backgroundColor: ColorConstants.blackSecondaryColor,
        width: 250,
        height: 40,
        borderRadius: 4,
    },
    searchBarInput: {
        backgroundColor: "transparent",
        color: "white",
        fontSize: 14,
        margin: 5,
        flex: 1,
        textAlignVertical: "bottom",
        height: 40
    },
    searchButton : {
        backgroundColor: ColorConstants.purpleMainColor,
        borderRadius: 4,
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5
    }
});

export default styles