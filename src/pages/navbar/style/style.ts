import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: ColorConstants.blackSecondaryColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        padding: '5%',
        position: 'absolute',
        bottom: 0,
        width: '100%'
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