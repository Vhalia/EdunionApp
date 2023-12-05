import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: ColorConstants.blackMainColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    }
});

export default styles