import {StyleSheet} from 'react-native';

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
    dropDownElementContainer : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    dropDownElement : {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        zIndex: 1,
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
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