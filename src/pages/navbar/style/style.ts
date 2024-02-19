import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: ColorConstants.blackSecondaryColor,
        borderTopWidth: 0,
        height: 60,
    },
    button: {
        display: "flex",
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        color: '#ffff'
    },
    buttonAdd: {
        backgroundColor:"purple",
    }
});

export default styles