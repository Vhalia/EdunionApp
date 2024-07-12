import { useEffect, useState } from "react";
import { Modal, Platform, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import MainText from "../text/MainText";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import { ColorConstants } from "../../constants/ThemeConstants";

const MainDatePicker = (props: MainDatePickerProps) => {
    const [date, setDate] = useState<dayjs.Dayjs>(props.date ?? dayjs());

    useEffect(() => {
        if (props.date) {
            setDate(props.date);
        }
    }, [props.date]);
    
    const onChange = (newDate?: Date) => {
        props.onClose && props.onClose()
        if (newDate !== undefined
            && !date.isSame(dayjs(newDate))){
            setDate(dayjs(newDate))
            props.onChange(dayjs(newDate))
        }
    }

    return(
        <View style={props.iosContainerStyle}> 
            {Platform.OS === 'ios' ? (
                <Modal
                    visible={props.visible}
                    onRequestClose={props.onClose}
                    style={props.iosModalContainerStyle}>

                    <View style={{}}>
                        <TouchableOpacity onPress={props.onClose}>
                            <MainText
                                text="Annuler"
                                fontSize={13}
                                style={{ paddingHorizontal: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onClose}>
                            <MainText
                                text="Confirmer"
                                fontSize={13}
                                style={{ paddingHorizontal: 15 }} />
                        </TouchableOpacity>
                    </View>

                    <DateTimePicker
                        value={date.toDate()}
                        mode={props.mode ?? 'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(_, date) => setDate(dayjs(date))}
                        style={{ backgroundColor: ColorConstants.blackMainColor }}
                    />
                </Modal>
            ) : (
                <>
                {props.visible && 
                    <DateTimePicker
                        value={date.toDate()}
                        mode={props.mode ?? 'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(_, newDate) => onChange(newDate)}
                        style={{ backgroundColor: ColorConstants.blackMainColor }}
                    />
                }
                </>
            )}
      </View>
    )
}

interface MainDatePickerProps {
    visible: boolean,
    onChange: (date: dayjs.Dayjs) => void,
    onClose?: () => void,
    mode?: 'date' | 'time',
    iosContainerStyle?: StyleProp<ViewStyle>,
    iosModalContainerStyle?: StyleProp<ViewStyle>,
    date?: dayjs.Dayjs,
}

export type {MainDatePickerProps}

export default MainDatePicker