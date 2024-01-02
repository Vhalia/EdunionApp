import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20%"
    },
    button: {
        backgroundColor: "black",
        padding: "5%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        borderWidth: 1,
    },
    arrow : {
        marginLeft:"5%"
    },
    dropdownElementContainer : {
        display: "flex",
        flexDirection: "column",
        backgroundColor: ColorConstants.greyLightColor,
        width: "20%",
        alignItems: "center",
    },
    dropdownElement : {
        backgroundColor: "red",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        padding: "10%",
        borderRadius: 4
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%"
    }
});

export default styles