import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor: ColorConstants.blackMainColor,
    },
    headerContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
        backgroundColor: ColorConstants.blackSecondaryColor,
    },
    logo : {
        alignSelf : 'flex-end',
        marginBottom: '5%'
    },
    scrollContainer: {
        backgroundColor: ColorConstants.blackMainColor,
        display: 'flex',
        height: "100%",
        flexDirection: 'column'
    },
    mainContainerChildProps : {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    },
    searchBarContainer : {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 30,
    },
    searchBarTitle: {
        flex: 1,
        marginBottom: 5
    },
    searchBar: {
        flex: 2
    },
    newBookPostsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 2,
        width: "100%"
    },
    newCoursePostsContainer : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 2,
        width: "100%",
        marginBottom: 100
    }
});

export default styles