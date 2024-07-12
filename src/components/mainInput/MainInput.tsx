import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import MainInputProps from "./props/mainInputProps";
import styles from "./style/mainInputStyle";
import EyeOpenSVG from "../../../images/eye-open.svg";
import EyeCloseSVG from "../../../images/eye-off.svg";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useEffect, useState } from "react";
import MainText from "../../modules/text/MainText";
import Loading from "../../modules/Loading/Loading";

const MainInput = (props: MainInputProps) => {
    const [secretHidden, hideSecret] = useState(true)
    const [text, setText] = useState<string>(props.value ?? "")
    const [isOnError, setOnError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
   
    useEffect(() => {
        if (props.isOnError != undefined){
            setOnError(props.isOnError)
        }
        if (props.errorMessage != undefined) {
            setErrorMessage(props.errorMessage)
        }
    }, [props.isOnError, props.errorMessage])

    useEffect(() => {
        setText(props.value ?? "")
    }, [props.value])

    const onShowSecretPress = () => {
        hideSecret(!secretHidden)
    }

    const onChangeText = (value: string) => {
        setText(value)
        if (props.onChange)
            props.onChange(value)
    }
    
    const onLosingFocus = () => {
        if (!props.isOnError)
            setOnError(false)

        props.onLosingFocus && props.onLosingFocus(text)
    }

    const showErrorStyle = () => {
        if (isOnError)
            return styles.error
    }

    return (
        <View style={[styles.mainContainer]}>
            <View style={[styles.container, showErrorStyle(), props.containerStyle]}>
                {props.isLoading
                    ? <Loading />
                    :
                    <TextInput
                        style={[styles.inputs, props.style, props.multiline ? {textAlignVertical: "top"} : {}]}
                        inputMode={props.inputMode}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder={props.placeholder}
                        placeholderTextColor={props.placeholderColor}
                        multiline={props.multiline}
                        numberOfLines={props.numberOfLines}
                        secureTextEntry={props.isSecret && secretHidden}
                        onBlur={onLosingFocus}
                        autoCapitalize={props.autoCapitalize ?? "sentences"}
                        keyboardType={props.keyboardType}
                        editable={!props.disabled}
                        selectTextOnFocus={!props.disabled}
                        maxLength={props.maxLength}/>
                }

                {props.isSecret &&
                    <TouchableOpacity onPress={onShowSecretPress} style={styles.eyeIcon}>
                        {secretHidden
                            ? <EyeOpenSVG color={ColorConstants.white70PercentColor} width={20} height={20} />
                            : <EyeCloseSVG color={ColorConstants.white70PercentColor} width={20} height={20} />}
                        
                    </TouchableOpacity>
                }
            </View>
            {isOnError && errorMessage &&
                <MainText text={errorMessage} fontColor={ColorConstants.red70PercentColor} fontSize={12} />
            }
        </View>
    );
}

export default MainInput