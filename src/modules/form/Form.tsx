import { Button, TextInput, View } from "react-native";
import {FormProps, SubmitResult} from "./props/FormProps";
import MainText from "../text/MainText";
import { useState } from "react";
import styles from "./style/formStyle";
import { ColorConstants } from "../../constants/ThemeConstants";

const Form = (props : FormProps) => {
    const [submitResponses, setSubmitResponses] = useState<SubmitResult[]>([]);
    
    const onPress = () => {
        props.onSubmit(submitResponses);
    }

    const onChange = (key : string, value: string) => {
        setSubmitResponses([...submitResponses, {title: key, value: value}])
    }
    
    return (
        <View style={props.style}>
            {props.inputConfig.map((option, index) => {
                return (
                    <View key={index} style={styles.gap}>
                        <MainText
                            fontSize={16}
                            style={[props.textStyle]}
                            text={option.title ?? ""}/>
                        <TextInput
                            style={[props.inputStyle, styles.gap, styles.bottomGap]}
                            placeholder={option.placeholder}
                            secureTextEntry={option.secret ?? false}
                            placeholderTextColor={ColorConstants.white70PercentColor}
                            onChangeText={(value) => onChange(option.title ?? "", value)} />
                    </View>
                )})
            }

             <Button onPress={onPress} title={props.buttonTitle} color={ColorConstants.purpleMainColor}></Button>
        </View>
    ); 
}

export default Form;