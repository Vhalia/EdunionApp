import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 14,
        width: "90%",
        flexWrap: 'wrap',
    },
    tagCategoryContainer: {
        width: 335
    },
    minorGap: {
        marginTop: 5
    },
})

export default style;