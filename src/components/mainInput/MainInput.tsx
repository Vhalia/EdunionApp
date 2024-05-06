import { TextInput, View } from "react-native"
import MainInputProps from "./props/mainInputProps";
import styles from "./style/mainInputStyle";

const MainInput = (props: MainInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.inputs, props.style]}
                inputMode={props.inputMode}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderColor}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}/>
        </View>
    );
}

export default MainInput