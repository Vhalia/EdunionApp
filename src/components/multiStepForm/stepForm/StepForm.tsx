import { StyleSheet, View } from "react-native";
import { Step } from "../MultiStepForm";
import { ColorConstants } from "../../../constants/ThemeConstants";
import MainButton from "../../../modules/mainButton/MainButton";
import Loading from "../../../modules/Loading/Loading";

const StepForm = (props: StepFormProps) => {
    const onPressNext = () => {
        if (props.step.canGoNext && !props.step.canGoNext()) return;
        if (!props.hasNext){
            props.onPressSubmit && props.onPressSubmit();
            return;
        }
        
        props.onPressNext && props.onPressNext();
        props.navigation.navigate((props.step.index + 1).toString());
    }

    const onPressPrevious = () => {
        if (!props.hasPrevious) return;

        props.onPressPrevious && props.onPressPrevious();
        props.navigation.navigate((props.step.index - 1).toString());
    }

    const onPressSubmit = () => {
        props.onPressSubmit && props.onPressSubmit();
    }
    
    return (
        <View style={styles.container}>
            <View style={{marginRight: 20, marginLeft: 20}}>
                {props.step.renderContent()}

                <View style={styles.buttonsContainer}>
                    {props.hasPrevious && !props.disablePreviousButton && <MainButton
                        onPress={onPressPrevious} 
                        text="Précedent"
                        style={styles.previousButton}/>}
                    <MainButton
                        onPress={onPressNext} 
                        text={props.hasNext ? "Suivant" : "Terminer"}
                        style={styles.nextButton}
                        isLoading={props.isLoading}/>
                </View>
            </View>
        </View>
    )
}


interface StepFormProps {
    step: Step,
    navigation: any,
    hasNext? : boolean,
    hasPrevious? : boolean,
    disablePreviousButton? : boolean,
    isLoading? : boolean,
    onPressNext? : () => void,
    onPressPrevious? : () => void,
    onPressSubmit? : () => void
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor,
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    nextButton: {
        width: 250,
        padding: 10,
        backgroundColor: ColorConstants.purpleMainColor
    },
    previousButton: {
        width: 100,
        padding: 10,
        backgroundColor: ColorConstants.purpleDark
    }
})

export default StepForm;