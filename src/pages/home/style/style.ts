import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: ColorConstants.blackMainColor,
        display: 'flex',
        flexDirection: 'column',
        marginTop: '5%'
    },
    mainContainerChildProps : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarContainer : {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#8B008B",
        flex: 1
    },
    searchBarTitle: {
        flex: 1
    },
    searchBar: {
        flex: 2
    },
    recentPostsContainer: {
        backgroundColor: "#9932CC",
        flex: 2
    },
    newPostsContainer : {
        backgroundColor: "#8B008B",
        flex: 2
    }
});

export default styles