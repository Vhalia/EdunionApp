import {StyleSheet} from 'react-native';
import { ColorConstants } from '../../../constants/ThemeConstants';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: ColorConstants.blackMainColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%'
    }
});

export default styles