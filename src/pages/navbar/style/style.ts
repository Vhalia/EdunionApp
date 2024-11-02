import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: ColorConstants.blackSecondaryColor
    },
    tabBar: {
        backgroundColor: ColorConstants.blackSecondaryColor,
        borderTopWidth: 0
    },
    button: {
        display: "flex",
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        color: ColorConstants.whiteMainColor
    },
    buttonAdd: {
        backgroundColor:ColorConstants.purpleMainColor,
    }
});

export default styles