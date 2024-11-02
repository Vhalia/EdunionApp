import { useEffect, useState } from "react";
import { Modal, Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import MainText from "../text/MainText";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import { ColorConstants } from "../../constants/ThemeConstants";
import MainButton from "../mainButton/MainButton";

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

    const onChangeTimeIos = (newTime?: Date) => {
        if (props.mode != "time")
            return

        if (newTime !== undefined
            && !date.isSame(dayjs(newTime))){
            setDate(dayjs(newTime))
            props.onChange(dayjs(newTime))
        }
    }

    return(
        <View style={props.containerStyle}> 
            {Platform.OS === 'ios' ? (
                <Modal
                    visible={props.visible}
                    onRequestClose={props.onClose}
                    transparent>

                    <View style={[style.modalMainContainerIos]}>
                        <TouchableOpacity
                            style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                            onPress={props.onClose}
                            activeOpacity={1}/>
                        
                        <View style={[style.modalContainerIos]}>
                            <DateTimePicker
                                value={date.toDate()}
                                mode={props.mode ?? 'date'}
                                is24Hour={true}
                                display={props.mode == 'date' ? "inline" : "spinner"}
                                onChange={(_, date) => props.mode == "date" ? onChange(date) : onChangeTimeIos(date)}
                                style={{ backgroundColor: ColorConstants.blackMainColor}}
                                minimumDate={props.minimumDate?.toDate()}
                                themeVariant="dark"
                                accentColor={ColorConstants.purpleMainColor}
                            />

                            {props.mode == 'time' ?
                                <View style={style.buttonModalContainerIos}>
                                    <MainButton
                                        onPress={() => !props.onClose ? {} : props.onClose()}
                                        text="Annuler"
                                        style={{backgroundColor: ColorConstants.purpleDark}}
                                        fontSize={13}/>
                                    <MainButton
                                        onPress={() => !props.onClose ? {} : props.onClose()}
                                        text="Confirmer"
                                        style={{backgroundColor: ColorConstants.purpleMainColor}}
                                        fontSize={13}/>
                                </View>
                            :
                                <></>
                            }
                        </View>
                        
                    </View>
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
                        style={{ backgroundColor: ColorConstants.blackMainColor}}
                        minimumDate={props.minimumDate?.toDate()}
                    />
                }
                </>
            )}
      </View>
    )
}

const style = StyleSheet.create({
    modalMainContainerIos: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalContainerIos: {
        borderRadius: 14,
        backgroundColor: ColorConstants.blackMainColor,
        padding: 10
    },
    buttonModalContainerIos: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginTop: 20
    }
})

interface MainDatePickerProps {
    visible: boolean,
    onChange: (date: dayjs.Dayjs) => void,
    onClose?: () => void,
    mode?: 'date' | 'time',
    containerStyle?: StyleProp<ViewStyle>,
    iosModalContainerStyle?: StyleProp<ViewStyle>,
    date?: dayjs.Dayjs,
    minimumDate?: dayjs.Dayjs
}

export type {MainDatePickerProps}

export default MainDatePicker