import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    background : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '15%',
        backgroundColor: ColorConstants.blackSecondaryColor,
    },
    logo : {
        alignSelf : 'flex-end',
        marginBottom: '5%'
    }
});

export default styles