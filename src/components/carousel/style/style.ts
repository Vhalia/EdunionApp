import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    carouselContainer : {
        display: "flex",
        flexDirection: "column"
    },
    carousel :{
    },
    pagingControlsContainer : {
        display: "flex",
        justifyContent: "center",
        gap: 10,
        flex: 1,
        flexDirection: "row"
    },
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
        justifyContent:"center",
        alignItems: "center",
    },
    imageContainer : {
        display: "flex",
        flex: 3,
        backgroundColor: "purple",
        borderRadius: 22
    },
    infoBarContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        backgroundColor: "blue"
    }

})

export default styles